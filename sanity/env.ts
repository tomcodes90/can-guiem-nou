export const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-28'

export const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sqg33klv'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
        throw new Error(errorMessage)
    }

    return v
}