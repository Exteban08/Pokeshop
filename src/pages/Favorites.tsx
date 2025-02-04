import { useContext, useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import PokemonCard from "../components/PokemonCard";
import { useTheme } from "../context/useTheme";
import { getPokemonDetails } from "../services/pokemonApi";
import { FavoritesContext } from "../context/FavoritesContext";
import { usePokemonContext } from "../context/usePokemonContext";

const Favorites = () => {
  const { theme } = useTheme();
  const { favorites } = useContext(FavoritesContext);
  const { pokemons, addPokemon } = usePokemonContext();
  const [loading, setLoading] = useState(true);
  const pokemonList = Object.keys(favorites).map(
    (pokemonName) => pokemons[pokemonName]
  );

  useEffect(() => {
    const fetchFavoritePokemon = async () => {
      const promises = await Promise.all(
        Object.keys(favorites).map(async (pokemonName) => {
          if (pokemons[pokemonName]) {
            return true;
          }

          const pokemon = await getPokemonDetails(pokemonName);

          if (pokemon) {
            addPokemon(pokemon);
          }
        })
      );
      setLoading(false);
      console.log("🚀 ~ fetchFavoritePokemon ~ promises:", promises);
    };

    fetchFavoritePokemon();
  }, [favorites, addPokemon, pokemons]);

  if (loading) return <div>loading</div>;

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

export default Favorites;
