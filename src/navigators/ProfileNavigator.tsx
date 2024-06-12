import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NAME_SCREENS } from '../constants/nameNavigator'
import ProfileScreen from '../screens/profile/ProfileScreen'

const ProfileNavigator = () => {
    const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
     <Stack.Screen name={NAME_SCREENS.PROFILE_SCREEN} component={ProfileScreen}/>
    </Stack.Navigator>
  )
}

export default ProfileNavigator