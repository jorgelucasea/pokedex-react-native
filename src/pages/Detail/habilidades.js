import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Habilidades = ({ abilities }) => {

    const habil = abilities.abilities.map(a => a.ability.name)
    
    if (habil.length > 1) {
        return(
            <View style={styles.view}>
                <Text style={styles.text}>{habil[0].charAt(0).toUpperCase() + habil[0].slice(1)}</Text>
                <Text>{habil[1].charAt(0).toUpperCase() + habil[1].slice(1)}</Text>
                <Text style={styles.marginTXT}>Habilidades</Text>
            </View>
        )
    } else {
        return(
            <View style={styles.view}>
                <Text>{habil[0].charAt(0).toUpperCase() + habil[0].slice(1)}</Text>
                <Text style={styles.marginTXT}>Habilidades</Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        left: 120,
        top: 105,
        
    },
    marginTXT: {
        marginTop: 5
    }

})

export default Habilidades;