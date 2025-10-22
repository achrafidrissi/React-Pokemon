// src/GenerationsList.tsx
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGenerations, setSelectedGeneration } from '../store/generationsSlice.ts'
import { fetchGenerationDetail } from '../store/generationDetailSlice'
import type { RootState, AppDispatch } from '../store'
// 🎨 Shadcn UI components
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'


export default function GenerationsList() {
    const dispatch = useDispatch<AppDispatch>()
    const { items, status, error, selected } = useSelector(
        (state: RootState) => state.generations
    )

    useEffect(() => {
        if (status === 'idle') dispatch(fetchGenerations())
    }, [status, dispatch])

    // 🚀 Quand une génération est sélectionnée, on va chercher ses pokémons
    useEffect(() => {
        if (selected) {
            dispatch(fetchGenerationDetail(selected))
        }
    }, [selected, dispatch])

    // 🌀 Loading spinner Shadcn + Lucide
    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center py-10 text-indigo-600">
                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                <p className="text-sm font-medium">Chargement des générations...</p>
            </div>
        )
    }

    // ❌ Gestion d’erreur
    if (status === 'failed') {
        return <p className="text-red-500 font-medium">Erreur : {error}</p>
    }

    // ✅ Affichage principal
    return (
        <Card>
            <CardContent className="">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Sélectionne une génération :
                </label>

                <Select
                    value={selected ?? ''}
                    onValueChange={(value) => dispatch(setSelectedGeneration(value))}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="-- choisir --" />
                    </SelectTrigger>

                    <SelectContent
                        position="popper"
                        sideOffset={5}
                        className="min-w-[var(--radix-select-trigger-width)] w-fit"
                    >
                        {items.map((g) => (
                            <SelectItem
                                key={g.name}
                                value={g.name}
                                className="hover:bg-indigo-50 focus:bg-indigo-100 focus:text-indigo-700"
                            >
                                {g.name}
                            </SelectItem>

                        ))}
                    </SelectContent>

                </Select>
            </CardContent>
        </Card>
    )
}
