import {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getAllMenuItems, getBarInfo, getWeeklyLunchMenu, groupByCategory, type Locale} from '@/lib/sanity-queries'
import Link from 'next/link'
import {urlFor} from '@/lib/sanity'
import {Download, MapPin} from 'lucide-react'
import Separator from "@/components/Separator"
import MenuTabs from '@/components/MenuTabs'

export const revalidate = 1800

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const {locale} = await params
    const barInfo = await getBarInfo()
    const t = await getTranslations({locale, namespace: 'menu'})

    return {
        title: `${t('title')} - ${barInfo?.name}`,
        description: `${t('title')} - ${barInfo?.name}`,
    }
}

export default async function MenuPage({
                                           params,
                                       }: {
    params: Promise<{ locale: string }>
}) {
    const {locale} = await params
    const items = await getAllMenuItems()
    const barInfo = await getBarInfo()
    const weeklyLunch = await getWeeklyLunchMenu()
    const t = await getTranslations('menu')

    // Prepare translations for the client component
    const translations = {
        weeklyLunch: t('weeklyLunch'),
        fullMenu: t('fullMenu'),
        digitalMenu: t('digitalMenu'),
        exploreMenu: t('exploreMenu'),
        lunchSpecial: t('lunchSpecial'),
        categoryTranslations: {
            'tapas': t('categories.tapas'),
            'pizzas': t('categories.pizzas'),
            'ensaladas': t('categories.ensaladas'),
            'pamboli': t('categories.pamboli'),
            'burgers': t('categories.burgers'),
            'algo-mas': t('categories.algo-mas'),
        }
    }

    return (
        <main className="bg-can-nou-dark min-h-screen text-white pt-16">

            {/* Header */}
            <section className="py-20 text-center">
                <p className="text-can-nou-accent text-xs font-semibold tracking-widest uppercase mb-4">
                    Ca&apos;n Guiem Nou
                </p>
                <h1 className="font-nothing text-5xl md:text-6xl text-white mb-4">
                    {t('title')}
                </h1>
                <div className="w-16 h-0.5 bg-can-nou-primary mx-auto mb-8"/>

                {/* Download button */}
                {barInfo?.menuImage && (

                    <a href={urlFor(barInfo.menuImage).url()}
                       target="_blank"
                       rel="noopener noreferrer"
                       download="menu-can-nou.png"
                       className="inline-flex items-center gap-2 border border-can-nou-accent text-can-nou-accent px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-can-nou-accent hover:text-can-nou-dark transition-all duration-300"
                    >
                        <Download className="w-4 h-4"/>
                        {t('downloadMenu')}
                    </a>
                )}
            </section>

            <Separator/>

            {/* Tabbed Menu */}
            {weeklyLunch && weeklyLunch.length > 0 && items && items.length > 0 ? (
                <MenuTabs
                    weeklyLunch={weeklyLunch}
                    menuItems={items}
                    locale={locale as Locale}
                    translations={translations}
                />
            ) : (
                <section className="container mx-auto px-4 pb-24 text-center">
                    <p className="font-baskerville italic text-3xl text-white/40">
                        {t('comingSoon')}
                    </p>
                </section>
            )}

            {/* Footer CTA */}
            <section className="border-t border-white/10 py-16 text-center">
                <p className="font-baskerville italic text-2xl text-white mb-6">
                    {t('readyToVisit')}
                </p>
                <Link
                    href={`/${locale}/location`}
                    className="inline-flex items-center gap-2 border border-can-nou-accent text-can-nou-accent px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-can-nou-accent hover:text-can-nou-dark transition-all duration-300"
                >
                    <MapPin className="w-4 h-4"/>
                    {t('getDirections')}
                </Link>
            </section>
        </main>
    )
}