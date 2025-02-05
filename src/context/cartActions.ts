export type CartAction =
  | {
      type: 'ADD_TO_CART';
      payload: { pokemonName: string; price: number; pokemonImage: string };
    }
  | { type: 'REMOVE_FROM_CART'; payload: { pokemonName: string } }
  | { type: 'CLEAR_CART' }
  | {
      type: 'UPDATE_QUANTITY';
      payload: { pokemonName: string; quantity: number };
    };
