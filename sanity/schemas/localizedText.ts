import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'localizedText',
    title: 'Localized Text',
    type: 'object',
    fields: [
        defineField({name: 'es', title: 'Español', type: 'text', rows: 4}),
        defineField({name: 'en', title: 'English', type: 'text', rows: 4}),
        defineField({name: 'ca', title: 'Català', type: 'text', rows: 4}),
        defineField({name: 'de', title: 'Deutsch', type: 'text', rows: 4}),
        defineField({name: 'fr', title: 'Français', type: 'text', rows: 4}),
    ]
})