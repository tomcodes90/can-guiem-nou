import {NextIntlClientProvider} from 'next-intl'
import {getMessages} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {Locale, locales} from '@/i18n'
import {Libre_Baskerville, Nothing_You_Could_Do} from 'next/font/google'
import Navigation from '@/components/Navigation'
import {getBarInfo} from '@/lib/sanity-queries'
import '../globals.css'
import Footer from "@/components/Footer";

const nothingYouCouldDo = Nothing_You_Could_Do({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-nothing',
})

const libreBaskerville = Libre_Baskerville({
    subsets: ['latin'],
    weight: ['400', '700'],
    style: ['normal', 'italic'],
})

export function generateStaticParams() {
    return locales.map((locale) => ({locale}))
}

export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const {locale} = await params

    if (!locales.includes(locale as never)) {
        notFound()
    }

    const messages = await getMessages()
    const barInfo = await getBarInfo()

    return (
        <html lang={locale}>
        <body className={`${libreBaskerville.className} ${nothingYouCouldDo.variable}`}>
        <NextIntlClientProvider messages={messages}>
            <Navigation
                instagram={barInfo?.socialMedia?.instagram}
                facebook={barInfo?.socialMedia?.facebook}
            />
            {children}
            {barInfo && (
                <Footer
                    barInfo={barInfo}
                    locale={locale as Locale}
                />
            )}
        </NextIntlClientProvider>
        </body>
        </html>
    )
}