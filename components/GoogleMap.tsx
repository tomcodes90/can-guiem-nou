'use client'

import {useState} from 'react'
import {MapPin} from 'lucide-react'

interface GoogleMapProps {
    lat: number
    lng: number
}

export default function GoogleMap({lat, lng}: GoogleMapProps) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
            {/* Loading skeleton */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-can-nou-dark/20 animate-pulse flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-white/40 animate-bounce"/>
                </div>
            )}

            {/* Actual map */}
            <iframe
                src={`https://www.google.com/maps?q=${lat},${lng}&hl=es&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ca'n Guiem Nou Location"
                onLoad={() => setIsLoaded(true)}
                className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    )
}