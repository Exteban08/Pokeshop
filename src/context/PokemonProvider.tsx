import { useState, ReactNode} from "react";
import { PokemonContext } from "./PokemonContext";
import { Pokemon, PokemonDetails } from "../types/pokemon";

interface PokemonProviderProps {
  children: ReactNode;
}

interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [pokemons, setPokemons] = useState<Record<string, PokemonDetails>>({});
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addPokemon = (pokemon: PokemonDetails) => {
    if (pokemons[pokemon.name]) {
      return;
    }

    setPokemons((prevPokemons) => ({
      ...prevPokemons,
      [pokemon.name]: pokemon,
    }));
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        addPokemon,
        pokemonList,
        setPokemonList,
        currentPage,
        setCurrentPage,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
