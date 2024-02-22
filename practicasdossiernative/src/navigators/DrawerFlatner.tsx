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


type Props = {}

const Drawer = createDrawerNavigator();

const DrawerFlatner = () => {
  const hide = true;
  return (
    <Drawer.Navigator initialRouteName="Pisos" drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name='Mi Perfil' component={PerfilPrivado} />
      <Drawer.Screen name="Pisos" component={TabPisos} options={{ headerShown: false }}/>
      <Drawer.Screen name='WatchList' component={WatchList} /> 
      <Drawer.Screen name='Mensajes' component={Mensajes} />
      <Drawer.Screen name='Historial' component={Historial} />
      <Drawer.Screen name='F.A.Q' component={FAQ} />
      {
        //<Drawer.Screen name='Piso' component={Piso} options={{ headerShown: false, drawerLabelStyle: {display: "none"} }}/> 
      }
      
    </Drawer.Navigator>
  )
}

export default DrawerFlatner