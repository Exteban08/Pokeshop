export interface Pokemon {
  id: number;
  name: string;
  price: number;
  url: string;
}

interface PokemonStat {
  name: string;
}

export interface PokemonStats {
  base_stat: number;
  stat: PokemonStat;
}

interface PokemonType {
  name: string;
}

export interface PokemonTypes {
  type: PokemonType;
}

export interface PokemonDetails {
  id: number;
  name: string;
  url: string;
  price: number;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
  types: PokemonTypes[];
  stats: PokemonStats[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

export interface CartItem {
  pokemon: Pokemon;
  quantity: number;
  price: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}
