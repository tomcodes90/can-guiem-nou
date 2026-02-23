import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'announcement',
    title: 'Anuncio',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'localizedString',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtítulo',
            type: 'localizedString',
        }),
        defineField({
            name: 'type',
            title: 'Tipo',
            type: 'string',
            options: {
                list: [
                    {title: 'Menú del Día', value: 'daily-menu'},
                    {title: 'Evento', value: 'event'},
                    {title: 'Personalizado', value: 'custom'},
                ]
            },
            initialValue: 'custom',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'link',
            title: 'Enlace',
            type: 'string',
            options: {
                list: [
                    {title: 'Inicio', value: '/'},
                    {title: 'Eventos', value: '/events'},
                    {title: 'Menú', value: '/menu'},
                    {title: 'Ubicación', value: '/location'},
                ]
            },
            description: 'Página a la que llevará el anuncio al hacer clic'
        }),
        defineField({
            name: 'image',
            title: 'Imagen',
            type: 'image',
            options: {hotspot: true}
        }),
        defineField({
            name: 'active',
            title: 'Activo',
            type: 'boolean',
            initialValue: true
        }),
        defineField({
            name: 'order',
            title: 'Orden',
            type: 'number',
            description: 'Orden de aparición (menor número = primero)',
            validation: Rule => Rule.integer().min(0)
        })
    ],
    preview: {
        select: {
            title: 'title.es',
            type: 'type',
            media: 'image',
            active: 'active'
        },
        prepare({title, type, media, active}) {
            return {
                title: title || 'Sin título',
                subtitle: `${type}${active ? '' : ' (inactivo)'}`,
                media
            }
        }
    }
})