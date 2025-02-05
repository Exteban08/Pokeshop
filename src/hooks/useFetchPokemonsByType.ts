import { useCallback, useState } from 'react';
import { usePokemonContext } from '../context/usePokemonContext';
import {
  getPokemonDetails,
  getPokemonListByType,
} from '../services/pokemonApi';
import { PokemonDetails } from '../types/pokemon';

export const useFetchPokemonsByType = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const { pokemons, addPokemons, pokemonTypes, addPokemonType } =
    usePokemonContext();

  const fetchPokemonsByType = useCallback(
    async (type: string) => {
      try {
        if (pokemonTypes[type]) {
          return pokemonTypes[type];
        }

        setIsLoading(true);
        const pokemonsByType = await getPokemonListByType(type);
        const pokemonsList = pokemonsByType.map(({ pokemon }) => pokemon.name);

        const pokemonsPromises = await Promise.all(
          pokemonsList
            .filter((pokemonName) => (pokemons[pokemonName] ? false : true))
            .map((pokemonName) => getPokemonDetails(pokemonName)),
        );
        const filteredPokemons: PokemonDetails[] = pokemonsPromises.filter(
          (pokemon): pokemon is PokemonDetails => pokemon !== null,
        );
        addPokemonType(type, pokemonsList);
        addPokemons(filteredPokemons);

        return pokemonsList;
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [addPokemons, pokemons, addPokemonType, pokemonTypes],
  );

  return {
    isLoading,
    error,
    fetchPokemonsByType,
  };
};
