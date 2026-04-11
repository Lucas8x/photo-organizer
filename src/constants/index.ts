export const RESERVED_KEYS = ['ArrowLeft', 'ArrowRight', 'F11'] as const;

export const FILE_TYPES = [
  'avif',
  'bmp',
  'gif',
  'ico',
  'jfif',
  'jpeg',
  'jpg',
  'png',
  'svg',
  'webp',
] as const;
// incompatible
// 'tiff'

export const THEMES = ['system', 'light', 'dark'] as const;

export const CONFLICT_HANDLE_OPTIONS = {
  BLOCK: 'conflict.block',
  RENAME: 'conflict.rename',
} as const;
