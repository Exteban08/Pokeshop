export interface CartItem {
  pokemonName: string,
  price: number;
  quantity: number;
}

export interface CartState {
  items: Record<string, CartItem>;
  total: number;
}
