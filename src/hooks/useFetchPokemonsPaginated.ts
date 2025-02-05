import { useCallback } from 'react';
import { usePokemonContext } from '../context/usePokemonContext';
import { getPokemonDetails } from '../services/pokemonApi';
import { PokemonDetails } from '../types/pokemon';

export const useFetchPokemonsPaginated = () => {
  const { pokemons, addPokemons } = usePokemonContext();

  const fetchPokemonsPaginated = useCallback(
    async (pokemonNames: string[]) => {
      const pokemonsPromises = await Promise.all(
        pokemonNames
          .filter((pokemonName) => (pokemons[pokemonName] ? false : true))
          .map((pokemonName) => getPokemonDetails(pokemonName)),
      );
      const filteredPokemons: PokemonDetails[] = pokemonsPromises.filter(
        (pokemon): pokemon is PokemonDetails => pokemon !== null,
      );
      addPokemons(filteredPokemons);
    },
    [addPokemons, pokemons],
  );

  return {
    fetchPokemonsPaginated,
  };
};
