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

    case "REMOVE_FROM_CART": {
      const itemToRemove = state.items.find(
        (item) => item.pokemon.id === action.payload
      );

      if (!itemToRemove) return state;

      if (itemToRemove.quantity > 1) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.pokemon.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
          total: state.total - itemToRemove.pokemon.price,
        };
      }

      return {
        ...state,
        items: state.items.filter((item) => item.pokemon.id !== action.payload),
        total: state.total - itemToRemove.pokemon.price,
      };
    }

    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
        discount: 0,
      };

    case "APPLY_DISCOUNT": {
      const discount = action.payload;
      const discountedTotal = state.total * (1 - discount / 100);

      return {
        ...state,
        discount,
        total: discountedTotal,
      };
    }

    default:
      return state;
  }
};
