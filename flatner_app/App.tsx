/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

//import { dataSource } from './src/data/Database';


function App(): JSX.Element {

  // useEffect(() => {
  //   async function iniciarDDBB(){
  //     await dataSource.initialize();
  //   }
  //   iniciarDDBB();
  // }, []);


  return (
    <View>
    <Text>Hola</Text>
    </View> 
  );
}

export default App;
