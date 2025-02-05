import { ReactNode, useEffect, useReducer, useState } from 'react';
import { localStorageKey } from '../utils/storage';
import { cartReducer } from './cartReducer';
import { CartContext } from './CartContext';
import { CartState } from '../types/cart';

interface CartContextProps {
  children: ReactNode;
}

const initialState: CartState = {
  items: {},
  total: 0,
};

export const CartProvider = ({ children }: CartContextProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartState, dispatch] = useReducer(cartReducer, initialState, () => {
    const cartStateData = localStorage.getItem(localStorageKey.cartState);
    return cartStateData ? JSON.parse(cartStateData) : initialState;
  });

  const addToCart = (payload: {
    pokemonName: string;
    price: number;
    pokemonImage: string;
  }) => {
    dispatch({ type: 'ADD_TO_CART', payload });
  };

  const removeFromCart = (pokemonName: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { pokemonName } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const updateQuantity = (payload: {
    pokemonName: string;
    quantity: number;
  }) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload,
    });
  };

  useEffect(() => {
    localStorage.setItem(localStorageKey.cartState, JSON.stringify(cartState));
  }, [cartState]);

  return (
    <CartContext.Provider
      value={{
        cart: cartState,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
