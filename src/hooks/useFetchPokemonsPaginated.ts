import { usePokemonContext } from "../context/usePokemonContext";
import { getPokemonDetails } from "../services/pokemonApi";
import { PokemonDetails } from "../types/pokemon";

interface FetchPokemonPaginatedParams {
  pokemonNames: string[];
}

export const useFetchPokemonPaginated = (
  params: FetchPokemonPaginatedParams
) => {
  const { pokemons, addPokemons } = usePokemonContext();

  const fetchPokemonsPaginated = async () => {
    const pokemonsPromises = await Promise.all(
      params.pokemonNames
        .filter((pokemonName) => (pokemons[pokemonName] ? false : true))
        .map((pokemonName) => getPokemonDetails(pokemonName))
    );
    const filteredPokemons: PokemonDetails[] = pokemonsPromises.filter(
      (pokemon): pokemon is PokemonDetails => pokemon !== null
    );
    addPokemons(filteredPokemons);
  };

  return {
    fetchPokemonsPaginated,
  };
};
