import { useLanguage } from './LanguageContext'
import { translations, serviciosData, portfolioData } from './translations'

export function useTranslation() {
  const { locale } = useLanguage()
  const t = (key: string): string => translations[locale][key] ?? key
  return { t, locale, servicios: serviciosData[locale], portfolio: portfolioData[locale] }
}
