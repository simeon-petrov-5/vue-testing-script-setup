import { createI18n } from 'vue-i18n';

import { locales, defaultLocale } from './locales';
import buttons from './buttons';

const messages: any = {};
locales.forEach((locale) => (messages[locale] = {}));

const translationFiles = [ buttons];
translationFiles.forEach((file: any) => {
  locales.forEach((locale) => {
    if (file[locale]) {
      messages[locale] = { ...messages[locale], ...file[locale] };
    }
  });
});

const i18nInstance = createI18n({
  legacy: false,
  globalInjection: true,
  locale: defaultLocale,
  messages
});

export default i18nInstance;
