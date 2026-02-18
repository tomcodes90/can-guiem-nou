'use client'

import {useState} from 'react'
import {type MenuItem, type DailyMenu, type Locale, getLocalizedValue} from '@/lib/sanity-queries'
import MenuSection from './MenuSection'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity'

interface MenuTabsProps {
    weeklyLunch: DailyMenu[]
    menuItems: MenuItem[]
    locale: Locale
    translations: {
        weeklyLunch: string
        fullMenu: string
        digitalMenu: string
        exploreMenu: string
        lunchSpecial: string
        categoryTranslations: Record<string, string>
    }
}

export default function MenuTabs({weeklyLunch, menuItems, locale, translations}: MenuTabsProps) {
    const [activeTab, setActiveTab] = useState<'weekly' | 'full'>('weekly')

    const groupByCategory = (items: MenuItem[]) => {
        return items.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = []
            }
            acc[item.category].push(item)
            return acc
        }, {} as Record<string, MenuItem[]>)
    }

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-5xl mx-auto">

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-16">
                    <button
                        onClick={() => setActiveTab('full')}
                        className={`px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${
                            activeTab === 'full'
                                ? 'bg-can-nou-accent text-can-nou-dark'
                                : 'border border-can-nou-accent text-can-nou-accent hover:bg-can-nou-accent/10'
                        }`}
                    >
                        {translations.fullMenu}
                    </button>
                    <button
                        onClick={() => setActiveTab('weekly')}
                        className={`px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${
                            activeTab === 'weekly'
                                ? 'bg-can-nou-accent text-can-nou-dark'
                                : 'border border-can-nou-accent text-can-nou-accent hover:bg-can-nou-accent/10'
                        }`}
                    >
                        {translations.weeklyLunch}
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'weekly' ? (
                    <div>
                        {/* Section intro */}
                        <div className="text-center mb-12">
                            <h2 className="font-nothing text-3xl md:text-4xl text-white mb-2">
                                {translations.weeklyLunch}
                            </h2>
                            <p className="text-white/60 text-sm">
                                {weeklyLunch[0]?.lunchHours || '13:00 - 15:00'}
                            </p>
                        </div>

                        {/* Weekly grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {weeklyLunch.map((lunch) => (
                                <div
                                    key={lunch._id}
                                    className="flex gap-4 p-4 border border-white/10 hover:border-can-nou-accent/30 transition-colors duration-300 group"
                                >
                                    {/* Photo */}
                                    {lunch.photo && (
                                        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                                            <Image
                                                src={urlFor(lunch.photo).width(200).height(200).url()}
                                                alt={getLocalizedValue(lunch.dishName, locale)}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}

                                    {/* Info */}
                                    <div className="flex-1 min-w-0 flex flex-col">
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-can-nou-accent text-xs font-semibold tracking-widest uppercase mb-1">
                                                    {lunch.dayOfWeek}
                                                </p>
                                                <h3 className="font-baskerville italic text-xl text-white leading-tight">
                                                    {getLocalizedValue(lunch.dishName, locale)}
                                                </h3>
                                            </div>
                                            <span
                                                className="text-can-nou-accent font-semibold text-lg flex-shrink-0 ml-2">
      €{lunch.price.toFixed(2)}
    </span>
                                        </div>
                                        {lunch.description && (
                                            <p className="text-white/50 text-sm">
                                                {getLocalizedValue(lunch.description, locale)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Section intro */}
                        <div className="text-center mb-16">
                            <h2 className="font-nothing text-3xl md:text-4xl text-white">
                                {translations.exploreMenu}
                            </h2>
                        </div>

                        {/* Menu sections */}
                        {Object.entries(groupByCategory(menuItems)).map(([category, categoryItems]) => (
                            <MenuSection
                                key={category}
                                title={translations.categoryTranslations[category] || category}
                                items={categoryItems}
                                locale={locale}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}