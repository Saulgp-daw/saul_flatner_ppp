import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';

type Props = {}

const Maps = (props: Props) => {
    return (
        <View style={styles.container}>
          <MapView style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      );
}

export default Maps

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
})