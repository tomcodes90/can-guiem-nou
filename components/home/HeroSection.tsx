'use client'

import {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useTranslations} from 'next-intl'
import {type BarInfo, type Locale} from '@/lib/sanity-queries'
import {urlFor} from '@/lib/sanity'
import {type SanityImageSource} from '@sanity/image-url/lib/types/types'
import {ChevronLeft, ChevronRight} from "lucide-react";

interface HeroSectionProps {
    barInfo: BarInfo
    locale: Locale
}

interface HeroColumn {
    key: 'events' | 'menu' | 'location'
    href: string
    image?: SanityImageSource
}

export default function HeroSection({barInfo, locale}: HeroSectionProps) {
    const t = useTranslations('hero')
    const [activeSlide, setActiveSlide] = useState(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const columns: HeroColumn[] = [
        {
            key: 'menu',
            href: `/${locale}/menu`,
            image: barInfo.heroImages?.menu,
        },
        {
            key: 'events',
            href: `/${locale}/events`,
            image: barInfo.heroImages?.events,
        },
        {
            key: 'location',
            href: `/${locale}/location`,
            image: barInfo.heroImages?.location,
        },
    ]

    const scrollToSlide = (index: number) => {
        const container = scrollContainerRef.current
        if (!container) return
        const slideWidth = container.offsetWidth
        container.scrollTo({
            left: slideWidth * index,
            behavior: 'smooth'
        })
    }

    // Track scroll position
    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft
            const slideWidth = container.offsetWidth
            const currentSlide = Math.round(scrollLeft / slideWidth)
            setActiveSlide(currentSlide)
        }

        container.addEventListener('scroll', handleScroll, {passive: true})
        return () => container.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <section className="h-screen -mt-16 relative">

            {/* Columns container */}
            <div
                ref={scrollContainerRef}
                className="flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth md:overflow-x-visible scrollbar-hide"
            >
                {columns.map((column, index) => (
                    <div
                        key={column.key}
                        className="relative h-full flex-shrink-0 w-full md:flex-1 md:w-auto snap-start overflow-hidden group"
                    >
                        {/* Background Image */}
                        {column.image ? (
                            <Image
                                src={urlFor(column.image).width(800).height(1200).url()}
                                alt={t(column.key)}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority={index === 0}
                            />
                        ) : (
                            <div className="absolute inset-0 bg-can-nou-dark"/>
                        )}

                        {/* Overlay */}
                        <div
                            className="absolute inset-0 bg-can-nou-dark/50 group-hover:bg-can-nou-dark/30 transition-colors duration-500"/>

                        {/* Vertical divider desktop only */}
                        {index < columns.length - 1 && (
                            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-white/20 z-10"/>
                        )}

                        {/* Desktop content - inside each column */}
                        <div
                            className="hidden md:flex absolute inset-0 flex-col items-center justify-end text-white z-10 pb-24 px-6">
                            <h2 className="font-nothing text-5xl lg:text-6xl mb-8 text-center drop-shadow-lg">
                                {t(column.key)}
                            </h2>
                            <Link
                                href={column.href}
                                className="border-2 border-white text-white px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-can-nou-dark transition-all duration-300"
                            >
                                {t('explore')}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Centered bar name overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                <h1 className="font-nothing text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg tracking-wide text-center px-4">
                    Ca&apos;n Guiem Nou
                </h1>
                <p className="text-white text-sm md:text-base tracking-widest uppercase mt-2 drop-shadow text-center px-4">
                    Pamboleria · Desde 1859
                </p>
            </div>

            {/* Mobile only - arrows at screen edges and centered title/button */}
            <>
                {/* Arrows at screen edges */}
                <button
                    onClick={() => scrollToSlide(activeSlide - 1)}
                    className={`md:hidden absolute bottom-32 left-2 z-20 text-white/70 hover:text-white transition-all touch-manipulation active:scale-95 p-3 ${
                        activeSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                    aria-label="Previous"
                    disabled={activeSlide === 0}
                >
                    <ChevronLeft className="w-8 h-8"/>
                </button>

                <button
                    onClick={() => scrollToSlide(activeSlide + 1)}
                    className={`md:hidden absolute bottom-32 right-2 z-20 text-white/70 hover:text-white transition-all touch-manipulation active:scale-95 p-3 ${
                        activeSlide === columns.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                    aria-label="Next"
                    disabled={activeSlide === columns.length - 1}
                >
                    <ChevronRight className="w-8 h-8"/>
                </button>

                {/* Centered title and button - mobile only */}
                <div className="md:hidden absolute bottom-24 left-0 right-0 z-20 flex flex-col items-center">
                    <h2 className="font-nothing text-4xl text-center drop-shadow-lg text-white mb-8">
                        {columns[activeSlide] && t(columns[activeSlide].key)}
                    </h2>
                    <Link
                        href={columns[activeSlide]?.href || '/'}
                        className="border-2 border-white text-white px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-can-nou-dark transition-all duration-300"
                    >
                        {t('explore')}
                    </Link>
                </div>
            </>

            {/* Mobile scroll dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20 md:hidden">
                {columns.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full bg-white transition-opacity duration-300 ${
                            index === activeSlide ? 'opacity-100' : 'opacity-40'
                        }`}
                    />
                ))}
            </div>
        </section>
    )
}