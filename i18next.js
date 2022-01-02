import i18next from 'i18next'

import en_provider from './public/locales/en/provider'

import fa_provider from './public/locales/fa/provider'

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'fa',
  defaultLanguage: 'fa',
  otherLanguages: ['fa'],
  localeSubpaths: {
    en: 'en',
    fa: 'fa',
  },
  fallbackLng: 'fa',
  debug: true,
  resources: {
    en: {
      provider: en_provider,
    },
    fa: {
      provider: fa_provider,
    },
  },
})
export default i18next
