import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NAME_SCREENS } from '../constants/nameNavigator'
import MapScreens from '../screens/map/MapScreens'

const MapNavigator = () => {
    const Stack = createStackNavigator()
  return (
    <Stack.Navigator initialRouteName = {NAME_SCREENS.MAP_SCREEN}screenOptions={{
      headerShown:false
    }}>
     <Stack.Screen name={NAME_SCREENS.MAP_SCREEN} component={MapScreens}/>
    </Stack.Navigator>
  )
}

export default MapNavigator