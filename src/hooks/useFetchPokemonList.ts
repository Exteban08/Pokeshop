import { useCallback, useState } from 'react';
import { getPokemonList } from '../services/pokemonApi';

export const useFetchPokemonList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const fetchPokemonList = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      const pokemonListResponse = await getPokemonList(page);
      const pokemonList = pokemonListResponse.map(({ name }) => name);
      return pokemonList;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    fetchPokemonList,
  };
};
