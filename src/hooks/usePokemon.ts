import { useState, useEffect } from 'react';
import { Pokemon, PokemonListItem, SortField, SortOrder } from '../types/pokemon';
import { pokemonApi } from '../services/pokemonApi';

export const usePokemon = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    loadPokemonData();
    loadTypes();
  }, []);

  const loadPokemonData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get the first 150 Pokemon
      const listResponse = await pokemonApi.getPokemonList(150, 0);
      
      // Fetch detailed data for each Pokemon
      const detailedPokemon = await Promise.all(
        listResponse.results.map(async (pokemon: PokemonListItem) => {
          const id = pokemonApi.extractIdFromUrl(pokemon.url);
          return await pokemonApi.getPokemon(id);
        })
      );

      setPokemonList(detailedPokemon);
    } catch (err) {
      setError('Failed to load Pokemon data');
      console.error('Error loading Pokemon:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadTypes = async () => {
    try {
      const typesResponse = await pokemonApi.getAllTypes();
      const typeNames = typesResponse.results.map((type: any) => type.name);
      setTypes(typeNames);
    } catch (err) {
      console.error('Error loading types:', err);
    }
  };

  const searchPokemon = (searchTerm: string): Pokemon[] => {
    if (!searchTerm.trim()) return pokemonList;
    
    return pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString().includes(searchTerm) ||
      pokemon.types.some(type => 
        type.type.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const sortPokemon = (pokemon: Pokemon[], field: SortField, order: SortOrder): Pokemon[] => {
    return [...pokemon].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (field) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        case 'height':
          aValue = a.height;
          bValue = b.height;
          break;
        case 'weight':
          aValue = a.weight;
          bValue = b.weight;
          break;
        case 'base_experience':
          aValue = a.base_experience;
          bValue = b.base_experience;
          break;
        default:
          return 0;
      }

      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const filterByType = (pokemon: Pokemon[], selectedTypes: string[]): Pokemon[] => {
    if (selectedTypes.length === 0) return pokemon;
    
    return pokemon.filter(p =>
      p.types.some(type => selectedTypes.includes(type.type.name))
    );
  };

  return {
    pokemonList,
    loading,
    error,
    types,
    searchPokemon,
    sortPokemon,
    filterByType,
    refetch: loadPokemonData,
  };
};