export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
  height: number;
  weight: number;
  base_experience: number;
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonSpecies {
  name: string;
  color: {
    name: string;
  };
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
  generation: {
    name: string;
  };
}

export type SortField = 'name' | 'id' | 'height' | 'weight' | 'base_experience';
export type SortOrder = 'asc' | 'desc';