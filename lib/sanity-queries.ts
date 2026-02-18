import {client} from './sanity'
import {SanityImageSource} from '@sanity/image-url/lib/types/types'

export type Locale = 'es' | 'en' | 'ca' | 'de' | 'fr'

export interface LocalizedString {
    es?: string
    en?: string
    ca?: string
    de?: string
    fr?: string
}

export interface MenuItem {
    _id: string
    name: LocalizedString
    category: string
    description?: LocalizedString
    price: number
    image?: SanityImageSource
    available: boolean
    featured: boolean
}

// Add this interface
export interface DailyMenu {
    _id: string
    dayOfWeek: string
    dishName: LocalizedString
    description?: LocalizedString
    price: number
    photo?: SanityImageSource
    active: boolean
    lunchHours?: string
}

export interface BarInfo {
    _id: string
    name: string
    history: {
        es?: never[]
        en?: never[]
        ca?: never[]
        de?: never[]
        fr?: never[]
    }
    heroImages?: {
        events?: SanityImageSource
        menu?: SanityImageSource
        location?: SanityImageSource
    }
    address: {
        street: string
        city: string
        zipCode: string
        country: string
    }
    location: {
        lat: number
        lng: number
    }
    hours: Array<{
        day: string
        open: string
        close: string
        closed: boolean
    }>
    phone: string
    email: string
    socialMedia: {
        instagram?: string
        facebook?: string
    }
    menuImage?: {
        asset: {
            _ref: string
        }
    }
}

export interface Event {
    _id: string
    name: LocalizedString
    description?: LocalizedString
    date: string
    flyer?: SanityImageSource
    active: boolean
}

export interface Announcement {
    _id: string
    title: LocalizedString
    subtitle?: LocalizedString
    type: 'daily-menu' | 'event' | 'custom'
    link?: string
    image?: SanityImageSource
    active: boolean
    order: number
}

// Add these queries
export async function getTodayLunchSpecial(): Promise<DailyMenu | null> {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = days[new Date().getDay()]

    const query = `*[_type == "dailyMenu" && dayOfWeek == $today && active == true][0]{
    _id,
    dayOfWeek,
    dishName,
    description,
    price,
    photo,
    active,
    lunchHours
  }`
    return await client.fetch(query, {today})
}

export async function getWeeklyLunchMenu(): Promise<DailyMenu[]> {
    const query = `*[_type == "dailyMenu" && active == true] | order(dayOfWeek asc){
    _id,
    dayOfWeek,
    dishName,
    description,
    price,
    photo,
    active,
    lunchHours
  }`
    return await client.fetch(query)
}

export async function getUpcomingEvents(): Promise<Event[]> {
    const now = new Date().toISOString()
    const query = `*[_type == "event" && active == true && date >= $now] | order(date asc){
    _id,
    name,
    description,
    date,
    flyer,
    active
  }`
    return await client.fetch(query, {now})
}

export async function getAnnouncements(): Promise<Announcement[]> {
    const query = `*[_type == "announcement" && active == true] | order(order asc){
    _id,
    title,
    subtitle,
    type,
    link,
    image,
    active,
    order
  }`
    return await client.fetch(query)
}

export function getLocalizedValue(
    field: LocalizedString | undefined,
    locale: Locale
): string {
    if (!field) return ''
    return field[locale] || field['es'] || field['en'] || ''
}

export async function getTodayMenu(): Promise<DailyMenu | null> {
    const today = new Date().toISOString().split('T')[0]
    const query = `*[_type == "dailyMenu" && date == $today && active == true][0]{
    _id,
    date,
    dishName,
    description,
    price,
    photo,
    active
  }`
    return await client.fetch(query, {today})
}

export async function getAllMenuItems(): Promise<MenuItem[]> {
    const categoryOrder = ['tapas', 'pizzas', 'ensaladas', 'pamboli', 'burgers', 'algo-mas']

    const query = `*[_type == "menuItem" && available == true]{
    _id,
    name,
    category,
    description,
    price,
    image,
    available,
    featured
  }`

    const items = await client.fetch(query)

    // Sort by our custom category order
    return items.sort((a: MenuItem, b: MenuItem) => {
        return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
    })
}

export async function getBarInfo(): Promise<BarInfo | null> {
    const query = `*[_type == "barInfo"][0]{
    _id,
    name,
    history,
    heroImages,
    address,
    location,
    hours,
    phone,
    email,
    socialMedia,
    menuImage
  }`
    return await client.fetch(query)
}

export function groupByCategory(items: MenuItem[]) {
    return items.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = []
        }
        acc[item.category].push(item)
        return acc
    }, {} as Record<string, MenuItem[]>)
}