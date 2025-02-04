import { createContext } from "react";
import { PokemonDetails } from "../types/pokemon";

interface PokemonContextType {
  pokemons: Record<string, PokemonDetails>;
  addPokemon: (pokemonDetails: PokemonDetails) => void;
  addPokemons: (pokemonsDetails: PokemonDetails[]) => void;
}

export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);
