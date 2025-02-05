import { useCallback, useState } from 'react';
import { usePokemonContext } from '../context/usePokemonContext';
import { getPokemonDetails } from '../services/pokemonApi';
import { PokemonDetails } from '../types/pokemon';

export const useFetchPokemonsPaginated = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const { pokemons, addPokemons } = usePokemonContext();

  const fetchPokemonsPaginated = useCallback(
    async (pokemonNames: string[]) => {
      try {
        setIsLoading(true);
        const pokemonsPromises = await Promise.all(
          pokemonNames
            .filter((pokemonName) => (pokemons[pokemonName] ? false : true))
            .map((pokemonName) => getPokemonDetails(pokemonName)),
        );
        const filteredPokemons: PokemonDetails[] = pokemonsPromises.filter(
          (pokemon): pokemon is PokemonDetails => pokemon !== null,
        );
        addPokemons(filteredPokemons);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [addPokemons, pokemons],
  );

  return {
    isLoading,
    error,
    fetchPokemonsPaginated,
  };
};
