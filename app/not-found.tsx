import Link from 'next/link'

export default function NotFound() {
    return (
        <html lang="es">
        <head>
            <title>404 - Can Guiem Nou</title>
        </head>
        <body className="bg-can-nou-dark">
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-2xl">
                {/* 404 */}
                <div className="text-9xl text-can-nou-accent mb-8" style={{fontFamily: 'cursive'}}>
                    404
                </div>

                <h1 className="text-4xl md:text-5xl text-white mb-4" style={{fontFamily: 'cursive'}}>
                    ¡Ups! Página no encontrada
                </h1>

                <p className="text-white/60 text-lg mb-8">
                    Parece que te has perdido. Esta página no existe, pero nuestros pambolis sí.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/es"
                        className="inline-flex items-center justify-center border-2 border-can-nou-accent text-can-nou-accent px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-can-nou-accent hover:text-can-nou-dark transition-all duration-300"
                    >
                        Volver al inicio
                    </Link>
                    <Link
                        href="/es/menu"
                        className="inline-flex items-center justify-center bg-can-nou-accent text-can-nou-dark px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-can-nou-secondary transition-all duration-300"
                    >
                        Ver menú
                    </Link>
                </div>

                {/* Fun backwards clock reference */}
                <p className="text-white/40 text-sm mt-12 italic">
                    Como nuestro reloj, has ido en la dirección equivocada...
                </p>
            </div>
        </main>
        </body>
        </html>
    )
}