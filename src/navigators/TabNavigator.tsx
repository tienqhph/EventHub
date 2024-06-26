import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Calendar,
  Home,
  Map1,
  Profile
} from 'iconsax-react-native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { icon } from '../constants/const';
import { NAME_SCREENS } from '../constants/nameNavigator';
import AddEventScreen from '../screens/addevvents/AddEventScreen';
import EventsNavigator from './EventsNavigator';
import ExpolerNavigator from './ExpolerNavigator';
import MapNavigator from './MapNavigator';
import ProfileNavigator from './ProfileNavigator';

const TabNavigator = ({navigation}: any) => {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          textAlign: 'center',
        },
        tabBarIconStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarHideOnKeyboard: true,
      })}>
      <BottomTab.Screen
        name={NAME_SCREENS.EXPOLER_SCREEN}
        component={ExpolerNavigator}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Home size={20} color={color} />
              <Text style={{color: color}}>Home</Text>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name={NAME_SCREENS.EVENT_NAVIGATOR}
        component={EventsNavigator}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Calendar size={20} color={color} />
              <Text style={{color: color}}>Events</Text>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name={NAME_SCREENS.ADDEVENT_SCREEN}
        component={AddEventScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                top: -25,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#5669FF',
                }}>
                <Image source={icon.add_box} style={{width: 24, height: 24}} />
              </View>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name={NAME_SCREENS.MAP_NAVIGATOR}
        component={MapNavigator}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Map1 size={20} color={color} />
              <Text style={{color: color}}>Map</Text>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name={NAME_SCREENS.PROFILE_NAVIGATOR}
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Profile size={20} color={color} />
              <Text style={{color: color}}>Profile</Text>
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default TabNavigator;
