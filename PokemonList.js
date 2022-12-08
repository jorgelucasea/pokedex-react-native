return (
  <BarChart
      data={{
          labels: stats.map(stat => stat.value),
          datasets: [
              {
                  data: stats.map(stat => stat.value)
              }
          ]
      }}
      width={350}
      height={200}
      flatColor={false}
      fromZero={true}
      withInnerLines={false}
      showValuesOnTopOfBars={false}
      showBarTops= {false}
      withHorizontalLabels={false}
      verticalLabelRotation={90}
      withCustomBarColorFromData={false}
      xLabelsOffset={-10}
      chartConfig={{
          backgroundColor : '#fff',backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: () => color,
          labelColor: () => color,
          barRadius: 20,
          style: {
              borderRadius: 16,
          }
      }}
      style={{
          position: 'absolute',
          marginVertical: 8,
          borderRadius: 16,
          transform: [{rotate: '-90deg'}],
          right: 30,
          bottom: 0,
      }}
  />

)
