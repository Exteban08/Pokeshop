import axios from "axios";
import { Pokemon, PokemonDetails } from "../types/pokemon";

const API_URL = "https://pokeapi.co/api/v2";

export const getPokemonList = async (
  limit: number,
  offset: number
): Promise<Pokemon[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return [];
  }
};

export const searchPokemon = async (
  name: string
): Promise<PokemonDetails | null> => {
  try {
    const response = await axios.get(
      `${API_URL}/pokemon/${name.toLowerCase()}`
    );
    return response.data as PokemonDetails;
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
