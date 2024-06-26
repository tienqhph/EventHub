import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NAME_SCREENS } from '../constants/nameNavigator';
import DetailScreen from '../screens/auth/screens/DetailScreen';
import HomeDrawer from './HomeDrawer';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={NAME_SCREENS.HOMEDRAWER_SCREEN}
        component={HomeDrawer}
      />
      <Stack.Screen
        name={NAME_SCREENS.DETAIL_SCREEN}
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
