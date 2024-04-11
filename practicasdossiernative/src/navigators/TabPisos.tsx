import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Busqueda from '../screens/Busqueda';
import AgregarPiso from '../screens/AgregarPiso';
import MisPisos from '../screens/MisPisos';

type Props = {
  navigation: any;
}

const Tab = createMaterialTopTabNavigator();

const TabPisos = ({ navigation }: Props) => {
  return (
    <Tab.Navigator
      
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Busqueda') {
            iconName = 'search-outline';
          } else if (route.name === 'AgregarPiso') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'MisPisos') {
            iconName = 'newspaper-outline';
          }

          return <Icon name={iconName} size={23} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Busqueda" component={Busqueda} options={{ title: 'Busqueda' }} />
      <Tab.Screen name="AgregarPiso" component={AgregarPiso} options={{ title: 'Agregar' }} />
      <Tab.Screen name="MisPisos" component={MisPisos} options={{ title: 'Mis Anuncios' }} />
    </Tab.Navigator>
  );
};

export default TabPisos;
