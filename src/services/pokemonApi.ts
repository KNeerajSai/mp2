import axios from 'axios';
import { Pokemon, PokemonListResponse, PokemonSpecies } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const pokemonApi = {
  // Get list of Pokemon with pagination
  async getPokemonList(limit: number = 150, offset: number = 0): Promise<PokemonListResponse> {
    try {
      const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw error;
    }
  },

  // Get detailed Pokemon data by name or ID
  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    try {
      const response = await api.get(`/pokemon/${nameOrId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon ${nameOrId}:`, error);
      throw error;
    }
  },

  // Get Pokemon species data for additional info
  async getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
    try {
      const response = await api.get(`/pokemon-species/${nameOrId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon species ${nameOrId}:`, error);
      throw error;
    }
  },

  // Get Pokemon by type
  async getPokemonByType(type: string): Promise<any> {
    try {
      const response = await api.get(`/type/${type}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon by type ${type}:`, error);
      throw error;
    }
  },

  // Get all Pokemon types
  async getAllTypes(): Promise<any> {
    try {
      const response = await api.get('/type');
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon types:', error);
      throw error;
    }
  },

  // Extract Pokemon ID from URL
  extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  },

  // Get Pokemon image URL
  getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  },
};

export default pokemonApi;