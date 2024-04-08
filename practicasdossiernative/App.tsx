/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import StackNavigation from './src/navigators/StackNavigation';



function App(): JSX.Element {

  return (
    <>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
      <Toast />
    </>

  );
}

export default App;
