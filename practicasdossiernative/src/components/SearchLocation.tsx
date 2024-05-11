import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import useAgregarPiso from '../hooks/useAgregarPiso';
import useGetCountry from '../hooks/useGetCountry';



type Props = {
    onLocationSelect: (location: { latitude: number, longitude: number }) => void;
    updateCampo: (key: string, value: any) => void;
}

const SearchLocation = ({onLocationSelect, updateCampo }: Props) => {
    const {getCountry} = useGetCountry();

    const handlePress = async (data, details) => {
    if (details && details.geometry) {
        const { location } = details.geometry;
        console.log("Location selected:", location); // Log de la ubicación seleccionada
        onLocationSelect({
            latitude: location.lat,
            longitude: location.lng
        });
        getCountry(location.lat, location.lng).then(async data => {
            await updateCampo("ubicacion", data.formattedAddress);
        });
        await updateCampo('mapsLink', `${location.lat},${location.lng}`);
       
    }
}
    return (

        <GooglePlacesAutocomplete
            minLength={2}
            nearbyPlacesAPI={'GooglePlacesSearch'}
            debounce={400}
            placeholder="Origin Address"
            query={{
                key: 'AIzaSyAB6k62OKXyqu6lz4l03HE4sou7kMMhk98',
                language: 'en',
            }}
            onFail={error => console.log(error)}
            enablePoweredByContainer={false}
            onPress={handlePress}
            fetchDetails={true}
            disableScroll={true} 
        />
    )
}

export default SearchLocation

const styles = StyleSheet.create({})