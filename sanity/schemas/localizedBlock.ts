import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'localizedBlock',
    title: 'Localized Block',
    type: 'object',
    fields: [
        defineField({name: 'es', title: 'Español', type: 'array', of: [{type: 'block'}]}),
        defineField({name: 'en', title: 'English', type: 'array', of: [{type: 'block'}]}),
        defineField({name: 'ca', title: 'Català', type: 'array', of: [{type: 'block'}]}),
        defineField({name: 'de', title: 'Deutsch', type: 'array', of: [{type: 'block'}]}),
        defineField({name: 'fr', title: 'Français', type: 'array', of: [{type: 'block'}]}),
    ]
})