import { invoke } from '@tauri-apps/api/core';

const levels = [
  // 'log',
  'info',
  // 'warn',
  // 'error',
  // 'debug'
];

export function hookWebviewLog() {
  for (const level of levels) {
    const original = console[level];

    console[level] = (...args: unknown[]) => {
      original.apply(console, args);

      const serialized = args.map(serialize).join(' ');

      invoke('log_to_backend', {
        level,
        message: serialized,
      });
    };
  }
}

function serialize(arg: unknown): string {
  if (typeof arg === 'string') {
    return arg;
  }
  try {
    return JSON.stringify(arg);
  } catch {
    return String(arg);
  }
}
