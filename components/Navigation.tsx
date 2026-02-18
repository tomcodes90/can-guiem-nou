'use client'

import Link from 'next/link'
import {useTranslations, useLocale} from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'
import {useState, useEffect} from 'react'
import {usePathname} from 'next/navigation'
import {Instagram, Facebook, Menu, X} from 'lucide-react'

interface NavigationProps {
    instagram?: string
    facebook?: string
}

export default function Navigation({instagram, facebook}: NavigationProps) {
    const t = useTranslations('navigation')
    const locale = useLocale()
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [visible, setVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [scrolled, setScrolled] = useState(false)

    const isHome = pathname === `/${locale}`

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            setScrolled(currentScrollY > window.innerHeight * 0.8)

            if (currentScrollY < 10) {
                setVisible(true)
            } else if (currentScrollY > lastScrollY) {
                setVisible(false)
                setIsOpen(false)
            } else {
                setVisible(true)
            }
            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, {passive: true})
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return (
        <>
            <nav className={`
                fixed top-0 left-0 right-0 z-40
                transition-all duration-300
                ${visible ? 'translate-y-0' : '-translate-y-full'}
                ${isHome && !scrolled
                ? 'bg-transparent'
                : isHome && scrolled
                    ? 'bg-can-nou-dark/80 backdrop-blur-md'
                    : 'bg-can-nou-dark shadow-sm'
            }
            `}>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">

                        {/* Left - Bar name */}
                        <Link
                            href={`/${locale}`}
                            className="text-2xl font-baskerville font-bold italic text-white"
                        >
                            Ca&apos;n Guiem Nou
                        </Link>

                        {/* Center - Social icons */}
                        <div className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
                            {instagram && (

                                <a href={instagram}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="w-9 h-9 flex items-center justify-center bg-can-nou-primary hover:bg-can-nou-secondary transition-colors duration-300"
                                >
                                    <Instagram className="w-4 h-4 text-white"/>
                                </a>
                            )}
                            {facebook && (

                                <a href={facebook}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="w-9 h-9 flex items-center justify-center bg-can-nou-primary hover:bg-can-nou-secondary transition-colors duration-300"
                                >
                                    <Facebook className="w-4 h-4 text-white"/>
                                </a>
                            )}
                        </div>

                        {/* Right - Language + Hamburger (always visible) */}
                        <div className="flex items-center gap-3">
                            <LanguageSwitcher isHome={isHome}/>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="w-9 h-9 flex items-center justify-center text-white hover:text-can-nou-accent transition-colors duration-300"
                            >
                                {isOpen ? (
                                    <X className="w-6 h-6"/>
                                ) : (
                                    <Menu className="w-6 h-6"/>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Fullscreen menu overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-can-nou-dark/85 backdrop-blur-sm flex flex-col items-center justify-center">
                    {/* Close button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-6 text-white hover:text-can-nou-accent transition"
                    >
                        <X className="w-8 h-8"/>
                    </button>

                    {/* Bar name */}
                    <p className="font-baskerville italic text-can-nou-accent text-sm tracking-widest uppercase mb-12">
                        Ca&apos;n Guiem Nou
                    </p>

                    {/* Links */}
                    <div className="flex flex-col items-center gap-8">
                        {['home', 'events', 'menu', 'location'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'home' ? `/${locale}` : `/${locale}/${item}`}
                                className="font-nothing italic text-4xl md:text-5xl text-white hover:text-can-nou-accent transition-colors duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                {t(item as never)}
                            </Link>
                        ))}
                    </div>

                    {/* Social icons */}
                    <div className="flex gap-4 mt-16">
                        {instagram && (

                            <a href={instagram}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="w-12 h-12 flex items-center justify-center bg-can-nou-primary hover:bg-can-nou-secondary transition-colors duration-300"
                            >
                                <Instagram className="w-5 h-5 text-white"/>
                            </a>
                        )}
                        {facebook && (

                            <a href={facebook}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="w-12 h-12 flex items-center justify-center bg-can-nou-primary hover:bg-can-nou-secondary transition-colors duration-300"
                            >
                                <Facebook className="w-5 h-5 text-white"/>
                            </a>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}