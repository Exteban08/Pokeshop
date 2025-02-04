import { useContext, useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import PokemonCard from "../components/PokemonCard";
import { useTheme } from "../context/useTheme";
import { searchPokemon } from "../services/pokemonApi";
import { calculateFinalPrice } from "../utils/pricing";
import { Pokemon } from "../types/pokemon";
import { FavoritesContext } from "../context/FavoritesContext";

const FavoritePokemonList = () => {
  const { theme } = useTheme();
  const { isFavorite } = useContext(FavoritesContext);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const favoriteIds = Object.keys(isFavorite).filter((id) => isFavorite[id]);

  useEffect(() => {
    const fetchFavoritePokemon = async () => {
      const favoritePokemonDetails = await Promise.all(
        favoriteIds.map(async (id) => {
          const details = await searchPokemon(id);
          if (details) {
            const price = parseFloat(calculateFinalPrice(details.stats, details.types).toFixed(2));
            return { ...details, price };
          } else {
            console.error("Incomplete Pokemon details:", details);
            return null;
          }
        })
      );
      setPokemonList(
        favoritePokemonDetails.filter(
          (pokemon) => pokemon !== null
        ) as Pokemon[]
      );
    };

    if (favoriteIds.length > 0) {
      fetchFavoritePokemon();
    } else {
      setPokemonList([]);
    }
  }, [favoriteIds]);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-full flex justify-start p-4">
        <BackButton />
      </div>
      <div className="w-full flex justify-center text-center mb-8">
        <h1 className="text-4xl font-bold capitalize mb-2">Favoritos</h1>
      </div>

      {pokemonList.length === 0 && (
        <div className="h-full flex justify-center items-center text-2xl">
          No tienes pokemones en favoritos
        </div>
      )}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default FavoritePokemonList;
