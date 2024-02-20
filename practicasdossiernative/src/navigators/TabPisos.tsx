import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Icon from 'react-native-vector-icons/Ionicons';
import Busqueda from '../screens/Busqueda';
import AgregarPiso from '../screens/AgregarPiso';

type Props = {}
const Tab = createBottomTabNavigator();

const TabPisos = (props: Props) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} >
        <Tab.Screen name='Buscar' component={Busqueda} options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="search-outline" size={30} />
                   
                  
                ),
            }}/>
            <Tab.Screen name='Agregar' component={AgregarPiso} options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="add-circle-outline" size={30} />
                ),
            }}/>
            
    </Tab.Navigator>
  )
}

export default TabPisos