// src/App.tsx
import GenerationsList from "./store/GenerationsList.tsx";
import PokemonsList from "@/store/PokemonsList.tsx";

export default function App() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-white text-gray-900 p-6">
            <h1 className="text-3xl font-bold mb-6 text-indigo-600">Gestion des données - TD</h1>
            <div className="grid gap-8 md:grid-cols-2">
                <div className="p-4 rounded-2xl shadow-md bg-white">
                    <GenerationsList />
                </div>
                <div className="p-4 rounded-2xl shadow-md bg-white">
                    <PokemonsList />
                </div>
            </div>
        </main>
    )
}