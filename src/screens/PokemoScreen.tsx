import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { Pokemon } from '../dominio/entities/pokemon';
import { PokemonDetails, PokemonResponse } from '../types';
import { PokeAPIPokemon } from '../infrestructura/interface/pokeapi';


export const PokemoScreen = () => {

  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data: PokemonResponse = await response.json();

        const pokemonDetailsPromises = data.results.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url);
          const detailsData: PokemonDetails = await detailsResponse.json();
          return detailsData;
        });

        const detailedPokemonList = await Promise.all(pokemonDetailsPromises);
        setPokemonList(detailedPokemonList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.sprites.front_default }} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#D797DA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row'
  },
  text: {
    fontSize: 18,
    color: 'black',
    textAlignVertical:'center'
  },
});