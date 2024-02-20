import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'

type Props = {}

const Select = () => {
    const [selectedValue, setSelectedValue] = useState('opcion1');
    const sexo = ["Hombre", "Mujer", "Alien"];
    return (
        <View>
            <SelectDropdown
                data={sexo}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}/>
        </View>
    );
};

export default Select

const styles = StyleSheet.create({})