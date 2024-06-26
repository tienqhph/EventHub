import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NAME_SCREENS } from '../constants/nameNavigator';
import { HomeScreen } from '../screens';

const ExpolerNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={NAME_SCREENS.HOME_SCREEN}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={NAME_SCREENS.HOME_SCREEN} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default ExpolerNavigator;
