import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'https://umka-diplom-samsonoff123.vercel.app/api/'}),
    endpoints: () => ({}),
})