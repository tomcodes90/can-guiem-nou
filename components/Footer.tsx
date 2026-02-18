import Link from 'next/link'
import {getTranslations} from 'next-intl/server'
import {type BarInfo, type Locale} from '@/lib/sanity-queries'
import {Phone, Mail, Instagram, Facebook} from 'lucide-react'
import Separator from '@/components/Separator'

interface FooterProps {
    barInfo: BarInfo
    locale: Locale
}

const dayKeys: Record<string, string> = {
    'Monday': 'mon', 'Tuesday': 'tue', 'Wednesday': 'wed',
    'Thursday': 'thu', 'Friday': 'fri', 'Saturday': 'sat', 'Sunday': 'sun',
    'Lunes': 'mon', 'Martes': 'tue', 'Miércoles': 'wed',
    'Jueves': 'thu', 'Viernes': 'fri', 'Sábado': 'sat', 'Domingo': 'sun',
}

export default async function Footer({barInfo, locale}: FooterProps) {
    const t = await getTranslations('home')
    const tNav = await getTranslations('navigation')

    return (
        <footer className="bg-can-nou-dark text-white">
            <Separator/>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

                    {/* Column 1 - Bar Info */}
                    <div className="flex flex-col items-center">
                        <h3 className="font-baskerville italic text-2xl text-can-nou-accent mb-2">
                            Ca&apos;n Guiem Nou
                        </h3>
                        <p className="text-white/40 text-xs tracking-widest uppercase mb-6">
                            Pamboleria · Desde 1859
                        </p>
                        {barInfo.address && (
                            <address className="not-italic text-white/60 text-sm leading-relaxed text-center">
                                {barInfo.address.street}<br/>
                                {barInfo.address.zipCode} {barInfo.address.city}<br/>
                                {barInfo.address.country}
                            </address>
                        )}
                    </div>

                    {/* Column 2 - Opening Hours */}
                    <div className="flex flex-col items-center">
                        <h4 className="text-xs font-semibold tracking-widest uppercase text-can-nou-accent mb-6 text-center w-full">
                            {t('footer.openingHours')}
                        </h4>
                        <ul className="space-y-2 w-full max-w-xs mx-auto">
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

                    {/* Column 3 - Contact & Social */}
                    <div className="flex flex-col items-center">
                        <h4 className="text-xs font-semibold tracking-widest uppercase text-can-nou-accent mb-6 text-center w-full">
                            {t('footer.contactUs')}
                        </h4>
                        <ul className="space-y-3 mb-8 flex flex-col items-center w-full">
                            {barInfo.phone && (
                                <li className="flex justify-center">

                                    <a href={`tel:${barInfo.phone}`}
                                       className="flex items-center gap-2 text-white/60 hover:text-can-nou-accent transition text-sm"
                                    >
                                        <Phone className="w-4 h-4 text-can-nou-accent"/>
                                        {barInfo.phone}
                                    </a>
                                </li>
                            )}
                            {barInfo.email && (
                                <li className="flex justify-center">

                                    <a href={`mailto:${barInfo.email}`}
                                       className="flex items-center gap-2 text-white/60 hover:text-can-nou-accent transition text-sm"
                                    >
                                        <Mail className="w-4 h-4 text-can-nou-accent"/>
                                        {barInfo.email}
                                    </a>
                                </li>
                            )}
                        </ul>
                        {/* Google Review Button - NEW */}

                        <a href="https://search.google.com/local/writereview?placeid=ChIJmcf--XAhmBIRw9-e9MHLX1s"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="mb-8 inline-flex items-center gap-2 bg-can-nou-primary hover:bg-can-nou-secondary text-white px-6 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-300"
                        >
                            ⭐ {t('footer.rateUs')}
                        </a>
                        {/* Social Media */}
                        {(barInfo.socialMedia?.instagram || barInfo.socialMedia?.facebook) && (
                            <div className="flex flex-col items-center w-full">
                                <h4 className="text-xs font-semibold tracking-widest uppercase text-can-nou-accent mb-4 text-center w-full">
                                    {t('footer.followUs')}
                                </h4>
                                <div className="flex gap-3 justify-center">
                                    {barInfo.socialMedia?.instagram && (

                                        <a href={barInfo.socialMedia.instagram}
                                           target="_blank"
                                           rel="noopener noreferrer"
                                           className="w-9 h-9 flex items-center justify-center bg-can-nou-primary hover:bg-can-nou-secondary transition-colors duration-300"
                                        >
                                            <Instagram className="w-4 h-4 text-white"/>
                                        </a>
                                    )}
                                    {barInfo.socialMedia?.facebook && (

                                        <a href={barInfo.socialMedia.facebook}
                                           target="_blank"
                                           rel="noopener noreferrer"
                                           className="w-9 h-9 flex items-center justify-center bg-can-nou-primary hover:bg-can-nou-secondary transition-colors duration-300"
                                        >
                                            <Facebook className="w-4 h-4 text-white"/>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 py-6">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/30 text-xs tracking-wide">
                            © {new Date().getFullYear()} Ca&apos;n Guiem Nou · {t('footer.rights')}
                        </p>
                        <div className="flex gap-6">
                            {['events', 'menu', 'location'].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${locale}/${item}`}
                                    className="text-white/30 hover:text-can-nou-accent transition text-xs tracking-widest uppercase"
                                >
                                    {tNav(item as never)}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}