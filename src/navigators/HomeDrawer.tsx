import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawer from '../components/CustomDrawer';
import { NAME_SCREENS } from '../constants/nameNavigator';

import TabNavigator from './TabNavigator';

const HomeDrawer = () => {
    
const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName={NAME_SCREENS.HOME_SCREEN} screenOptions={{headerShown:false}} 
    drawerContent={props=><CustomDrawer {...props}/>}>
           <Drawer.Screen name={NAME_SCREENS.BOTTOM_TAB} component={TabNavigator}/>
  
  </Drawer.Navigator>
  )
}

export default HomeDrawer