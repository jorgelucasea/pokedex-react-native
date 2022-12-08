import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import Picker from 'react-native-picker-select';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [sortingMode, setSortingMode] = useState('alphabetical');
  const [searchQuery, setSearchQuery] = useState('');
  const sortingOptions = ['alphabetical', 'id'];

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => {
        setPokemon(response.data.results);
      });
  }, []);

  const sortedPokemon = [...pokemon].sort((a, b) => {
    if (sortingMode === 'alphabetical') {
      return a.name.localeCompare(b.name);
    } else if (sortingMode === 'id') {
      return a.id - b.id;
    }
    return 0;
  });

  const filteredPokemon = sortedPokemon.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <TextInput
        style={styles.searchfeild}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        placeholder="Search by name..."
      />
      <Picker
        selectedValue={sortingMode}
        onValueChange={(itemValue) => setSortingMode(itemValue)}
      >
        {sortingOptions.map((option) => (
          <Picker.Item label={option} value={option} key={option} />
        ))}
      </Picker>
      <FlatList
        data={filteredPokemon}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>ID: {item.id}</Text>
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    
    
  container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 30,
  },
  card: {
      display: 'flex',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      marginHorizontal: 20,
      marginVertical: 10,
  },
  searchCont: {
      position: 'absolute',
      marginBottom: 70,
      left: '20%',
      zIndex: 1,
      marginTop: 10,
  },
  searchfeild: {
      height: 40,
      borderWidth: 1,
      borderColor: '#000',
      textAlign: 'center',
      width: 250,
      borderRadius: 50,
  },
});

export default App;
