import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Icon from 'react-native-vector-icons/Ionicons';
import Busqueda from '../screens/Busqueda';
import AgregarPiso from '../screens/AgregarPiso';

type Props = {
  navigation: any;
}
const Tab = createBottomTabNavigator();
const TabPisos = ({ navigation }: Props) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}> 
      <Tab.Screen
      
        name="Buscar"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search-outline" size={30} />
          ),
        }}
      >
        {() => <Busqueda navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen
        name="Agregar"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-circle-outline" size={30} />
          ),
        }}
      >
        {() => <AgregarPiso navigation={navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabPisos