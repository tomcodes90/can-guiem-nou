import {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getBarInfo} from '@/lib/sanity-queries'
import {Phone, Mail, MapPin, Clock, Instagram, Facebook, Navigation} from 'lucide-react'

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
    const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${barInfo.location?.lat},${barInfo.location?.lng}&zoom=16`

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

            {/* Map + Info Grid */}
            <section className="container mx-auto px-4 pb-24">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-0 border border-white/10">

                    {/* Map */}
                    <div className="relative h-96 md:h-auto min-h-96">
                        <iframe
                            src={embedUrl}
                            width="100%"
                            height="100%"
                            style={{border: 0, filter: 'grayscale(30%) invert(90%) hue-rotate(180deg)'}}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0"
                        />
                    </div>

                    {/* Info */}
                    <div className="bg-can-nou-dark/80 p-10 md:p-12 flex flex-col gap-10">

                        {/* Address & Contact */}
                        <div>
                            <h3 className="text-can-nou-accent text-xs font-semibold tracking-widest uppercase mb-6 flex items-center gap-2">
                                <MapPin className="w-4 h-4"/>
                                {t('location.contactUs')}
                            </h3>
                            <address className="not-italic text-white/70 text-sm leading-relaxed mb-6">
                                {barInfo.address?.street}<br/>
                                {barInfo.address?.zipCode} {barInfo.address?.city}<br/>
                                {barInfo.address?.country}
                            </address>
                            <div className="space-y-3">
                                {barInfo.phone && (

                                    <a href={`tel:${barInfo.phone}`}
                                       className="flex items-center gap-3 text-white/70 hover:text-can-nou-accent transition text-sm"
                                    >
                                        <Phone className="w-4 h-4 text-can-nou-accent flex-shrink-0"/>
                                        {barInfo.phone}
                                    </a>
                                )}
                                {barInfo.email && (

                                    <a href={`mailto:${barInfo.email}`}
                                       className="flex items-center gap-3 text-white/70 hover:text-can-nou-accent transition text-sm"
                                    >
                                        <Mail className="w-4 h-4 text-can-nou-accent flex-shrink-0"/>
                                        {barInfo.email}
                                    </a>
                                )}
                            </div>

                            <a href={googleMapsUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="inline-flex items-center gap-2 mt-6 border border-can-nou-accent text-can-nou-accent px-6 py-2 text-xs font-semibold tracking-widest uppercase hover:bg-can-nou-accent hover:text-can-nou-dark transition-all duration-300"
                            >
                                <Navigation className="w-3 h-3"/>
                                {t('location.getDirections')}
                            </a>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-white/10"/>

                        {/* Opening Hours */}
                        <div>
                            <h3 className="text-can-nou-accent text-xs font-semibold tracking-widest uppercase mb-6 flex items-center gap-2">
                                <Clock className="w-4 h-4"/>
                                {t('location.openingHours')}
                            </h3>
                            <ul className="space-y-2">
                                {barInfo.hours?.map((hour, index) => (
                                    <li key={index} className="flex justify-between text-sm">
                                        <span className="text-white/60">
                                            {t(`footer.${dayKeys[hour.day] || 'mon'}` as never)}
                                        </span>
                                        <span className={hour.closed ? 'text-red-400' : 'text-white/90'}>
                                            {hour.closed ? t('location.closed') : `${hour.open} - ${hour.close}`}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social */}
                        {(barInfo.socialMedia?.instagram || barInfo.socialMedia?.facebook) && (
                            <>
                                <div className="w-full h-px bg-white/10"/>
                                <div>
                                    <h3 className="text-can-nou-accent text-xs font-semibold tracking-widest uppercase mb-4">
                                        {t('footer.followUs')}
                                    </h3>
                                    <div className="flex gap-6">
                                        {barInfo.socialMedia?.instagram && (

                                            <a href={barInfo.socialMedia.instagram}
                                               target="_blank"
                                               rel="noopener noreferrer"
                                               className="flex items-center gap-2 text-white/60 hover:text-can-nou-accent transition text-sm"
                                            >
                                                <Instagram className="w-4 h-4"/>
                                                Instagram
                                            </a>
                                        )}
                                        {barInfo.socialMedia?.facebook && (

                                            <a href={barInfo.socialMedia.facebook}
                                               target="_blank"
                                               rel="noopener noreferrer"
                                               className="flex items-center gap-2 text-white/60 hover:text-can-nou-accent transition text-sm"
                                            >
                                                <Facebook className="w-4 h-4"/>
                                                Facebook
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}