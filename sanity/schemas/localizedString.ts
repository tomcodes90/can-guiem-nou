import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'localizedString',
    title: 'Localized String',
    type: 'object',
    fields: [
        defineField({name: 'es', title: 'Español', type: 'string'}),
        defineField({name: 'en', title: 'English', type: 'string'}),
        defineField({name: 'ca', title: 'Català', type: 'string'}),
        defineField({name: 'de', title: 'Deutsch', type: 'string'}),
        defineField({name: 'fr', title: 'Français', type: 'string'}),
    ]
})