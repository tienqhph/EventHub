import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthNavigator from './src/navigators/AuthNavigator';
import {SplashScreen} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(!isShowSplash);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);
  return isShowSplash ? (
    <SplashScreen />
  ) : (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
