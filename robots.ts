import {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/studio/', // Don't index Sanity Studio
        },
        sitemap: 'https://cannou.com/sitemap.xml', // Update this when domain is ready
    }
}