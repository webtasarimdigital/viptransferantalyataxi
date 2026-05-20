import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

import tr from '../../messages/tr.json';
import en from '../../messages/en.json';
import de from '../../messages/de.json';
import ru from '../../messages/ru.json';

const allMessages = { tr, en, de, ru };

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: allMessages[locale as keyof typeof allMessages]
  };
});
