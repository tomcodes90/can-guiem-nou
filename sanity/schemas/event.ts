import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'event',
    title: 'Events',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Event Name',
            type: 'localizedString',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'localizedText',
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'datetime',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'flyer',
            title: 'Event Flyer',
            type: 'image',
            options: {hotspot: true}
        }),
        defineField({
            name: 'active',
            title: 'Show on website',
            type: 'boolean',
            initialValue: true
        }),
    ],
    preview: {
        select: {
            title: 'name.es',
            date: 'date',
            media: 'flyer',
            active: 'active'
        },
        prepare({title, date, media, active}) {
            return {
                title: title || 'No name',
                subtitle: `${date} ${active ? '(Active)' : '(Hidden)'}`,
                media
            }
        }
    }
})