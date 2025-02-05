import { PokemonDetails } from '../types/pokemon';

export function createPokemonDetails(): PokemonDetails {
  return {
    id: 1,
    name: `Pokemon_${Math.random().toString(36).substring(7)}`,
    url: `https://pokeapi.co/api/v2/pokemon/1`,
    price: Math.floor(Math.random() * 100) + 1,
    weight: Math.floor(Math.random() * 50) + 1,
    height: Math.floor(Math.random() * 20) + 1,
    sprites: {
      front_default: '',
    },
    types: [{ type: { name: 'normal' } }],
    stats: [{ base_stat: 50, stat: { name: 'speed' } }],
    abilities: [{ ability: { name: 'run-away' } }],
  };
}
