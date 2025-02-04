import axios from "axios";
import { Pokemon, PokemonDetails, PokemonTypeList } from "../types/pokemon";
import { calculateFinalPrice } from "../utils/pricing";

const ITEMS_PER_PAGE = 20;
const API_URL = "https://pokeapi.co/api/v2";

export const getPokemonList = async (
  page: number
): Promise<Pokemon[]> => {
  try {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const response = await axios.get(
      `${API_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return [];
  }
};

export const getPokemonListByType = async (type: string): Promise<PokemonTypeList[]> => {
  try {
    const response = await axios.get(`${API_URL}/type/${type}`);
    return response.data.pokemon
  } catch (error) {
    console.error("Error fetching Pokémon list by type:", error);
    return [];
  }
}

export const getPokemonDetails = async (
  name: string
): Promise<PokemonDetails | null> => {
  try {
    const response = await axios.get(
      `${API_URL}/pokemon/${name.toLowerCase()}`
    );
    const pokemonDetails = response.data as PokemonDetails;
    const price = parseFloat(
      calculateFinalPrice(pokemonDetails.stats, pokemonDetails.types).toFixed(2)
    );
    return { ...pokemonDetails, price }
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
};

export const getPokemonTypes = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_URL}/type`);
    return response.data.results.map((type: { name: string }) => type.name);
  } catch (error) {
    console.error("Error fetching Pokémon types:", error);
    return [];
  }
};
