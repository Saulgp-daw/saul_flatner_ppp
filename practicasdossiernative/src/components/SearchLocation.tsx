import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

type Props = {}

const SearchLocation = (props: Props) => {

    function test() {
        console.log("Hola");

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
            onPress={(data, details = null) => {
                console.log(details.geometry.location);
                console.log("On press not working");
                
            }}
            fetchDetails={true}
            disableScroll={true} // <--- 2. this works
        />
    )
}

export default SearchLocation

const styles = StyleSheet.create({})