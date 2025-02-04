import { CartItem, Pokemon } from "../types/pokemon";

export type CartAction =
  | { type: "ADD_TO_CART"; payload: Pokemon }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "CLEAR_CART" }
  | { type: "UPDATE_QUANTITY"; payload: CartItem };
