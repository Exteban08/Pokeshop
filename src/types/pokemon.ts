export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonTypeList {
  pokemon: Pokemon;
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

interface PokemonSprites {
  front_default: string;
}

interface PokemonAbility {
  name: string;
}

interface PokemonAbilities {
  ability: PokemonAbility;
}

export interface PokemonDetails {
  id: number;
  name: string;
  url: string;
  price: number;
  weight: number;
  height: number;
  sprites: PokemonSprites;
  types: PokemonTypes[];
  stats: PokemonStats[];
  abilities: PokemonAbilities[];
}
