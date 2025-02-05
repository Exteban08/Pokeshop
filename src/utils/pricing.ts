import { PokemonStats, PokemonTypes } from '../types/pokemon';

export const calculateBasePrice = (stats: PokemonStats[]): number => {
  const basePrice =
    stats[0].base_stat * 1.0 + // HP
    stats[1].base_stat * 1.5 + // Attack
    stats[2].base_stat * 1.2 + // Defense
    stats[3].base_stat * 1.8 + // Special Attack
    stats[4].base_stat * 1.4 + // Special Defense
    stats[5].base_stat * 1.3; // Speed

  // Using math.round to return a number with fixed decimals.
  // Normally you wouldn't do this because floating point numbers are hard.
  // .toFixed function returns a string but we want a number.
  return Math.round(basePrice * 1e2) / 1e2;
};

const multipliers = {
  dragon: 1.8,
  ghost: 1.6,
  psychic: 1.5,
  normal: 1.0,
  other: 1.1,
};

export const applyTypeMultiplier = (
  basePrice: number,
  types: string[],
): number => {
  if (types.includes('dragon')) {
    return basePrice * multipliers.dragon;
  }
  if (types.includes('ghost')) {
    return basePrice * multipliers.ghost;
  }
  if (types.includes('psychic')) {
    return basePrice * multipliers.psychic;
  }
  if (types.includes('normal')) {
    return basePrice * multipliers.normal;
  }
  return basePrice * multipliers.other;
};

export const applyTypeDiscount = (price: number, types: string[]): number => {
  const discounts = {
    fire: 0.1,
    water: 0.15,
    grass: 0.12,
  };

  if (types.includes('fire')) {
    return price * (1 - discounts.fire);
  }
  if (types.includes('water')) {
    return price * (1 - discounts.water);
  }
  if (types.includes('grass')) {
    return price * (1 - discounts.grass);
  }
  return price;
};

export const calculateFinalPrice = (
  pokemonStats: PokemonStats[],
  pokemonTypes: PokemonTypes[],
): number => {
  const basePrice = calculateBasePrice(pokemonStats);
  const types = pokemonTypes.map(({ type }): string => type.name);
  const priceWithMultiplier = applyTypeMultiplier(basePrice, types);
  const finalPrice = applyTypeDiscount(priceWithMultiplier, types);
  return Math.round(finalPrice * 1e2) / 1e2;
};
