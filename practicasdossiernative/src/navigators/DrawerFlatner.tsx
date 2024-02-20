import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import PerfilPrivado from '../screens/PerfilPrivado';
import CustomDrawer from '../components/CustomDrawer';
import WatchList from '../screens/WatchList';
import Mensajes from '../screens/Mensajes';
import FAQ from '../screens/FAQ';
import Historial from '../screens/Historial';
import Busqueda from '../screens/Busqueda';


type Props = {}

const Drawer = createDrawerNavigator();

const DrawerFlatner = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props}/>}>
       <Drawer.Screen name="Busqueda" component={Busqueda} />
        <Drawer.Screen name='WatchList' component={WatchList}/>
        <Drawer.Screen name='Mensajes' component={Mensajes}/>
        <Drawer.Screen name='Perfil' component={PerfilPrivado}/>
        <Drawer.Screen name='Historial' component={Historial}/>
        <Drawer.Screen name='F.A.Q' component={FAQ}/>
    </Drawer.Navigator>
  )
}

export default DrawerFlatner