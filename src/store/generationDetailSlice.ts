import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface PokemonSpecies {
    name: string
    url: string
}

interface GenerationDetailState {
    pokemons: PokemonSpecies[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: GenerationDetailState = {
    pokemons: [],
    status: 'idle',
    error: null,
}

// thunk asynchrone
export const fetchGenerationDetail = createAsyncThunk<
    PokemonSpecies[],
    string // le paramètre = le nom de la génération
>(
    'generationDetail/fetchGenerationDetail',
    async (generationName) => {
        const res = await fetch(`https://pokeapi.co/api/v2/generation/${generationName}/`)
        if (!res.ok) throw new Error('Erreur réseau')
        const data = await res.json()
        // On garde uniquement la liste des pokémons
        return data.pokemon_species as PokemonSpecies[]
    }
)

const generationDetailSlice = createSlice({
    name: 'generationDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenerationDetail.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchGenerationDetail.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.pokemons = action.payload
            })
            .addCase(fetchGenerationDetail.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Erreur inconnue'
            })
    },
})

export default generationDetailSlice.reducer
