import Image from 'next/image'
import Link from 'next/link'
import {getTranslations} from 'next-intl/server'
import {type BarInfo, type Locale} from '@/lib/sanity-queries'
import {urlFor} from '@/lib/sanity'
import {PortableText} from '@portabletext/react'
import Separator from "@/components/Separator";

interface StorySectionProps {
    barInfo: BarInfo
    locale: Locale
}

export default async function StorySection({barInfo, locale}: StorySectionProps) {
    const t = await getTranslations('home')

    const localizedHistory = barInfo.history?.[locale]
        ?? barInfo.history?.['es']
        ?? barInfo.history?.['en']
        ?? null

    return (
        <section className="bg-can-nou-dark text-white">
            {/* Top divider */}
            <Separator/>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-6xl mx-auto">

                    {/* Section header */}
                    <div className="text-center mb-16">
                        <p className="text-can-nou-accent text-sm font-semibold tracking-widest uppercase mb-3">
                            Desde 1859
                        </p>
                        <h2 className="font-nothing  italic text-4xl md:text-5xl text-white">
                            {t('ourStory.title')}
                        </h2>
                        <div className="w-16 h-0.5 bg-can-nou-primary mx-auto mt-6"/>
                    </div>

                    {/* Content - image left, text right */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        {/* Image */}
                        {barInfo.heroImages?.events && (
                            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-sm">
                                <Image
                                    src={urlFor(barInfo.heroImages.events).width(800).height(1000).url()}
                                    alt="Ca'n Guiem Nou"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-4 border border-white/20 pointer-events-none"/>
                            </div>
                        )}

                        {/* Text */}
                        <div className="flex flex-col justify-center">
                            <div className="prose prose-lg prose-invert max-w-none text-white/80 leading-relaxed">
                                {localizedHistory ? (
                                    <PortableText value={localizedHistory}/>
                                ) : (
                                    <p>No content available.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom stats */}
                    <div className="grid grid-cols-2 gap-8 pt-12 border-t border-white/10 max-w-lg mx-auto">
                        <div className="text-center">
                            <p className="font-baskerville italic text-4xl md:text-5xl text-can-nou-accent mb-2">
                                1859
                            </p>
                            <p className="text-white/50 text-sm tracking-widest uppercase">
                                {t('ourStory.founded')}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="font-baskerville italic text-4xl md:text-5xl text-can-nou-accent mb-2">
                                165+
                            </p>
                            <p className="text-white/50 text-sm tracking-widest uppercase">
                                {t('ourStory.yearsOfHistory')}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            
        </section>
    )
}