import { useState, ReactNode, useReducer, useEffect } from "react";
import { PokemonContext } from "./PokemonContext";
import { CartState, Pokemon } from "../types/pokemon";
import { cartReducer } from "./cartReducer";

interface PokemonProviderProps {
  children: ReactNode;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

interface PokemonProviderProps {
  children: ReactNode;
}

const localStorageKey = {
  cartState: "cartState",
};

export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cartState, dispatch] = useReducer(cartReducer, initialState, () => {
    const cartStateData = localStorage.getItem(localStorageKey.cartState)
    return cartStateData ? JSON.parse(cartStateData)  : initialState
  });

  const addToCart = (pokemon: Pokemon) => {
    dispatch({ type: "ADD_TO_CART", payload: pokemon });
  };

  const removeFromCart = (pokemonId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: pokemonId });
  };

  const addQuantityToCartElement = (pokemon: Pokemon, quantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { pokemon, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const updateQuantity = (pokemon: Pokemon, quantity: number) => {
    addQuantityToCartElement(pokemon, quantity);
  };

  useEffect(() => {
    localStorage.setItem(localStorageKey.cartState, JSON.stringify(cartState));
  }, [cartState]);

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        setPokemonList,
        currentPage,
        setCurrentPage,
        isLoading,
        setIsLoading,
        error,
        setError,
        cart: cartState,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
