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
import TabPisos from './TabPisos';
import Piso from '../screens/Piso';
import TabPrincipal from './TabPrincipal';


type Props = {}

const Drawer = createDrawerNavigator();

const DrawerFlatner = () => {
  const hide = true;
  return (
    <Drawer.Navigator initialRouteName="Pisos" drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name='Mi Perfil' component={PerfilPrivado} options={{ headerShown: false }}/>
      <Drawer.Screen name="Pisos" component={TabPrincipal} options={{ headerShown: false }}/>
      <Drawer.Screen name='WatchList' component={WatchList} options={{ headerShown: false }}/> 
      <Drawer.Screen name='Mensajes' component={Mensajes} options={{ headerShown: false }}/>
      <Drawer.Screen name='Historial' component={Historial} options={{ headerShown: false }}/>
      <Drawer.Screen name='F.A.Q' component={FAQ} options={{ headerShown: false }}/>
      {
        //<Drawer.Screen name='Piso' component={Piso} options={{ headerShown: false, drawerLabelStyle: {display: "none"} }}/> 
      }
      
    </Drawer.Navigator>
  )
}

export default DrawerFlatner