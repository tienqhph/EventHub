import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NAME_SCREENS } from '../constants/nameNavigator';
import { LoginScreen } from '../screens';
import NewPassword from '../screens/auth/screens/NewPassword';
import OnBoardingScreen from '../screens/auth/screens/OnBoardingScreen';
import ResetPasswordScreen from '../screens/auth/screens/ResetPasswordScreen';
import SignUpScreen from '../screens/auth/screens/SignUpScreen';
import VerificationScreen from '../screens/auth/screens/VerificationScreen';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={NAME_SCREENS.ONBOARDING_SCREEN}
        component={OnBoardingScreen}
      />
      <Stack.Screen name={NAME_SCREENS.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={NAME_SCREENS.SIGNUP_SCREEN}
        component={SignUpScreen}
      />
      <Stack.Screen
        name={NAME_SCREENS.VERIFICATION}
        component={VerificationScreen}
      />
      <Stack.Screen
        name={NAME_SCREENS.RESETPASSWORD_SCREEN}
        component={ResetPasswordScreen}
      />
      <Stack.Screen
        name={NAME_SCREENS.NEWPASSWORD_SCREEN}
        component={NewPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
