import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NAME_SCREENS } from '../constants/nameNavigator'
import { LoginScreen, SplashScreen } from '../screens'
import OnBoardingScreen from '../screens/auth/OnBoardingScreen'

const AuthNavigator = () => {

    const Stack = createNativeStackNavigator()
  return (
        <Stack.Navigator screenOptions={{headerShown:false}}>

            <Stack.Screen name={NAME_SCREENS.ONBOARDING_SCREEN} component={OnBoardingScreen}/>
            <Stack.Screen name={NAME_SCREENS.LOGIN_SCREEN} component={LoginScreen}/>
        </Stack.Navigator>
  )
}

export default AuthNavigator