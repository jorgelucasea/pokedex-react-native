import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TextInput, FlatList, TouchableOpacity, SafeAreaView} from "react-native";
import pokeBall from '../../../assets/icons/Pokeball.png'
import Seta from '../../../assets/icons/Seta.png'


const Home = ({ navigation }) => {


    const [pokemons, setPokemons] = useState([])
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('id')
    const [sortImage, setSortImage] = useState(require('../../../assets/icons/#.png'))
    const [color, setColor] = useState('')


    const numColumns = 3

    useEffect(async () => {
        fetchData();
        await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemons.name}/`)
        .then(response => response.json())
        .then(data => setColor(data.color.name))
    }, []);

    const fetchData = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
        const data = await response.json();
        setPokemons(data.results);
    }
    



    const sortedPokemon = [...pokemons].sort((a, b) => {
        if (sort === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sort === 'id') {
            return a.id - b.id;
        }
        return 0;
    });

    const filteredPokemon = sortedPokemon.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()))

    const handleSort = () => {
        setSort(sort === 'id' ? 'name' : 'id');
        setSortImage(
            sortImage === require('../../../assets/icons/#.png')
            ? require('../../../assets/icons/A Z.png') : require('../../../assets/icons/#.png')
        )
    }

    function renderHeader() {

        return (
            <View
                style={{
                    backgroundColor: '#fff',
                    padding: 10,
                    marginVertical: 10,
                    borderRadius: 20
                }}
            >
                <TextInput
                    autoCapitalize="none"
                    value={query}
                    onChangeText={queryText => setQuery(queryText)}
                    placeholder="Search"
                    style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
                />
            </View>
        );
    }


    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <Image source={pokeBall} style={{ width: 40, height: 40 }} />
                <Text style={styles.topTxt}>Pokédex</Text>
                <TouchableOpacity onPress={handleSort}>
                    <Image style={styles.sortImage} source={sortImage}/>
                    <Image style={styles.sortImage} source={Seta}/>
                </TouchableOpacity>
            </View>
            <FlatList
                ListHeaderComponent={renderHeader}
                numColumns={numColumns}
                data={filteredPokemon}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Details', { name: item.name })}>

                            <View >
                                <View style={[styles.listItem]} >
                                    <Text style={styles.textID}>#{item.url.split('/')[6].toString().padStart(3, 0)}</Text>
                                    <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png` }} style={{ width: 72, height: 72, left: 20, bottom: 10 }} />
                                </View>
                                <View style={[styles.listItemBottom, {backgroundColor: color}]}>
                                    <Text style={styles.text}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item.name}>

            </FlatList>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center'
    },
    top: {
        flexDirection: 'row',
        alignItems: "center",
        alignSelf: "flex-start",
        marginHorizontal: 30,
    },
    topTxt: {
        fontSize: 30,
        marginLeft: 12,
        fontWeight: 'bold'
    },
    sortImage: {
        width: 10, 
        height: 20,
        left: 140,
        top: -5,
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
        color: '#fff',
        fontWeight: '700',
        alignSelf: "center",
        marginTop: 5
    },
    textID: {
        marginTop: 5,
        alignSelf: 'flex-end',
        marginRight: 5
    },
    listItem: {
        width: 104,
        height: 88,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12

    },
    listItemBottom: {
        backgroundColor: '#000',
        width: 104,
        alignSelf: "center",
        height: 24,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12


    }
})

export default Home;