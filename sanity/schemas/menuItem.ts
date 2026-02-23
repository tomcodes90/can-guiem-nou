import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'menuItem',
    title: 'Plato del Menú',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre del Plato',
            type: 'localizedString',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'category',
            title: 'Categoría',
            type: 'string',
            options: {
                list: [
                    {title: 'Tapas', value: 'tapas'},
                    {title: 'Pizzas', value: 'pizzas'},
                    {title: 'Ensaladas', value: 'ensaladas'},
                    {title: 'Pamboli', value: 'pamboli'},
                    {title: 'Burgers', value: 'burgers'},
                    {title: 'Algo Más', value: 'algo-mas'},
                ]
            },
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
            name: 'image',
            title: 'Imagen',
            type: 'image',
            options: {hotspot: true}
        }),
        defineField({
            name: 'available',
            title: 'Disponible',
            type: 'boolean',
            initialValue: true
        }),
        defineField({
            name: 'featured',
            title: 'Destacado',
            type: 'boolean',
            initialValue: false
        })
    ],
    preview: {
        select: {
            name: 'name.es',
            category: 'category',
            media: 'image'
        },
        prepare({name, category, media}) {
            return {
                title: name,
                subtitle: category,
                media
            }
        }
    }
})