import React, { useState } from 'react';
import { Alert, Dimensions, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

const ModalMap = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [markerCoordinate, setMarkerCoordinate] = useState(null);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const onMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerCoordinate({ latitude, longitude });
    };

    return (
        <View style={styles.container}>
            <View style={styles.smallMapContainer} onTouchEnd={toggleModal}>
                <MapView
                    style={styles.smallMap}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    {markerCoordinate && (
                        <Marker coordinate={markerCoordinate} />
                    )}
                </MapView>
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    toggleModal();
                }}
            >
                <View style={styles.modalView}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onPress={onMapPress}
                    >
                        {markerCoordinate && (
                            <Marker coordinate={markerCoordinate} />
                        )}
                    </MapView>
                    <TouchableHighlight style={styles.closeButton} onPress={toggleModal}>
                        <Icon name="close" size={23}/>
                    </TouchableHighlight>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        padding: 15,
    },
    map: {
        width: Dimensions.get('window').width - 40, // Reduzco 40 para el margen del modal
        height: Dimensions.get('window').height - 120,
    },
    closeButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#cc0099',
        padding: 10,
    },
    smallMapContainer: {
        width: 200,
        height: 200,
        overflow: 'hidden',
    },
    smallMap: {
        width: '100%',
        height: '100%',
    },
});

export default ModalMap;
