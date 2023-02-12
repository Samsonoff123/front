import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './slice/cart.slice'
import { likeReducer } from './slice/like.slice'

export const store = configureStore({
    reducer: { 
        cart: cartReducer,
        like: likeReducer
    },
})
