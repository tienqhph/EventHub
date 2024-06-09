import AsyncStorage, {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AuthState, addAuth} from '../redux/reducers/authReducer';
import {AppDispatch, RootState} from '../redux/store';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import {SplashScreen} from '../screens';

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
   if(dataparse!=null){
    dispatch(addAuth({email:dataparse.data.email , id:dataparse.data.id , token:dataparse.data.token}))
  
   
   }
    } catch (error) {
      console.log('errror', error);
    }
  };

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : data.token? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default CheckAuthNavigator;
