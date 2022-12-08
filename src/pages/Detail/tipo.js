import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import color from '../../../assets/colors/index'



const Tipo = ({ pokemon }) => {


    const type = pokemon.types.map(type => type.type.name)

    const SetColor1 = () => {
        if (color.hasOwnProperty(type[0])) {
            return (
                <View style={[styles.view,{backgroundColor: color[type[0]]}]}>
                    <Text style={styles.text}>{type[0].charAt(0).toUpperCase() + type[0].slice(1)}</Text>
                </View>
            )
        }
    }

    const SetColor2 = () => {
        if (color.hasOwnProperty(type[1])) {
            return (
                <View style={[styles.view,{backgroundColor: color[type[1]]}]}>
                    <Text style={styles.text}>{type[1].charAt(0).toUpperCase() + type[1].slice(1)}</Text>
                </View>
                )
        }
    }

    if (type.length > 1) {
        
        return (
            <View style={{flexDirection: 'row'}}>
                <SetColor1/>
                <SetColor2/>
            </View>
        ) 
    } else {
        return (
            <View style={{right: 110,alignItems: "center"}}>
                <SetColor1/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        padding: 10,
        borderRadius: 50,
        marginRight: 10,
        left: 120,
        top: 100
    },
    text: {
        color: '#fff',
        fontSize: 12,
    },
})




export default Tipo;