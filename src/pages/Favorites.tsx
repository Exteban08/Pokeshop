import { useContext, useEffect, useState } from 'react';
import HomeButton from '../components/HomeButton';
import PokemonCard from '../components/PokemonCard';
import { getPokemonDetails } from '../services/pokemonApi';
import { FavoritesContext } from '../context/FavoritesContext';
import { usePokemonContext } from '../context/usePokemonContext';
import { PokemonDetails } from '../types/pokemon';

const FavoritesSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="top-0 flex w-full items-center justify-between p-4">
        <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="hidden sm:block">
          <div className="h-8 w-32 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-10 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-8 w-10 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-8 w-10 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>

      <div className="flex w-full justify-end gap-2 pr-4">
        <div className="h-10 w-20 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="h10 w-52 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="grid w-full grid-cols-1 justify-items-center gap-10 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 15 }, (_, index) => (
          <div
            key={index}
            className="relative flex h-80 w-full animate-pulse rounded-md bg-gray-300 shadow-lg transition-all duration-200 dark:bg-gray-700"
          />
        ))}
      </div>
      <div className="flex w-full items-center justify-center gap-4 pb-4"></div>
    </div>
  );
};

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const { pokemons, addPokemons } = usePokemonContext();
  const [loading, setLoading] = useState(true);
  const pokemonList = Object.keys(favorites).map(
    (pokemonName) => pokemons[pokemonName],
  );

  useEffect(() => {
    const fetchFavoritePokemon = async () => {
      setLoading(true);
      const pokemonsPromises = await Promise.all(
        Object.keys(favorites)
          .filter((pokemonName) => (pokemons[pokemonName] ? false : true))
          .map(async (pokemonName) => getPokemonDetails(pokemonName)),
      );
      const filteredPokemons: PokemonDetails[] = pokemonsPromises.filter(
        (pokemon): pokemon is PokemonDetails => pokemon !== null,
      );
      addPokemons(filteredPokemons);
      setLoading(false);
    };

    fetchFavoritePokemon();
  }, [addPokemons, favorites, pokemons]);

  if (loading) return <FavoritesSkeleton />;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="flex w-full justify-start p-4">
        <HomeButton />
      </div>
      <div className="mb-8 flex w-full justify-center text-center">
        <h1 className="mb-2 text-4xl font-bold capitalize">Favoritos</h1>
      </div>

      {pokemonList.length === 0 && (
        <div className="flex h-full items-center justify-center text-2xl">
          No tienes pokemones en favoritos
        </div>
      )}
      <div className="grid w-full grid-cols-1 justify-items-center gap-10 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemonDetails={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
