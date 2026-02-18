import {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getBarInfo, getAnnouncements, getTodayLunchSpecial, type Locale} from '@/lib/sanity-queries'
import HeroSection from '@/components/home/HeroSection'
import AnnouncementCarousel from '@/components/home/AnnouncementCarousel'
import StorySection from '@/components/home/StorySection'
import JsonLd from '@/components/JsonLd'

export const revalidate = 3600

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const {locale} = await params
    const barInfo = await getBarInfo()
    const t = await getTranslations({locale, namespace: 'home'})

    return {
        title: `${barInfo?.name || "Ca'n Guiem Nou"} - ${t('hero.title')}`,
        description: `Pamboleria Ca'n Guiem Nou - Desde 1859 - ${barInfo?.address.city}`,
    }
}

export default async function HomePage({
                                           params,
                                       }: {
    params: Promise<{ locale: string }>
}) {
    const {locale} = await params
    const barInfo = await getBarInfo()
    const announcements = await getAnnouncements()
    const todayLunch = await getTodayLunchSpecial()

    if (!barInfo) {
        return <div>Loading...</div>
    }

    // Create dynamic announcement for today's lunch special
    const allAnnouncements = todayLunch
        ? [
            {
                _id: 'lunch-special',
                type: 'daily-menu' as const,
                title: todayLunch.dishName,
                subtitle: {
                    es: `Disponible ${todayLunch.lunchHours || '13:00 - 15:00'}`,
                    en: `Available ${todayLunch.lunchHours || '13:00 - 15:00'}`,
                    ca: `Disponible ${todayLunch.lunchHours || '13:00 - 15:00'}`,
                    de: `Verfügbar ${todayLunch.lunchHours || '13:00 - 15:00'}`,
                    fr: `Disponible ${todayLunch.lunchHours || '13:00 - 15:00'}`,
                },
                image: todayLunch.photo,
                link: '/menu',
                active: true,
                order: 0,
            },
            ...announcements
        ]
        : announcements

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BarOrPub',
        name: barInfo.name,
        address: {
            '@type': 'PostalAddress',
            streetAddress: barInfo.address.street,
            addressLocality: barInfo.address.city,
            postalCode: barInfo.address.zipCode,
            addressCountry: barInfo.address.country,
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: barInfo.location.lat,
            longitude: barInfo.location.lng,
        },
        telephone: barInfo.phone,
        email: barInfo.email,
        openingHoursSpecification: barInfo.hours?.filter(h => !h.closed).map(hour => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: hour.day,
            opens: hour.open,
            closes: hour.close,
        })) || [],
    }

    return (
        <>
            <JsonLd data={structuredData}/>
            <main>
                <HeroSection
                    barInfo={barInfo}
                    locale={locale as Locale}
                />
                <AnnouncementCarousel
                    announcements={allAnnouncements}
                    locale={locale as Locale}
                />
                <StorySection
                    barInfo={barInfo}
                    locale={locale as Locale}
                />
            </main>
        </>
    )
}