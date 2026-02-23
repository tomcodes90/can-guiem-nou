import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'dailyMenu',
    title: 'Menú del Día',
    type: 'document',
    fields: [
        defineField({
            name: 'dayOfWeek',
            title: 'Día de la Semana',
            type: 'string',
            options: {
                list: [
                    {title: 'Lunes', value: 'Monday'},
                    {title: 'Martes', value: 'Tuesday'},
                    {title: 'Miércoles', value: 'Wednesday'},
                    {title: 'Jueves', value: 'Thursday'},
                    {title: 'Viernes', value: 'Friday'},
                    {title: 'Sábado', value: 'Saturday'},
                    {title: 'Domingo', value: 'Sunday'},
                ]
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'dishName',
            title: 'Nombre del Plato',
            type: 'localizedString',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'localizedText',
        }),
        defineField({
            name: 'price',
            title: 'Precio (€)',
            type: 'number',
            validation: Rule => Rule.required().positive()
        }),
        defineField({
            name: 'photo',
            title: 'Foto',
            type: 'image',
            options: {hotspot: true}
        }),
        defineField({
            name: 'active',
            title: 'Mostrar en la web',
            type: 'boolean',
            initialValue: true
        }),
        defineField({
            name: 'lunchHours',
            title: 'Horario Disponible',
            type: 'string',
            initialValue: '13:00 - 15:00',
            description: 'Horario en que este menú está disponible (ej. "13:00 - 15:00")'
        }),
    ],
    preview: {
        select: {
            day: 'dayOfWeek',
            dish: 'dishName.es',
            photo: 'photo',
        },
        prepare({day, dish, photo}) {
            const dayNames: Record<string, string> = {
                'Monday': 'Lunes',
                'Tuesday': 'Martes',
                'Wednesday': 'Miércoles',
                'Thursday': 'Jueves',
                'Friday': 'Viernes',
                'Saturday': 'Sábado',
                'Sunday': 'Domingo'
            }
            return {
                title: `${dayNames[day] || day}: ${dish || 'Sin nombre'}`,
                media: photo,
            }
        }
    }
})