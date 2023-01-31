import sanityClient from '@sanity/client';
const client = sanityClient({
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-01-08',
    useCdn: false, //'false if you want to ensure fresh data
    token: ''
})

export default client;