// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import generationsReducer from './generationsSlice'
import generationDetailReducer from './generationDetailSlice'

export const store = configureStore({
    reducer: {
        generations: generationsReducer,
        generationDetail: generationDetailReducer,
    },
})

// types utiles pour tout le projet
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
