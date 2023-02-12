import { configureStore } from '@reduxjs/toolkit'
import { emptySplitApi } from './api'
import { cartReducer } from './slice/cart.slice'
import { likeReducer } from './slice/like.slice'

export const store = configureStore({
    reducer: { 
        cart: cartReducer,
        like: likeReducer,
        [emptySplitApi.reducerPath] : emptySplitApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(emptySplitApi.middleware)
})
