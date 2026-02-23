import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'barInfo',
    title: 'Información del Bar',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre del Bar',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'history',
            title: 'Historia',
            type: 'localizedBlock',
        }),
        defineField({
            name: 'address',
            title: 'Dirección',
            type: 'object',
            fields: [
                {name: 'street', type: 'string', title: 'Calle'},
                {name: 'city', type: 'string', title: 'Ciudad'},
                {name: 'zipCode', type: 'string', title: 'Código Postal'},
                {name: 'country', type: 'string', title: 'País'},
            ]
        }),
        defineField({
            name: 'location',
            title: 'Ubicación',
            type: 'geopoint',
            description: 'Arrastra el marcador al lugar exacto del bar'
        }),
        defineField({
            name: 'hours',
            title: 'Horario de Apertura',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {name: 'day', type: 'string', title: 'Día'},
                        {name: 'open', type: 'string', title: 'Hora de Apertura'},
                        {name: 'close', type: 'string', title: 'Hora de Cierre'},
                        {name: 'closed', type: 'boolean', title: 'Cerrado'}
                    ]
                }
            ]
        }),
        defineField({name: 'phone', title: 'Teléfono', type: 'string'}),
        defineField({name: 'email', title: 'Correo Electrónico', type: 'string'}),
        defineField({
            name: 'socialMedia',
            title: 'Redes Sociales',
            type: 'object',
            fields: [
                {name: 'instagram', type: 'url', title: 'Instagram'},
                {name: 'facebook', type: 'url', title: 'Facebook'},
            ]
        }),
        defineField({
            name: 'heroImages',
            title: 'Imágenes del Hero',
            type: 'object',
            fields: [
                {name: 'events', type: 'image', title: 'Imagen de Eventos', options: {hotspot: true}},
                {name: 'menu', type: 'image', title: 'Imagen del Menú', options: {hotspot: true}},
                {name: 'location', type: 'image', title: 'Imagen de Ubicación', options: {hotspot: true}},
            ]
        }),
        defineField({
            name: 'menuImage',
            title: 'Imagen del Menú Completo',
            type: 'image',
            description: 'Imagen del menú para descargar',
            options: {hotspot: true}
        }),
    ],
    preview: {
        select: {
            title: 'name',
        }
    }
})