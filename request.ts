import {getRequestConfig} from 'next-intl/server'
import {locales} from './i18n'

export default getRequestConfig(async ({requestLocale}) => {
    let locale = await requestLocale

    // Ensure that the incoming locale is valid
    if (!locale || !locales.includes(locale as never)) {
        locale = 'es'
    }

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,
    }
})