import { expect, describe, it } from 'vitest';
import {
  applyTypeDiscount,
  applyTypeMultiplier,
  calculateBasePrice,
  calculateFinalPrice,
} from './pricing';
import { PokemonStats, PokemonTypes } from '../types/pokemon';

describe('calculateBasePrice', () => {
  it('should return 8.2 when all base stats are 1', () => {
    const pokemonStats: PokemonStats[] = [
      { base_stat: 1, stat: { name: 'HP' } },
      { base_stat: 1, stat: { name: 'Attack' } },
      { base_stat: 1, stat: { name: 'Defense' } },
      { base_stat: 1, stat: { name: 'Special Attack' } },
      { base_stat: 1, stat: { name: 'Special Defense' } },
      { base_stat: 1, stat: { name: 'Speed' } },
    ];

    expect(calculateBasePrice(pokemonStats)).toBe(8.2);
  });

  it('should return 396.5 when stats have specific values', () => {
    const pokemonStats: PokemonStats[] = [
      { base_stat: 80, stat: { name: 'HP' } },
      { base_stat: 130, stat: { name: 'Attack' } },
      { base_stat: 30, stat: { name: 'Defense' } },
      { base_stat: 25, stat: { name: 'Special Attack' } },
      { base_stat: 15, stat: { name: 'Special Defense' } },
      { base_stat: 15, stat: { name: 'Speed' } },
    ];

    expect(calculateBasePrice(pokemonStats)).toBe(396.5);
  });

  it('should return 0 when all stats are 0', () => {
    const pokemonStats: PokemonStats[] = [
      { base_stat: 0, stat: { name: 'HP' } },
      { base_stat: 0, stat: { name: 'Attack' } },
      { base_stat: 0, stat: { name: 'Defense' } },
      { base_stat: 0, stat: { name: 'Special Attack' } },
      { base_stat: 0, stat: { name: 'Special Defense' } },
      { base_stat: 0, stat: { name: 'Speed' } },
    ];

    expect(calculateBasePrice(pokemonStats)).toBe(0);
  });
});

describe('applyTypeMultiplier', () => {
  it('should multiply basePricing for 1.8 when types is dragon only', () => {
    const basePricing = 10;
    const types = ['dragon'];

    expect(applyTypeMultiplier(basePricing, types)).toBe(18);
  });

  it('should multiply basePricing for 1.6 when types is ghost only', () => {
    const basePricing = 10;
    const types = ['ghost'];

    expect(applyTypeMultiplier(basePricing, types)).toBe(16);
  });

  it('should multiply basePricing for 1.5 when types is psychic only', () => {
    const basePricing = 10;
    const types = ['psychic'];

    expect(applyTypeMultiplier(basePricing, types)).toBe(15);
  });

  it('should multiply basePricing for 1 when types is normal only', () => {
    const basePricing = 10;
    const types = ['normal'];

    expect(applyTypeMultiplier(basePricing, types)).toBe(10);
  });

  it('should multiply basePricing for 1.1 when types is not defined in default multipliers', () => {
    const basePricing = 10;
    const types = ['fire'];

    expect(applyTypeMultiplier(basePricing, types)).toBe(11);
  });
});

describe('applyTypeDiscount', () => {
  it('fire, should deduct 10%', () => {
    const price = 100;
    const types = ['fire'];

    expect(applyTypeDiscount(price, types)).toBe(90);
  });

  it('water, should deduct 15%', () => {
    const price = 50;
    const types = ['water'];

    expect(applyTypeDiscount(price, types)).toBe(42.5);
  });

  it('grass, should deduct 12%', () => {
    const price = 120;
    const types = ['grass'];

    expect(applyTypeDiscount(price, types)).toBe(105.6);
  });

  it('ghost, should deduct 0%', () => {
    const price = 45;
    const types = ['ghost'];

    expect(applyTypeDiscount(price, types)).toBe(45);
  });
});

describe('calculateFinalPrice', () => {
  it('should return 9.02 when all base stats are 1', () => {
    const pokemonTypes: PokemonTypes[] = [
      {
        type: {
          name: 'Fire',
        },
      },
    ];
    const pokemonStats: PokemonStats[] = [
      { base_stat: 1, stat: { name: 'HP' } },
      { base_stat: 1, stat: { name: 'Attack' } },
      { base_stat: 1, stat: { name: 'Defense' } },
      { base_stat: 1, stat: { name: 'Special Attack' } },
      { base_stat: 1, stat: { name: 'Special Defense' } },
      { base_stat: 1, stat: { name: 'Speed' } },
    ];

    expect(calculateFinalPrice(pokemonStats, pokemonTypes)).toBe(9.02);
  });

  it('should return 436.15 when all base stats are specific values', () => {
    const pokemonTypes: PokemonTypes[] = [
      {
        type: {
          name: 'Poison',
        },
      },
    ];
    const pokemonStats: PokemonStats[] = [
      { base_stat: 80, stat: { name: 'HP' } },
      { base_stat: 130, stat: { name: 'Attack' } },
      { base_stat: 30, stat: { name: 'Defense' } },
      { base_stat: 25, stat: { name: 'Special Attack' } },
      { base_stat: 15, stat: { name: 'Special Defense' } },
      { base_stat: 15, stat: { name: 'Speed' } },
    ];

    expect(calculateFinalPrice(pokemonStats, pokemonTypes)).toBe(436.15);
  });

  it('should return 0 when all base stats are 0', () => {
    const pokemonTypes: PokemonTypes[] = [
      {
        type: {
          name: 'Poison',
        },
      },
    ];
    const pokemonStats: PokemonStats[] = [
      { base_stat: 0, stat: { name: 'HP' } },
      { base_stat: 0, stat: { name: 'Attack' } },
      { base_stat: 0, stat: { name: 'Defense' } },
      { base_stat: 0, stat: { name: 'Special Attack' } },
      { base_stat: 0, stat: { name: 'Special Defense' } },
      { base_stat: 0, stat: { name: 'Speed' } },
    ];

    expect(calculateFinalPrice(pokemonStats, pokemonTypes)).toBe(0);
  });
});
