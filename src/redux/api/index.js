import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'https://asem-backend.vercel.app/api/'}),
    endpoints: () => ({}),
})