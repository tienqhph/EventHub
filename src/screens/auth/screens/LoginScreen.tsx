import {
  View,
  Text,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import ButtonComponent from '../../../components/ButtonComponent';
import InputComponent from '../../../components/InputComponent';
import {ArrowRight, Lock, Sms} from 'iconsax-react-native';
import {appColors} from '../../../constants/appColors';
import ContainerComponent from '../../../components/ContainerComponent';
import {image} from '../../../constants/const';
import {styles} from '../style';
import TextComponent from '../../../components/TextComponent';
import ForgotPassComponent from '../Components/ForgotPassComponent';
import {fonts} from '../../../constants/fontFamily';
import LoginWithOther from '../Components/LoginWithOther';
import authenticationApi from '../../../apis/authApi';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { addAuth } from '../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RootStack } from '../../../navigators/typechecking/TypeChecking';

const LoginScreen = () => {
  const [dataEmail, setDataEmail] = useState('');
  const [dataPass, setDataPass] = useState('');
  const dispatch = useDispatch<AppDispatch>()
  const [textError, settextError] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation<RootStack>()
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const _onChangeEmail = (value: string) => {
    if(value){
      setDataEmail(value);
    
    }else{
      setDataEmail('')
    }
  };
  const _onChangePass = (value: string) => {
    if(value){
      setDataPass(value);
      settextError('')
    }
    else{
      setDataPass('')
    }
  };

  const handleSignIn = async () => {

 
    if (dataEmail == '' || dataPass == '') {
      settextError('please enter your emal and password!!')
    } else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (reg.test(dataEmail) === true) {
        try {
          const dataLogin = await authenticationApi.handleAuthentication(
            '/login',
            {email: dataEmail, passworrd: dataPass},
            'post',
          )
          console.log(dataLogin)
            if(dataLogin.data){
              settextError('')
    

              if(dataLogin.data.isUpdated===false){
              await AsyncStorage.setItem('auth',JSON.stringify(dataLogin) ).then(()=>console.log("lưu thành công"))
               dispatch(addAuth({
                email:dataLogin.data.email , 
                id:dataLogin.data.id , 
                token:dataLogin.data.token , 
                isUpdated:dataLogin.data.isUpdated??false , 
                familyName:dataLogin.data.familyName??''  , 
                givenName:dataLogin.data.givenName??''  , 
                name:dataLogin.data.name??''  , 
                photo:dataLogin.data.photo??'' 
               }))
              }else{
                    navigation.navigate('NewPassWord_Screen' ,{  id:dataLogin.data.id })
              }
            }else{
              settextError('Email or pass is not correct!!!')
            }
       
        } catch (error) {
          console.log('error', error);
        }
      }else{
        settextError('please enter correct format email')
      }
    }
  };
  return (
    <ImageBackground
      style={[styles.constainerLoginScreen]}
      source={image.image_background}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={[styles.Imagelogo]}>
        <Image source={image.image_txtlogo} style={{}} />
      </View>

      <TextComponent
        tilte
        text="Sign in"
        styles={{color: '#120D26', paddingVertical: 24}}
      />
      <InputComponent
        affix={<Sms size={22} color={appColors.gray}></Sms>}
        value={dataEmail}
        onChange={_onChangeEmail}
        pleaceHolder="email"
      />
      <InputComponent
        isPassword
        affix={<Lock size={22} color={appColors.gray}></Lock>}
        value={dataPass}
        onChange={_onChangePass}
        pleaceHolder="Password"
      />

       {
        textError? <TextComponent text={textError} color='red'/>:<></>
       }

      <ForgotPassComponent  isEnable={isEnabled} onpress={()=>toggleSwitch()}/>
      <ButtonComponent
        styles={{marginHorizontal: 40}}
        flexIcon="reight"
        text="SIGN IN"
        onPress={handleSignIn}
        type="primary"
        textColor={appColors.white}
        textStyle={{
          fontFamily: fonts.bold,
          flex: 1,
          alignItems: 'center',
          textAlign: 'center',
        }}
        icon={<ArrowRight size={22} color={appColors.white} />}
      />

      <LoginWithOther text="Sign up" />
    </ImageBackground>
  );
};

export default LoginScreen;
