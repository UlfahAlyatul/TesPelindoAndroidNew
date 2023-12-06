import { StyleSheet, Text, View } from 'react-native'
import { useEffect } from 'react'
import React from 'react'

const Splash = ({navigation}) => {
useEffect(() => {
    setTimeout(() => {
        navigation.replace('MainApp')
    }, 1000);
    }, [navigation])
  return (
    <View>
      <Text>Splash</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})