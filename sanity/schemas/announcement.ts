import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'announcement',
    title: 'Announcements',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'localizedString',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'localizedString',
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    {title: 'Daily Menu', value: 'daily-menu'},
                    {title: 'Event', value: 'event'},
                    {title: 'Custom Message', value: 'custom'},
                ]
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'string',
            description: 'Optional - where clicking takes the user (e.g. /menu, /events)',
        }),
        defineField({
            name: 'image',
            title: 'Image',
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
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Order in which this appears in the carousel',
            initialValue: 0
        }),
    ],
    preview: {
        select: {
            title: 'title.es',
            type: 'type',
            active: 'active'
        },
        prepare({title, type, active}) {
            return {
                title: title || 'No title',
                subtitle: `${type} ${active ? '(Active)' : '(Hidden)'}`
            }
        }
    }
})