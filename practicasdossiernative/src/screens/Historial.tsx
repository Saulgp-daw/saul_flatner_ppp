import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'

type Props = {
  navigation: any;
}

const Historial = ({navigation}: Props) => {
  return (
    <View>
      <Navbar navigation={navigation} />
      <Text>historial</Text>
    </View>
  )
}

export default Historial

const styles = StyleSheet.create({})