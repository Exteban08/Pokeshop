import { CartState } from "../types/pokemon";
import { CartAction } from "./cartActions";

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item) => item.pokemon.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.pokemon.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        };
      }

      return {
        ...state,
        items: [...state.items, { pokemon: action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      };
    }

    case "UPDATE_QUANTITY": {
      const { pokemon, quantity } = action.payload;

      return {
        ...state,
        items: state.items.map((item) =>
          item.pokemon.id === pokemon.id ? { ...item, quantity } : item
        ),
        total: state.items.reduce((acc, item) => {
          if (item.pokemon.id === pokemon.id) {
            return acc + item.pokemon.price * quantity;
          }
          return acc + item.pokemon.price * item.quantity;
        }, 0),
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        items: state.items.filter((item) => item.pokemon.id !== action.payload),
        total: state.items.reduce(
          (acc, item) =>
            item.pokemon.id !== action.payload
              ? acc + item.pokemon.price * item.quantity
              : acc,
          0
        ),
      };
    }

    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
      };

    default:
      return state;
  }
};
