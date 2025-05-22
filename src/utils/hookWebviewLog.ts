import { invoke } from '@tauri-apps/api/core';

const levels: (keyof Console)[] = [
  // 'log',
  'info',
  // 'warn',
  // 'error',
  // 'debug'
];

export function hookWebviewLog() {
  levels.forEach((level) => {
    const original = console[level];

    //@ts-expect-error
    console[level] = (...args) => {
      original.apply(console, args);

      const serialized = args.map(serialize).join(' ');

      invoke('log_to_backend', {
        level,
        message: serialized,
      });
    };
  });
}

function serialize(arg: unknown): string {
  if (typeof arg === 'string') {
    return arg;
  }
  try {
    return JSON.stringify(arg);
  } catch (_) {
    return String(arg);
  }
}
