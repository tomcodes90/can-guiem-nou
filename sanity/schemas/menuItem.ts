import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'menuItem',
    title: 'Menu Item',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Item Name',
            type: 'localizedString',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'category',
            title: 'Category',
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
            title: 'Description',
            type: 'localizedText',
        }),
        defineField({
            name: 'price',
            title: 'Price (€)',
            type: 'number',
            validation: Rule => Rule.required().positive()
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {hotspot: true}
        }),
        defineField({
            name: 'available',
            title: 'Available',
            type: 'boolean',
            initialValue: true
        }),
        defineField({
            name: 'featured',
            title: 'Featured Item',
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