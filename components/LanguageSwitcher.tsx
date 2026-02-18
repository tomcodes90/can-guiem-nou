'use client'

import {useLocale} from 'next-intl'
import {usePathname, useRouter} from 'next/navigation'
import {locales, localeNames, type Locale} from '@/i18n'
import {useState, useTransition} from 'react'
import Image from 'next/image'

interface LanguageSwitcherProps {
    isHome?: boolean
}

export default function LanguageSwitcher({isHome = false}: LanguageSwitcherProps) {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()
    const [isOpen, setIsOpen] = useState(false)

    const handleLocaleChange = (newLocale: Locale) => {
        const segments = pathname.split('/')
        segments[1] = newLocale
        const newPath = segments.join('/')

        startTransition(() => {
            router.push(newPath)
            setIsOpen(false)
        })
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-2 md:px-4 py-2 rounded-lg border transition bg-transparent border-white/30 text-white hover:bg-white/10"
                disabled={isPending}
            >
                <div className="w-8 h-8 relative flex-shrink-0">
                    <Image
                        src={`/flags/${locale}.png`}
                        alt={locale}
                        fill
                        className="rounded-sm object-contain"
                    />
                </div>
                <span className="hidden md:block font-medium uppercase">{locale}</span>
                <svg
                    className={`hidden md:block w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-48 bg-can-nou-dark rounded-lg shadow-lg border border-white/10 py-1 z-50">
                    {locales.map((loc) => (
                        <button
                            key={loc}
                            onClick={() => handleLocaleChange(loc)}
                            className={`w-full text-left px-4 py-2 hover:bg-white/5 transition flex items-center gap-3 ${
                                locale === loc ? 'text-can-nou-accent font-semibold' : 'text-white/70'
                            }`}
                        >
                            <div className="w-8 h-5 relative flex-shrink-0">
                                <Image
                                    src={`/flags/${loc}.png`}
                                    alt={loc}
                                    fill
                                    className="rounded-sm object-contain"
                                />
                            </div>
                            <span>{localeNames[loc]}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}