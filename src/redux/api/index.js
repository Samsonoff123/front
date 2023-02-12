import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/'}),
    endpoints: () => ({}),
})