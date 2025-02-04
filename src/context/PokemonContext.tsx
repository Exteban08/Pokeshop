import { createContext } from "react";
import { Pokemon, PokemonDetails } from "../types/pokemon";

interface PokemonContextType {
  pokemons: Record<string, PokemonDetails>;
  addPokemon: (pokemonDetails: PokemonDetails) => void;
  pokemonList: Pokemon[];
  setPokemonList: (list: Pokemon[]) => void;
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);
