import { View, StyleSheet, Button, SafeAreaView } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';



const CustomDrawer = (props) => {
    const { navigation } = props;
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
            {/* Contenido principal del drawer */}
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            {/* Sección fija en la parte inferior del drawer */}
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