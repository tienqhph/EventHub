import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NAME_SCREENS } from '../constants/nameNavigator'
import TabNavigator from './TabNavigator'
import HomeDrawer from './HomeDrawer'


const MainNavigator = () => {


    const Stack = createNativeStackNavigator()
  return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name={NAME_SCREENS.HOMEDRAWER_SCREEN} component={HomeDrawer}/>
        </Stack.Navigator>
  )
}

export default MainNavigator