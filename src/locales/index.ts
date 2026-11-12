export const LOCALES = {
  ENGLISH: 'en',
  PORTUGUESE: 'pt-BR',
};

export const LANGUAGES = [
  { name: 'English', id: LOCALES.ENGLISH },
  { name: 'Português (Brasil)', id: LOCALES.PORTUGUESE },
];

export type Locale = (typeof LOCALES)[keyof typeof LOCALES];
