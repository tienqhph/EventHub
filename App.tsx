import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import AuthNavigator from './src/navigators/AuthNavigator';

import {SplashScreen} from './src/screens';
import {store} from './src/redux/store';
import CheckAuthNavigator from './src/navigators/CheckAuthNavigator';
import MainNavigator from './src/navigators/MainNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';

export default function App() {
  return (
    <GestureHandlerRootView style = {{flex:1}}>
      <Host>
        <Provider store={store}>
          <NavigationContainer>
            <CheckAuthNavigator />
          </NavigationContainer>
        </Provider>
      </Host>
    </GestureHandlerRootView>
  );
}
