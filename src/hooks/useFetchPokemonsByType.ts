import { useCallback } from "react";
import { usePokemonContext } from "../context/usePokemonContext";
import {
  getPokemonDetails,
  getPokemonListByType,
} from "../services/pokemonApi";
import { PokemonDetails } from "../types/pokemon";

export const useFetchPokemonsByType = () => {
  const { pokemons, addPokemons } = usePokemonContext();

  const fetchPokemonsByType = useCallback(async (type: string) => {
    const pokemonsByType = await getPokemonListByType(type);
    const pokemonsList = pokemonsByType.map(({ pokemon }) => pokemon.name);

    const pokemonsPromises = await Promise.all(
      pokemonsList
        .filter((pokemonName) => (pokemons[pokemonName] ? false : true))
        .map((pokemonName) => getPokemonDetails(pokemonName))
    );
    const filteredPokemons: PokemonDetails[] = pokemonsPromises.filter(
      (pokemon): pokemon is PokemonDetails => pokemon !== null
    );
    addPokemons(filteredPokemons);

    return pokemonsList;
  }, [addPokemons, pokemons]);

  return {
    fetchPokemonsByType,
  };
};
