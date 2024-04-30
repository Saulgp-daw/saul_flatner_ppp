import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'

type Props = {
	navigation: any,
}

const Mensajes = ({ navigation }: Props) => {
  return (
    <View>
      <TouchableHighlight onPress={() => navigation.navigate('Maps')}>
        <Text>Maps</Text>
      </TouchableHighlight>
    </View>
  )
}

export default Mensajes

const styles = StyleSheet.create({})