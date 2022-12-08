import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity} from 'react-native';
import Back from '../../../assets/icons/Vector-back.png'
import Stats from './stats'
import imgPeso from '../../../assets/icons/Vector.png'
import imgAlt from '../../../assets/icons/Vector-1.png'
import pLinha from '../../../assets/icons/linha-p.png'
import Habilidades from './habilidades';
import Tipo from './tipo'

const Detail = ({route, navigation}) => {
    const [details, setDetails] = useState([]);
    const [color, setColor] = useState('')

    useEffect(() => {
        fetchColor();
        fetchPokemonDetails();
    }, []);

    const fetchPokemonDetails = () => {
        const { name } = route.params;
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => res.json())
            .then(details => setDetails(details));
    };

    const fetchColor = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${details.id}/`)
        .then(response => response.json())
        .then(data => setColor(data.color.name))
    }

    return details.name ? (
            <>
            <SafeAreaView style={{flex: 0, backgroundColor: color}}/>
            <SafeAreaView
                style={[styles.safeArea, { borderColor: color }]}>
                <View style={{
                    backgroundColor: color,
                    paddingTop: 15,
                    height: 224
                }}>
                    <View style={styles.backNameView}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={Back} style={{ width: 17, height: 17 }} />
                        </TouchableOpacity>
                        <Text style={styles.backNameText}>{details.name.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.id}>#{details.id.toString().padStart(3, 0)}</Text>
                </View>
                <View>
                    <Image
                            style={styles.image}
                            source={{
                                uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${details.name}.png`,
                            }} />
                    <Text style={[styles.sobreTxt, {color: color}]}>Sobre</Text>
                    <Tipo pokemon={details}/>
                </View>

                <View style={{bottom: 60}}>
                    <View>
                        <View style={styles.altBox}>
                            <Image source={imgAlt} style={styles.altImg}/>
                            <Text style={[styles.altText]}>{(details.height / 10).toString().replace('.', ',')} m</Text>
                            <Image source={pLinha} style={{}}/>
                            <Text style={styles.TextoAltura}>Altura</Text>
                        </View>
                        <View style={styles.pesoBox}>
                            <Image source={imgPeso} style={styles.pesoImg}/>
                            <Text style={styles.pesoText}>{(details.weight / 10).toString().replace('.', ',')} kg</Text>
                            <Image source={pLinha} style={{}}/>
                            <Text style={styles.textoPeso}>Peso</Text>
                        </View>
                        <Habilidades abilities={details}/>
                    </View>
                    <Stats pokemon={details} />
                </View>
            </SafeAreaView>
        </>
        
    ) : (
        <View style={styles.indicator}>
            <ActivityIndicator size="large" color="#E63F34" />
        </View>
    );
};



const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 10,
        borderBottomLeftRadius: 45, borderBottomRightRadius: 45,
        borderBottomColor: 'white'
    },
    pesoBox: {
        flexDirection: 'row',
        top: 152,
        left: 120
    },
    pesoImg: {
        marginHorizontal: 30
    },
    pesoText: {
        fontSize: 15,
        left: -20,
        marginRight: 10,
    },
    textoPeso: {
        fontSize: 15,
        right: 75,
        top: 30,
        fontWeight: 'light'

    },
    altBox: {
        zIndex: 1,
        flexDirection: 'row',
        top: 200,
        left: 40,
        
    }, 
    altImg: {
        marginRight: 10,
        marginLeft: 15
    },
    altText: {
        fontSize: 15,
        marginRight: 20,
    },
    TextoAltura: {
        fontSize: 15,
        right: 65,
        top: 30,
        fontWeight: 'light'
    },
    topView: {
        position: 'absolute',
        backgroundColor: 'gray',
        paddingTop: 15,
        height: 10
    },
    backNameView: {
        flexDirection: 'row',
        marginLeft: 20,
    },
    sobreTxt: {
        fontSize: 26,
        fontWeight: 'bold',
        top: 70,
        left: 145
    },
    backNameText: {
        marginHorizontal: 20,
        fontSize: 24,
        top: -5,
        fontWeight: 'bold',
        color: 'white'
    },
    id: {
        position: 'absolute',
        top: 15,
        fontSize: 18,
        right: 20,
        color: 'white'
    },
    image: {
        position: 'absolute',
        alignSelf: 'center',
        top: -190,
        width: 300,
        height: 300,
        
    },
    text: {
        fontSize: 17,
        marginBottom: 15,
        
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default Detail;