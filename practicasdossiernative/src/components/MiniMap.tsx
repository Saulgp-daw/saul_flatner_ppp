import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const MiniMap = (props: Props) => {
  return (
    <View style={styles.smallMapContainer} onTouchEnd={toggleModal}>
                <MapView
                    style={styles.map}
                    region={mapRegion}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    pitchEnabled={false}
                >
                    {markerCoordinate && <Marker coordinate={markerCoordinate} />}
                </MapView>
            </View>
  )
}

export default MiniMap

const styles = StyleSheet.create({
    smallMapContainer: {
        width: Dimensions.get('window').width - 40,
        height: 200,
        overflow: 'hidden',

    },
    smallMap: {
        width: '100%',
        height: '100%',
    },
})