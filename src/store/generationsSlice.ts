// src/store/generationsSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

interface Generation {
    name: string
    url: string
}

interface GenerationsState {
    items: Generation[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
    selected: string | null
}

const initialState: GenerationsState = {
    items: [],
    status: 'idle',
    error: null,
    selected: null,
}

export const fetchGenerations = createAsyncThunk<Generation[]>(
    'generations/fetchGenerations',
    async () => {
        const res = await fetch('https://pokeapi.co/api/v2/generation')
        if (!res.ok) throw new Error('Erreur réseau')
        const data = await res.json()
        return data.results as Generation[]
    }
)

const generationsSlice = createSlice({
    name: 'generations',
    initialState,
    reducers: {
        setSelectedGeneration(state, action: PayloadAction<string>) {
            state.selected = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenerations.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchGenerations.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchGenerations.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Erreur inconnue'
            })
    },
})

export const { setSelectedGeneration } = generationsSlice.actions
export default generationsSlice.reducer
