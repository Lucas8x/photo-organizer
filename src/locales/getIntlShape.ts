import { createIntl, createIntlCache } from 'react-intl';
import { useSettings } from '@/store';
import { messages } from './messages';

const cache = createIntlCache();

export function getIntlShape() {
  const { language } = useSettings.getState();

  return createIntl(
    {
      locale: language,
      messages: messages[language] as Record<string, string>,
    },
    cache
  );
}
