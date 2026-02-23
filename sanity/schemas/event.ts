import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'event',
    title: 'Evento',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre del Evento',
            type: 'localizedString',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'localizedText',
        }),
        defineField({
            name: 'date',
            title: 'Fecha y Hora',
            type: 'datetime',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'flyer',
            title: 'Cartel',
            type: 'image',
            options: {hotspot: true}
        }),
        defineField({
            name: 'active',
            title: 'Mostrar en la web',
            type: 'boolean',
            initialValue: true
        })
    ],
    preview: {
        select: {
            name: 'name.es',
            date: 'date',
            media: 'flyer'
        },
        prepare({name, date, media}) {
            return {
                title: name,
                subtitle: date ? new Date(date).toLocaleDateString('es-ES') : 'Sin fecha',
                media
            }
        }
    }
})