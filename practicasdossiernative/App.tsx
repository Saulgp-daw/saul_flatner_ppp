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



function App(): JSX.Element {

  // useEffect(() => {
  //   async function iniciarDDBB(){
  //     await dataSource.initialize();
  //   }
  //   iniciarDDBB();
  // }, []);


  return (
    <View>
      <Text>HOLA :)</Text>
    </View> 
  );
}

export default App;
