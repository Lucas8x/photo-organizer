import { THEMES } from '@/constants';

export function updateHtmlTheme(theme: (typeof THEMES)[number]) {
  const userPrefersDarkTheme = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;

  const darkMode =
    theme === 'dark' || (theme === 'system' && userPrefersDarkTheme);

  document.documentElement.classList.add(darkMode ? 'dark' : 'light');
  document.documentElement.classList.remove(!darkMode ? 'dark' : 'light');
}
