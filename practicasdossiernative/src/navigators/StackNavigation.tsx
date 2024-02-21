import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import PerfilPrivado from '../screens/PerfilPrivado';
import PerfilPublico from '../screens/PerfilPublico';
import Piso from '../screens/Piso';
import Registro from '../screens/Registro';
import WatchList from '../screens/WatchList';
import TokenContextProvider from '../contexts/TokenContextProvider';
import Busqueda from '../screens/Busqueda';
import DrawerFlatner from './DrawerFlatner';

type Props = {}
const Stack = createNativeStackNavigator();

const StackNavigation = (props: Props) => {
    return (
        <TokenContextProvider>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='Registro' component={Registro} options={{ headerShown: false }} />
                <Stack.Screen name='DrawerFlatner' component={DrawerFlatner} options={{ headerShown: false }}/>
                <Stack.Screen name='Busqueda' component={Busqueda} />
                <Stack.Screen name='Mi Perfil' component={PerfilPrivado} />
                <Stack.Screen name='Piso' component={Piso} />
                <Stack.Screen name='Perfil' component={PerfilPublico} />
            </Stack.Navigator>
        </TokenContextProvider>
    )
}

export default StackNavigation

const styles = StyleSheet.create({

    darkMode: {
        backgroundColor: 'black'
    }
})