import { createContext } from "react";
import { CartState, Pokemon } from "../types/pokemon";

interface PokemonContextType {
  pokemonList: Pokemon[];
  setPokemonList: (list: Pokemon[]) => void;
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  cart: CartState;
  addToCart: (pokemon: Pokemon) => void;
  removeFromCart: (pokemonId: number) => void;
  clearCart: () => void;
  applyDiscount: (discount: number) => void;
}

export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);
