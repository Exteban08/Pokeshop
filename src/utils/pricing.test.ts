import { test, expect } from "vitest";
import {
  applyTypeDiscount,
  applyTypeMultiplier,
  calculateBasePrice,
  calculateFinalPrice,
} from "./pricing";
import { PokemonStats, PokemonTypes } from "../types/pokemon";

// calculateBasePrice tests
test("calculateBasePrice should return 8.2 when all base stats are 1", () => {
  const pokemonStats: PokemonStats[] = [
    { base_stat: 1, stat: { name: "HP" } },
    { base_stat: 1, stat: { name: "Attack" } },
    { base_stat: 1, stat: { name: "Defense" } },
    { base_stat: 1, stat: { name: "Special Attack" } },
    { base_stat: 1, stat: { name: "Special Defense" } },
    { base_stat: 1, stat: { name: "Speed" } },
  ];

  expect(calculateBasePrice(pokemonStats)).toBe(8.2);
});

test("calculateBasePrice should return 396.5 when stats have specific values", () => {
  const pokemonStats: PokemonStats[] = [
    { base_stat: 80, stat: { name: "HP" } },
    { base_stat: 130, stat: { name: "Attack" } },
    { base_stat: 30, stat: { name: "Defense" } },
    { base_stat: 25, stat: { name: "Special Attack" } },
    { base_stat: 15, stat: { name: "Special Defense" } },
    { base_stat: 15, stat: { name: "Speed" } },
  ];

  expect(calculateBasePrice(pokemonStats)).toBe(396.5);
});

test("calculateBasePrice should return 0 when all stats are 0", () => {
  const pokemonStats: PokemonStats[] = [
    { base_stat: 0, stat: { name: "HP" } },
    { base_stat: 0, stat: { name: "Attack" } },
    { base_stat: 0, stat: { name: "Defense" } },
    { base_stat: 0, stat: { name: "Special Attack" } },
    { base_stat: 0, stat: { name: "Special Defense" } },
    { base_stat: 0, stat: { name: "Speed" } },
  ];

  expect(calculateBasePrice(pokemonStats)).toBe(0);
});

// applyTypeMultiplier tests
test("applyTypeMultiplier should multiply basePricing for 1.8 when types is dragon only", () => {
  const basePricing = 10;
  const types = ["dragon"];

  expect(applyTypeMultiplier(basePricing, types)).toBe(18);
});

test("applyTypeMultiplier should multiply basePricing for 1.6 when types is ghost only", () => {
  const basePricing = 10;
  const types = ["ghost"];

  expect(applyTypeMultiplier(basePricing, types)).toBe(16);
});

test("applyTypeMultiplier should multiply basePricing for 1.5 when types is psychic only", () => {
  const basePricing = 10;
  const types = ["psychic"];

  expect(applyTypeMultiplier(basePricing, types)).toBe(15);
});

test("applyTypeMultiplier should multiply basePricing for 1 when types is normal only", () => {
  const basePricing = 10;
  const types = ["normal"];

  expect(applyTypeMultiplier(basePricing, types)).toBe(10);
});

test("applyTypeMultiplier should multiply basePricing for 1.1 when types is not defined in default multipliers", () => {
  const basePricing = 10;
  const types = ["fire"];

  expect(applyTypeMultiplier(basePricing, types)).toBe(11);
});

// applyTypeDiscount tests
test("applyTypeDiscount", () => {
  const price = 100;
  const types = ["fire"];

  expect(applyTypeDiscount(price, types)).toBe(90);
});

// calculateFinalPrice tests
test("calculateFinalPrice", () => {
  const pokemonTypes: PokemonTypes[] = [
    {
      type: {
        name: "Fire",
      },
    },
  ];
  const pokemonStats: PokemonStats[] = [
    { base_stat: 1, stat: { name: "HP" } },
    { base_stat: 1, stat: { name: "Attack" } },
    { base_stat: 1, stat: { name: "Defense" } },
    { base_stat: 1, stat: { name: "Special Attack" } },
    { base_stat: 1, stat: { name: "Special Defense" } },
    { base_stat: 1, stat: { name: "Speed" } },
  ];

  expect(calculateFinalPrice(pokemonStats, pokemonTypes)).toBe(9.02);
});
