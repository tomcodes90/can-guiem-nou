interface JsonLdProps {
    data: {
        '@context': string
        '@type': string
        [key: string]: any
    }
}

export default function JsonLd({data}: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
        />
    )
}