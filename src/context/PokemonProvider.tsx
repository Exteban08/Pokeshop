import { useState, ReactNode, useCallback } from "react";
import { PokemonContext } from "./PokemonContext";
import { PokemonDetails } from "../types/pokemon";

interface PokemonProviderProps {
  children: ReactNode;
}

interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [pokemons, setPokemons] = useState<Record<string, PokemonDetails>>({});

  const addPokemon = useCallback((pokemon: PokemonDetails) => {
    if (pokemons[pokemon.name]) {
      return;
    }

    setPokemons((prevPokemons) => ({
      ...prevPokemons,
      [pokemon.name]: pokemon,
    }));
  }, [pokemons]);

  const addPokemons = useCallback((pokemonsDetails: PokemonDetails[]) => {
    setPokemons((prevPokemons) => {
      const newPokemons = { ...prevPokemons };
      let hasChanges = false;

      for (const pokemonDetails of pokemonsDetails) {
        if (!newPokemons[pokemonDetails.name]) {
          newPokemons[pokemonDetails.name] = pokemonDetails;
          hasChanges = true;
        }
      }

      return hasChanges ? newPokemons : prevPokemons;
    });
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        addPokemon,
        addPokemons,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
