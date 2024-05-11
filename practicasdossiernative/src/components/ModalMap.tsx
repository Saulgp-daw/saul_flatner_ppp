import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { PERMISSIONS, PermissionStatus, check, request } from "react-native-permissions";
import { } from "react-native-geolocation-service"
import Geolocation from '@react-native-community/geolocation';
import useAgregarPiso from '../hooks/useAgregarPiso';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import SearchLocation from './SearchLocation';
import axios from 'axios';
import { ip } from '../../global';
import { useAppContext } from '../contexts/TokenContextProvider';
import useGetCountry from '../hooks/useGetCountry';

const ModalMap = ({ informacionPiso, updateCampo }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [markerCoordinate, setMarkerCoordinate] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mapRegion, setMapRegion] = useState(null);
    const { token, settoken } = useAppContext();
    const {getCountry} = useGetCountry();


    useEffect(() => {
        async function verPosicion() {
            let ps: PermissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

            if (ps != 'granted') {
                ps = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            }

            if (ps == 'granted') {
                Geolocation.getCurrentPosition(async info => {
                    console.log(info);
                    const { latitude, longitude } = info.coords;
                    await updateCampo('mapsLink', `${latitude},${longitude}`);
                    setCurrentLocation({ latitude, longitude });
                    getCountry(latitude, longitude).then(async data => {
                        await updateCampo("ubicacion", data.formattedAddress);
                    });
                    if (!markerCoordinate) {
                        setMarkerCoordinate({ latitude, longitude });
                    }
                    setLoading(false);
                });

            } else {
                console.log("No hay permisos");

            }
        }
        verPosicion();
    }, []);

    useEffect(() => {
        if (currentLocation) {
            setMapRegion({
                latitude: currentLocation.latitude - 0.25,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.8,
                longitudeDelta: 0.8
            });
        }
    }, [currentLocation]);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    if (loading) {
        return <View style={styles.container}><ActivityIndicator size="large" /></View>;
    }

    const onMapPress = async (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        console.log("Ubicación pulsada: " + latitude + ", " + longitude);
        setMarkerCoordinate({ latitude, longitude });
        setCurrentLocation({ latitude, longitude });
        setMapRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
        getCountry(latitude, longitude).then(async data => {
            await updateCampo("ubicacion", data.formattedAddress);
        });
        await updateCampo('mapsLink', `${latitude},${longitude}`);
        console.log(informacionPiso);
        
    };

    return (
        <View style={styles.container}>
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
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    toggleModal();
                }}
            >
                <ScrollView style={styles.modalView} keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
                    <SearchLocation
                        onLocationSelect={(location) => {
                            setMarkerCoordinate(location);
                            setCurrentLocation(location);
                        }}
                        updateCampo={updateCampo}
                    />
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: currentLocation ? currentLocation.latitude : 0,
                            longitude: currentLocation ? currentLocation.longitude : 0,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onPress={onMapPress}
                    >
                        {markerCoordinate && <Marker coordinate={markerCoordinate} />}
                    </MapView>
                    <TouchableHighlight style={styles.closeButton} onPress={toggleModal}>
                        <Icon name="checkmark-outline" size={23} />
                    </TouchableHighlight>
                </ScrollView>
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
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    modalView: {
        flex: 1,
        backgroundColor: "green",
        padding: 15,
    },
    map: {
        width: Dimensions.get('window').width - 40, // Reduzco 40 para el margen del modal
        height: Dimensions.get('window').height - 160,
    },
    closeButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#cc0099',
        padding: 10,
    },
    smallMapContainer: {
        width: Dimensions.get('window').width - 40,
        height: 200,
        overflow: 'hidden',

    },
    smallMap: {
        width: '100%',
        height: '100%',
    },
});

export default ModalMap;
