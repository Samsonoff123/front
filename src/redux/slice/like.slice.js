import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = []

export const LikeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        addToLike: (state, action) => {
            state.push(action.payload)
        },

        removeLike: (state, action) => {
            return state.filter(p => p.id !== action.payload.id)
        },
    }
})

export const likeReducer = LikeSlice.reducer
export const likeActions = LikeSlice.actions