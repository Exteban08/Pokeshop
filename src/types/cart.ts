export interface CartItem {
  pokemonName: string;
  price: number;
  quantity: number;
  pokemonImage: string;
}

export interface CartState {
  items: Record<string, CartItem>;
  total: number;
}
