import { createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';

import es from '../i18n/es.json';
import en from '../i18n/en.json';

const languages = { es, en };

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const { locale } = useRouter();

  const translator = useCallback(
    (key, ...args) => {
      let translation = languages[locale][key];
      if (args.length === 0) return translation;
      args.forEach((value, index) => {
        translation = translation.replace(`%${index + 1}`, value);
      });
      return translation;
    },
    [locale]
  );

  return <I18nContext.Provider value={{ translator }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within a I18nProvider');
  }
  return context;
}
