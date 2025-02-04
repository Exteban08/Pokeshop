import { CartState } from "../types/cart";
import { CartAction } from "./cartActions";

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { pokemonName, price } = action.payload;

      if (state.items[pokemonName]) {
        return {
          ...state,
          items: {
            ...state.items,
            [pokemonName]: {
              ...state.items[pokemonName],
              quantity: state.items[pokemonName].quantity + 1,
            },
          },
          total: state.total + price,
        };
      }

      return {
        ...state,
        items: {
          ...state.items,
          [pokemonName]: {
            pokemonName,
            price,
            quantity: 1,
          },
        },
        total: state.total + price,
      };
    }

    case "UPDATE_QUANTITY": {
      const { pokemonName, quantity } = action.payload;

      const items = {
        ...state.items,
        [pokemonName]: {
          ...state.items[pokemonName],
          quantity,
        },
      };

      return {
        ...state,
        items,
        total: Object.values(items).reduce((sum, item) => {
          return sum + item.quantity * item.price;
        }, 0),
      };
    }

    case "REMOVE_FROM_CART": {
      const { pokemonName } = action.payload;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [pokemonName]: _, ...newItems } = state.items;

      return {
        ...state,
        items: newItems,
        total: Object.values(newItems).reduce((sum, item) => {
          return sum + item.quantity * item.price;
        }, 0),
      };
    }

    case "CLEAR_CART":
      return {
        items: {},
        total: 0,
      };

    default:
      return state;
  }
};
