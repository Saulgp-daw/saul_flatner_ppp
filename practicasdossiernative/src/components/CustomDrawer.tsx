import { View, StyleSheet, Button, SafeAreaView } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Piso from '../screens/Piso';



const CustomDrawer = (props) => {
    const { navigation } = props;
    const [enablePiso, setEnablePiso] = useState(true);
    const togglePisoScreen = () => {
        setEnablePiso(!enablePiso);
    };
    async function logOut() {
        try {
            await AsyncStorage.removeItem('token');
            console.log('Token eliminado');
            navigation.navigate("Login");

          } catch (e) {
            console.error('Error al eliminar el token', e);
          }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <View style={styles.bottomDrawerSection}>
                <Button title="Log Out" onPress={() => {logOut()}} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        padding: 5
    },
});

export default CustomDrawer