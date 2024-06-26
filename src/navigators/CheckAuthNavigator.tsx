import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth } from '../redux/reducers/authReducer';
import { AppDispatch, RootState } from '../redux/store';
import { SplashScreen } from '../screens';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const CheckAuthNavigator = () => {
  const data = useSelector((state: RootState) => state.authReducer.dataAuth);
  const dispatch = useDispatch<AppDispatch>();

  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    checkLogin();

    const timeout = setTimeout(() => {
      setIsShowSplash(!isShowSplash);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const checkLogin = async () => {
    const jsonValue = await AsyncStorage.getItem('auth');
    const dataparse = jsonValue != null ? JSON.parse(jsonValue) : null;

    try {
      if (dataparse != null) {
        dispatch(
          addAuth({
            email: dataparse.data.email,
            iduser: dataparse.data.id,
            token: dataparse.data.token,
            isUpdated: dataparse.data.isUpdated ?? false,
            familyName: dataparse.data.familyName,
            photo: dataparse.data.photo,
            givenName: dataparse.data.givenName,
            name: dataparse.data.name,
          }),
        );
      }
    } catch (error) {
      console.log('errror', error);
    }
  };

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : data.token ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default CheckAuthNavigator;
