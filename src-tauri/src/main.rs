// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

#[tauri::command]
fn show_in_folder(path: String) {
  #[cfg(target_os = "windows")]
  {
    Command::new("explorer")
      .args(["/select,", &path]) // The comma after select is not a typo
      .spawn()
      .unwrap();
  }

  #[cfg(target_os = "macos")]
  {
    Command::new("open")
      .args(["-R", &path])
      .spawn()
      .unwrap();
  }
}

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![show_in_folder])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
