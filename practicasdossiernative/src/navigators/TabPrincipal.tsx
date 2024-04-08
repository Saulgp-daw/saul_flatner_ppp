import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Busqueda from '../screens/Busqueda';
import WatchList from '../screens/WatchList';
import Mensajes from '../screens/Mensajes';
import PerfilPrivado from '../screens/PerfilPrivado';
import TabPisos from './TabPisos';

const Tab = createBottomTabNavigator();

type Props = {
    navigation: any;
  }


const TabPrincipal = ({ navigation }: Props) => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} > 
          <Tab.Screen
          
            name="Explorar"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home-outline" size={30} />
              ),
            }}
          >
            {() => <TabPisos navigation={navigation} />}
          </Tab.Screen>
          <Tab.Screen
            name="Favoritos"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="heart-circle-outline" size={30} />
              ),
            }}
          >
            {() => <WatchList navigation={navigation} />}
          </Tab.Screen>

          <Tab.Screen
            name="Mensajes"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="chatbubbles-outline" size={30} />
              ),
            }}
          >
            {() => <Mensajes navigation={navigation} />}
          </Tab.Screen>

          <Tab.Screen
            name="Perfil"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="person-circle-outline" size={30} />
              ),
            }}
          >
            {() => <PerfilPrivado navigation={navigation} />}
          </Tab.Screen>
        </Tab.Navigator>
      );
}

export default TabPrincipal

const styles = StyleSheet.create({})