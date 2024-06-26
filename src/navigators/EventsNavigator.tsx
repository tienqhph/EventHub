import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NAME_SCREENS } from '../constants/nameNavigator';
import EventScreen from '../screens/events/EventScreen';

const EventsNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={NAME_SCREENS.EVENTS_SCREEN} component={EventScreen} />
    </Stack.Navigator>
  );
};

export default EventsNavigator;
