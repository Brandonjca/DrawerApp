// src/types.ts
export interface Pokemon {
    name: string;
    url: string;
  }
  
  export interface PokemonDetails {
    name: string;
    sprites: {
      front_default: string;
    };
  }
  
  export interface PokemonResponse {
    results: Pokemon[];
  }
  