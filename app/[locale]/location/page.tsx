import {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getBarInfo} from '@/lib/sanity-queries'
import {Phone, Mail, MapPin, Clock, Instagram, Facebook, Navigation} from 'lucide-react'
import GoogleMap from "@/components/GoogleMap"

export const revalidate = 86400

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const {locale} = await params
    const barInfo = await getBarInfo()
    const t = await getTranslations({locale, namespace: 'home'})

    return {
        title: `${t('location.title')} - ${barInfo?.name}`,
        description: `${t('location.title')} - ${barInfo?.name}`,
    }
}

export default async function LocationPage({
                                               params,
                                           }: {
    params: Promise<{ locale: string }>
}) {
    const {locale} = await params
    const barInfo = await getBarInfo()
    const t = await getTranslations('home')

    if (!barInfo) return <div>Loading...</div>

    const dayKeys: Record<string, string> = {
        'Monday': 'mon', 'Tuesday': 'tue', 'Wednesday': 'wed',
        'Thursday': 'thu', 'Friday': 'fri', 'Saturday': 'sat', 'Sunday': 'sun',
        'Lunes': 'mon', 'Martes': 'tue', 'Miércoles': 'wed',
        'Jueves': 'thu', 'Viernes': 'fri', 'Sábado': 'sat', 'Domingo': 'sun',
    }

    const googleMapsUrl = `https://www.google.com/maps?q=${barInfo.location?.lat},${barInfo.location?.lng}`

    return (
        <main className="bg-can-nou-dark min-h-screen text-white pt-16">

            {/* Header */}
            <section className="py-20 text-center">
                <p className="text-can-nou-accent text-xs font-semibold tracking-widest uppercase mb-4">
                    Ca&apos;n Guiem Nou
                </p>
                <h1 className="font-nothing italic text-5xl md:text-6xl text-white mb-4">
                    {t('location.title')}
                </h1>
                <div className="w-16 h-0.5 bg-can-nou-primary mx-auto"/>
            </section>

            {/* Map and Info */}
            <section className="container mx-auto px-4 pb-24">
                <div className="max-w-6xl mx-auto">

                    {/* Map - full width */}
                    <div className="mb-12">
                        <GoogleMap
                            lat={barInfo.location?.lat || 0}
                            lng={barInfo.location?.lng || 0}
                        />
                    </div>

                    {/* Single CTA Button - centered */}
                    <div className="text-center">
                        {barInfo.location && (

                            <a href={googleMapsUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="inline-flex items-center gap-3 bg-can-nou-accent text-can-nou-dark px-12 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-can-nou-secondary transition-all duration-300"
                            >
                                <Navigation className="w-5 h-5"/>
                                {t('location.getDirections')}
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}