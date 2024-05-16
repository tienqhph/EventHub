import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { image } from '../../../constants/const'
import { styles } from '../style'
import TextComponent from '../../../components/TextComponent'
import InputComponent from '../../../components/InputComponent'
import { ArrowLeft, ArrowRight, Sms } from 'iconsax-react-native'
import { appColors } from '../../../constants/appColors'
import ForgotPassComponent from '../Components/ForgotPassComponent'
import ButtonComponent from '../../../components/ButtonComponent'
import { fonts } from '../../../constants/fontFamily'
import LoginWithOther from '../Components/LoginWithOther'
import { useNavigation } from '@react-navigation/native'
import { RootStack } from '../../../navigators/typechecking/TypeChecking'

const ResetPasswordScreen = () => {

    const [dataEmail, setDataEmail] = useState('');

    const _onChangeEmail = (value: string) => {
      setDataEmail(value);
    };


    const navigation = useNavigation<RootStack>()
  return (
<ImageBackground
      style={[styles.constainerLoginScreen]}
      source={image.image_background}>
      <StatusBar translucent backgroundColor="transparent" />
   
      <TouchableOpacity  onPress={()=>navigation.pop()}>
        <ArrowLeft size={22} color={appColors.back}/>
      </TouchableOpacity>

      <TextComponent
        tilte
        text="Reset Password"
        styles={{color: '#120D26', paddingVertical: 24}}
      />
       <TextComponent
        text="Please enter your email address to request a password reset"
        styles={{color: '#120D26', paddingVertical: 24}}
      />
      <InputComponent
        affix={<Sms size={22} color={appColors.gray}></Sms>}
        value={dataEmail}
        onChange={_onChangeEmail}
        pleaceHolder="abc@gmail.com"
      />
   

   
      <ButtonComponent

        styles={{marginHorizontal: 40}}
        flexIcon="reight"
        text="Sent"
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

  
    </ImageBackground>
  )
}

export default ResetPasswordScreen

