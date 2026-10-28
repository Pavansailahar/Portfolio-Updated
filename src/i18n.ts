import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/translation.json'
import hi from './locales/hi/translation.json'
import ja from './locales/ja/translation.json'

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ja', label: '日本語', short: '日本語' },
  { code: 'hi', label: 'हिन्दी', short: 'हिन्दी' },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']

const STORAGE_KEY = 'portfolio-lang'
const isSupported = (code: string | null): code is LanguageCode => LANGUAGES.some((l) => l.code === code)

/** The visitor's saved choice, or English. We deliberately don't auto-detect from the browser. */
function savedLanguage(): LanguageCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isSupported(stored)) return stored
  } catch {
    /* storage blocked (private mode etc.) — fall back to English */
  }
  return 'en'
}

/** Keeps <html lang>, the tab title and the meta description in step with the active language. */
function syncDocument(lng: string) {
  document.documentElement.lang = lng
  document.title = i18n.t('meta.title')
  document.querySelector('meta[name="description"]')?.setAttribute('content', i18n.t('meta.description'))
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ja: { translation: ja },
    hi: { translation: hi },
  },
  lng: savedLanguage(),
  fallbackLng: 'en',
  supportedLngs: LANGUAGES.map((l) => l.code),
  interpolation: { escapeValue: false }, // React already escapes
  returnNull: false,
})

syncDocument(i18n.language)

i18n.on('languageChanged', (lng) => {
  syncDocument(lng)
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    /* ignore */
  }
})

export default i18n
