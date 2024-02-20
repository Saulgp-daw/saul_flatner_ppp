/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import DrawerFlatner from './src/navigators/DrawerFlatner';
import StackNavigation from './src/navigators/StackNavigation';



function App(): JSX.Element {

  // useEffect(() => {
  //   async function iniciarDDBB(){
  //     await dataSource.initialize();
  //   }
  //   iniciarDDBB();
  // }, []);


  return (
    <NavigationContainer> 
      <StackNavigation/>
    </NavigationContainer>
  );
}

export default App;
