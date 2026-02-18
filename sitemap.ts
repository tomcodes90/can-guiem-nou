import {MetadataRoute} from 'next'
import {locales} from '@/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://cannou.com' // Update this when domain is ready

    const routes = ['', '/events', '/menu', '/location']

    const sitemap: MetadataRoute.Sitemap = []

    locales.forEach(locale => {
        routes.forEach(route => {
            sitemap.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: route === '/events' ? 'weekly' : 'monthly',
                priority: route === '' ? 1 : 0.8,
            })
        })
    })

    return sitemap
}