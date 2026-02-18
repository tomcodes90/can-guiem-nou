import {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {getBarInfo, getUpcomingEvents, type Locale, getLocalizedValue} from '@/lib/sanity-queries'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity'

export const revalidate = 3600

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const {locale} = await params
    const barInfo = await getBarInfo()
    const t = await getTranslations({locale, namespace: 'events'})

    return {
        title: `${t('title')} - ${barInfo?.name}`,
        description: `${t('title')} - ${barInfo?.name}`,
    }
}

export default async function EventsPage({
                                             params,
                                         }: {
    params: Promise<{ locale: string }>
}) {
    const {locale} = await params
    const events = await getUpcomingEvents()
    const t = await getTranslations('events')

    return (
        <main className="bg-can-nou-dark min-h-screen text-white">
            {/* Header */}
            <section className="relative py-24 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-can-nou-dark"/>
                <div className="relative z-10 text-center">
                    <p className="text-can-nou-accent text-xs font-semibold tracking-widest uppercase mb-4">
                        Ca&apos;n Guiem Nou
                    </p>
                    <h1 className="font-nothing italic text-5xl md:text-6xl text-white mb-4">
                        {t('title')}
                    </h1>
                    <div className="w-16 h-0.5 bg-can-nou-primary mx-auto"/>
                </div>
            </section>

            {/* Events list */}
            <section className="container mx-auto px-4 pb-24">
                <div className="max-w-5xl mx-auto">
                    {!events || events.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="font-baskerville italic text-3xl text-white/40">
                                {t('noEvents')}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {events.map((event, index) => (
                                <div
                                    key={event._id}
                                    className="grid md:grid-cols-2 gap-0 overflow-hidden border border-white/10 hover:border-can-nou-accent/40 transition-colors duration-300"
                                >
                                    {/* Flyer Image */}
                                    <div className={`relative h-72 md:h-96 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                                        {event.flyer ? (
                                            <Image
                                                src={urlFor(event.flyer).width(800).height(600).url()}
                                                alt={getLocalizedValue(event.name, locale as Locale)}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div
                                                className="absolute inset-0 bg-can-nou-primary/20 flex items-center justify-center">
                                                <span className="text-6xl">🎉</span>
                                            </div>
                                        )}
                                        <div className={`absolute inset-0 ${
                                            index % 2 !== 0
                                                ? 'bg-gradient-to-l from-transparent to-can-nou-dark/60'
                                                : 'bg-gradient-to-r from-transparent to-can-nou-dark/60'
                                        }`}/>
                                    </div>

                                    {/* Event Info */}
                                    <div className={`flex flex-col justify-center p-8 md:p-12 bg-can-nou-dark/80 ${
                                        index % 2 !== 0 ? 'md:order-1' : ''
                                    }`}>
                                        {/* Date */}
                                        <div className="mb-4">
                                            <span
                                                className="text-can-nou-accent text-xs font-semibold tracking-widest uppercase">
                                                🗓 {new Date(event.date).toLocaleDateString(locale, {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                            </span>
                                            <span className="text-white/40 text-xs ml-4">
                                                🕐 {new Date(event.date).toLocaleTimeString(locale, {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                            </span>
                                        </div>

                                        {/* Name */}
                                        <h2 className="font-baskerville italic text-3xl md:text-4xl text-white mb-4 leading-tight">
                                            {getLocalizedValue(event.name, locale as Locale)}
                                        </h2>

                                        {/* Description */}
                                        {event.description && (
                                            <p className="text-white/60 leading-relaxed">
                                                {getLocalizedValue(event.description, locale as Locale)}
                                            </p>
                                        )}

                                        {/* Divider */}
                                        <div className="w-12 h-0.5 bg-can-nou-primary mt-6"/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
            </section>
        </main>
    )
}