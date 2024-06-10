import { Alert, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import authenticationApi from '../../../apis/authApi'
import SpaceComponent from '../../../components/SpaceComponent'
import LoadingModal from '../../../modals/LoadingModal'

const ResetPasswordScreen = () => {

    const [dataEmail, setDataEmail] = useState('');
    const [disableButton, setdisableButton] = useState(true);
    const [visiableModal, setvisiableModal] = useState(false);
    const [textError, settextError] = useState('');
    const _onChangeEmail = (value: string) => {
      setDataEmail(value);
    };
    useEffect(() => {
      checkEmail()
      
    }, [dataEmail]);


    const checkEmail = ()=>{
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if(reg.test(dataEmail)){
        setdisableButton(false)
      }else{
        setdisableButton(true)
      }
    }

    const navigation = useNavigation<RootStack>()

      const handleResetPassword = async()=>{
        setvisiableModal(true)
            const res = await authenticationApi.handleAuthentication('/resetpass',{email:dataEmail} , 'post')
            res.data?settextError(''):settextError('user not found!!!')
            setvisiableModal(false)
            Alert.alert('Reset password', 'Please Check your email to get new password', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () =>   res.data&&navigation.goBack()},
            ]);
          
      }

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

    {
      textError.length>0?    <TextComponent text={textError}  styles = {{textAlign:'center'}}color='red'/>:<></>
    }
    <SpaceComponent height={10}/>
   
      <ButtonComponent
      disable = {disableButton}
      onPress={handleResetPassword}
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
      <LoadingModal isvisiable={visiableModal} />
  
    </ImageBackground>
  )
}

export default ResetPasswordScreen

