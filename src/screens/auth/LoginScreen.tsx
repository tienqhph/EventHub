import {View, Text} from 'react-native';
import React, {ReactNode, useState} from 'react';
import ButtonComponent from '../../components/ButtonComponent';
import InputComponent from '../../components/InputComponent';
import { Lock, Sms } from 'iconsax-react-native';
import { appColors } from '../../constants/appColors';

const LoginScreen = () => {
  const [dataEmail, setDataEmail] = useState('');
  const _onChangeEmail = (value: string) => {
    setDataEmail(value);
  };
  return (
    <View style = {{padding:20}}>
 
      <InputComponent 
        
        affix   = {<Sms size={22}  color={appColors.gray}></Sms>}
        value={dataEmail}
        onChange={_onChangeEmail}
        pleaceHolder="email"
      />
          <InputComponent 
        isPassword
        affix   = {<Lock size={22}  color={appColors.gray}></Lock>}
        value={dataEmail}
        onChange={_onChangeEmail}
        pleaceHolder="Password"
      />
    </View>
  );
};

export default LoginScreen;
