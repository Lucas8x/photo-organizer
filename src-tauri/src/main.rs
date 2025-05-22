// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

#[tauri::command]
fn log_to_backend(level: String, message: String) {
    match level.as_str() {
        "error" => eprintln!("[WebView][ERROR]: {}", message),
        "warn" => eprintln!("[WebView][WARN]: {}", message),
        "info" => println!("[WebView][INFO]: {}", message),
        "debug" => println!("[WebView][DEBUG]: {}", message),
        _ => println!("[WebView]: {}", message),
    }
}


#[tauri::command]
fn show_in_folder(path: String) {
    #[cfg(target_os = "windows")]
    {
        Command::new("explorer")
            .args(["/select,", &path]) // The comma after select is not a typo
            .spawn()
            .unwrap();
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![show_in_folder, log_to_backend])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
