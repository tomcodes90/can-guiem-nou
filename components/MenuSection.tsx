import Image from 'next/image'
import {MenuItem, Locale, getLocalizedValue} from '@/lib/sanity-queries'
import {urlFor} from '@/lib/sanity'

interface MenuSectionProps {
    title: string
    items: MenuItem[]
    locale: Locale
}

export default function MenuSection({title, items, locale}: MenuSectionProps) {
    return (
        <section className="mb-16">
            {/* Category Header */}
            <div className="flex items-center gap-6 mb-8">
                <div className="flex-1 h-px bg-white/10"/>
                <h2 className="font-nothing italic text-3xl md:text-4xl text-can-nou-accent">
                    {title}
                </h2>
                <div className="flex-1 h-px bg-white/10"/>
            </div>

            {/* Items Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                {items.map((item) => (
                    <div
                        key={item._id}
                        className="flex gap-4 p-4 border border-white/5 hover:border-can-nou-accent/30 transition-colors duration-300 group"
                    >
                        {/* Image */}
                        {item.image && (
                            <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                                <Image
                                    src={urlFor(item.image).width(200).height(200).url()}
                                    alt={getLocalizedValue(item.name, locale)}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2 mb-1">
                                <h3 className="font-baskerville italic text-lg text-white leading-tight">
                                    {getLocalizedValue(item.name, locale)}
                                    {item.featured && (
                                        <span
                                            className="ml-2 text-xs bg-can-nou-primary/30 text-can-nou-accent px-2 py-0.5 rounded not-italic font-normal">
                      ★
                    </span>
                                    )}
                                </h3>
                                <span className="text-can-nou-accent font-semibold flex-shrink-0">
                  €{item.price.toFixed(2)}
                </span>
                            </div>
                            {item.description && (
                                <p className="text-white/50 text-sm leading-relaxed">
                                    {getLocalizedValue(item.description, locale)}
                                </p>
                            )}
                            {!item.available && (
                                <span className="text-xs text-red-400 mt-1 block">
                  Unavailable
                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}