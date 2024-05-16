import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NAME_SCREENS } from '../constants/nameNavigator'
import { LoginScreen, SplashScreen } from '../screens'
import OnBoardingScreen from '../screens/auth/screens/OnBoardingScreen'
import SignUpScreen from '../screens/auth/screens/SignUpScreen'
import VerificationScreen from '../screens/auth/screens/VerificationScreen'
import ResetPasswordScreen from '../screens/auth/screens/ResetPasswordScreen'

const AuthNavigator = () => {

    const Stack = createNativeStackNavigator()
  return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name={NAME_SCREENS.ONBOARDING_SCREEN} component={OnBoardingScreen}/>
            <Stack.Screen name={NAME_SCREENS.LOGIN_SCREEN} component={LoginScreen}/>
            <Stack.Screen name={NAME_SCREENS.SIGNUP_SCREEN} component={SignUpScreen}/>
            <Stack.Screen name={NAME_SCREENS.VERIFICATION} component={VerificationScreen}/>
            <Stack.Screen name={NAME_SCREENS.RESETPASSWORD_SCREEN} component={ResetPasswordScreen}/>
        </Stack.Navigator>
  )
}

export default AuthNavigator