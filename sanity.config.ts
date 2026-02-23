import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'
import {esESLocale} from '@sanity/locale-es-es'
import {projectId, dataset} from './sanity/env'

export default defineConfig({
    name: 'default',
    title: 'Ca\'n Guiem Nou',

    projectId,
    dataset,

    plugins: [
        structureTool(),
        visionTool(),
        esESLocale(),
    ],

    schema: {
        types: schemaTypes,
    },
})