import { emptySplitApi } from "../api"


const productApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => 'product',
    }),
  }),
  overrideExisting: false,
})

export const { useGetProductsQuery } = productApi