import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'barInfo',
    title: 'Bar Information',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Bar Name',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'history',
            title: 'History / About',
            type: 'localizedBlock',
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'object',
            fields: [
                {name: 'street', type: 'string', title: 'Street'},
                {name: 'city', type: 'string', title: 'City'},
                {name: 'zipCode', type: 'string', title: 'Zip Code'},
                {name: 'country', type: 'string', title: 'Country'},
            ]
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'geopoint'
        }),
        defineField({
            name: 'hours',
            title: 'Opening Hours',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {name: 'day', type: 'string', title: 'Day'},
                        {name: 'open', type: 'string', title: 'Opening Time'},
                        {name: 'close', type: 'string', title: 'Closing Time'},
                        {name: 'closed', type: 'boolean', title: 'Closed'}
                    ]
                }
            ]
        }),
        defineField({name: 'phone', title: 'Phone Number', type: 'string'}),
        defineField({name: 'email', title: 'Email', type: 'string'}),
        defineField({
            name: 'socialMedia',
            title: 'Social Media',
            type: 'object',
            fields: [
                {name: 'instagram', type: 'url', title: 'Instagram'},
                {name: 'facebook', type: 'url', title: 'Facebook'},
            ]
        }),
        defineField({
            name: 'menuImage',
            title: 'Menu Image',
            type: 'image',
            description: 'Upload the menu image here',
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'heroImages',
            title: 'Hero Images',
            description: 'Exactly 3 images for the hero section (Events, Menu, Location)',
            type: 'object',
            fields: [
                {name: 'events', type: 'image', title: 'Events Image', options: {hotspot: true}},
                {name: 'menu', type: 'image', title: 'Menu Image', options: {hotspot: true}},
                {name: 'location', type: 'image', title: 'Location Image', options: {hotspot: true}},
            ]
        }),
    ]
})