import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NAME_SCREENS } from '../constants/nameNavigator'
import { HomeScreen } from '../screens'

const HomeNavigator = () => {

    const BottomTab = createBottomTabNavigator()
  return (
        <BottomTab.Navigator>
            <BottomTab.Screen name={NAME_SCREENS.HOME_SCREEN} component={HomeScreen}/>
        </BottomTab.Navigator>
  )
}

export default HomeNavigator