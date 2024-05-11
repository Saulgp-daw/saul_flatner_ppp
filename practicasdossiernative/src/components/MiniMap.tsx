import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Piso } from '../types/Piso';



const MiniMap = ({ piso }) => {
    const [mapRegion, setMapRegion] = useState(null);
    const [markerCoordinate, setMarkerCoordinate] = useState(null);

    useEffect(() => {
        console.log("Piso en minimap: ");
        const [latitudeStr, longitudeStr] = piso.mapsLink.split(',');
    
        const latitude = parseFloat(latitudeStr);
        const longitude = parseFloat(longitudeStr);
        setMapRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004
        });
        setMarkerCoordinate({latitude, longitude});
        
    }, [])
    
    
    return (
        <View style={styles.smallMapContainer}>
            <MapView
                style={styles.map}
                region={mapRegion}
                scrollEnabled={true}
                zoomEnabled={true}
                rotateEnabled={false}
                pitchEnabled={true}
            >
                {markerCoordinate && <Marker coordinate={markerCoordinate} />}
            </MapView>
        </View>
    );
}

export default MiniMap;

const styles = StyleSheet.create({
    smallMapContainer: {
        width: Dimensions.get('window').width - 40,
        height: 200,
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
