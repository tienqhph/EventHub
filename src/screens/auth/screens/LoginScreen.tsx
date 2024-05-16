import {
  View,
  Text,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
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

const LoginScreen = () => {
  const [dataEmail, setDataEmail] = useState('');
  const [dataPass, setDataPass] = useState('');
  const _onChangeEmail = (value: string) => {
    setDataEmail(value);
  };
  const _onChangePass = (value: string) => {
    setDataPass(value);
  };

  const handleSignIn = async()=>{


    try {
        const data = await authenticationApi.handleAuthentication('/hello')

      console.log("data api" , data);
      
    
          
      
    } catch (error) {
      console.log("error" , error);
      
    }
  }
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

      <ForgotPassComponent />
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

      <LoginWithOther text="Sign up"/>
    </ImageBackground>
  );
};

export default LoginScreen;
