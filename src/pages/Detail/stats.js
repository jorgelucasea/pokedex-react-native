import React, { useEffect, useState } from "react";
import { View, StyleSheet} from "react-native";
import HorizontalBarGraph from "@chartiful/react-native-horizontal-bar-graph";





const Stats = ({ pokemon }) => {

    const [color, setColor] = useState('')

    const stats = pokemon.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
    }))

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
            .then(response => response.json())
            .then(data => setColor(data.color.name))
    })

    const config = {
        hasYAxisBackgroundLines: false,
        startsAtZero: true,
        xAxisLabelStyle: {
            rotation: 0,
            fontSize: 12,
            width: 70,
            yOffset: 4,
            xOffset: -20,
            fontWeight: 700,
            color: color
        },
        hasYAxisLabels: false,
    };

    const status = stats.map(stat => stat.value)
    return (
        <View>
            <HorizontalBarGraph
                data={stats.map(stat => stat.value)}
                labels={[`HP: ${status[0]}`, `ATK: ${status[1]}`, `DEF: ${status[2]}`, `SATK: ${status[3]}`, `SDEF: ${status[4]}`, `SPD: ${status[5]}`]}
                width={290}
                height={150}
                barRadius={15}
                barColor={color}
                baseConfig={config}
                style={styles.chart}
            />


        </View>

    )
}

export default Stats;

const styles = StyleSheet.create({
    chart: {
        position: "absolute",
        padding: 10,
        paddingTop: 20,
        borderRadius: 20,
        width: 300,
        backgroundColor: 'white',
        top: 200,
        left: -40,
    }
});