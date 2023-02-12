import { createSlice } from '@reduxjs/toolkit';

const initialState = []

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload)
        },

        removeCart: (state, action) => {
            return state.filter(p => p.id !== action.payload.id)
        },
    }
})

export const cartReducer = CartSlice.reducer
export const cartActions = CartSlice.actions