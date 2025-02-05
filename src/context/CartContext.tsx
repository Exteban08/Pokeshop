import { createContext } from 'react';
import { CartState } from '../types/cart';

interface CartContextType {
  cart: CartState;
  addToCart: (payload: {
    pokemonName: string;
    price: number;
    pokemonImage: string;
  }) => void;
  removeFromCart: (pokemonName: string) => void;
  clearCart: () => void;
  updateQuantity: (payload: { pokemonName: string; quantity: number }) => void;
  isCartOpen: boolean;
  setIsCartOpen: (newValue: boolean) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
