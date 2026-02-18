'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {type Announcement, type Locale, getLocalizedValue} from '@/lib/sanity-queries'
import {urlFor} from '@/lib/sanity'
import {ArrowRight} from 'lucide-react'
import Separator from "@/components/Separator";

interface AnnouncementCarouselProps {
    announcements: Announcement[]
    locale: Locale
}

export default function AnnouncementCarousel({announcements, locale}: AnnouncementCarouselProps) {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (announcements.length <= 1) return

        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % announcements.length)
        }, 10000)

        return () => clearInterval(timer)
    }, [announcements.length])

    if (!announcements || announcements.length === 0) return null

    const announcement = announcements[current]

    return (
        <section className="bg-can-nou-dark text-white relative overflow-hidden -mt-1">
            <Separator/>
            <div className="flex h-64 md:h-72">

                {/* Left - Image */}
                <div className="relative w-1/2 flex-shrink-0">
                    {announcement.image ? (
                        <Image
                            src={urlFor(announcement.image).width(800).height(600).url()}
                            alt={getLocalizedValue(announcement.title, locale)}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-can-nou-primary/30 flex items-center justify-center">
                            <span className="text-6xl">🍽️</span>
                        </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-can-nou-dark/80"/>
                </div>

                {/* Right - Content */}
                <div className="w-1/2 flex flex-col justify-center px-6 md:px-8 py-6">
                    {/* Title */}
                    <h3 className="font-baskerville italic text-xl md:text-3xl lg:text-4xl text-white mb-3 leading-tight">
                        {getLocalizedValue(announcement.title, locale)}
                    </h3>

                    {/* Subtitle */}
                    {announcement.subtitle && (
                        <p className="text-white/60 text-xs md:text-sm mb-6">
                            {getLocalizedValue(announcement.subtitle, locale)}
                        </p>
                    )}

                    {/* Link button - just icon */}
                    {announcement.link && (
                        <div>
                            <Link
                                href={`/${locale}${announcement.link}`}
                                className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border-2 border-can-nou-accent text-can-nou-accent hover:bg-can-nou-accent hover:text-can-nou-dark transition-all duration-300"
                            >
                                <ArrowRight className="w-6 h-6 md:w-7 md:h-7"/>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Dots - vertical on the right */}
                {announcements.length > 1 && (
                    <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                        {announcements.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`w-2 rounded-full transition-all duration-300 ${
                                    index === current
                                        ? 'bg-can-nou-accent h-6'
                                        : 'bg-white/30 h-2'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                <div
                    key={current}
                    className="h-full bg-can-nou-accent animate-progress"
                    style={{animationDuration: '10000ms'}}
                />
            </div>
        </section>
    )
}