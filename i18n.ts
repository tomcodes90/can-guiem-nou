import {notFound} from 'next/navigation'
import {getRequestConfig} from 'next-intl/server'

export const locales = ['en', 'es', 'ca', 'de', 'fr'] as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
    en: 'English',
    es: 'Español',
    ca: 'Català',
    de: 'Deutsch',
    fr: 'Français',
}

export const defaultLocale: Locale = 'es'

export default getRequestConfig(async ({requestLocale}) => {
    const locale = await requestLocale

    if (!locale || !locales.includes(locale as Locale)) {
        notFound()
    }

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,
    }
})