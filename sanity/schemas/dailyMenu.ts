import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'dailyMenu',
    title: 'Daily Lunch Menu',
    type: 'document',
    fields: [
        defineField({
            name: 'dayOfWeek',
            title: 'Day of Week',
            type: 'string',
            options: {
                list: [
                    {title: 'Monday', value: 'Monday'},
                    {title: 'Tuesday', value: 'Tuesday'},
                    {title: 'Wednesday', value: 'Wednesday'},
                    {title: 'Thursday', value: 'Thursday'},
                    {title: 'Friday', value: 'Friday'},
                    {title: 'Saturday', value: 'Saturday'},
                    {title: 'Sunday', value: 'Sunday'},
                ]
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'dishName',
            title: 'Dish Name',
            type: 'localizedString',
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
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: {hotspot: true}
        }),
        defineField({
            name: 'active',
            title: 'Show on website',
            type: 'boolean',
            initialValue: true
        }),
        defineField({
            name: 'lunchHours',
            title: 'Available Hours',
            type: 'string',
            initialValue: '13:00 - 15:00',
            description: 'Time this lunch special is available (e.g. "13:00 - 15:00")'
        }),
    ],
    preview: {
        select: {
            day: 'dayOfWeek',
            dish: 'dishName.es',
            photo: 'photo',
        },
        prepare({day, dish, photo}) {
            return {
                title: `${day}: ${dish || 'No dish name'}`,
                media: photo,
            }
        }
    }
})