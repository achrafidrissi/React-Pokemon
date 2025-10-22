import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loader2 } from 'lucide-react'


export default function PokemonsList() {
    const { pokemons, status, error } = useSelector((s: RootState) => s.generationDetail)

    // 🌀 Loading spinner stylé
    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center py-10 text-indigo-600">
                <Loader2 className="w-10 h-10 animate-spin mb-2" />
                <p className="text-sm font-medium">Chargement des pokémons...</p>
            </div>
        )
    }
    if (status === 'failed') {
        return <p className="text-red-500">Erreur: {error}</p>
    }

    if (!pokemons.length) {
        return <p className="text-gray-500 italic">Sélectionne une génération pour voir les pokémons.</p>
    }

    // ✅ Liste avec ScrollArea
    return (
        <Card className="h-[400px]">
            <CardContent className="p-4">
                <ScrollArea className="h-[360px] rounded-md">
                    <ul className="space-y-2">
                        {pokemons.map((p) => (
                            <li
                                key={p.name}
                                className="capitalize text-gray-800 hover:text-indigo-600 cursor-pointer transition-colors"
                            >
                                {p.name}
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
