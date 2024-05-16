import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RootStack } from '../../../navigators/typechecking/TypeChecking';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../style';
import { image } from '../../../constants/const';
import { ArrowLeft, ArrowRight, Sms } from 'iconsax-react-native';
import { appColors } from '../../../constants/appColors';
import TextComponent from '../../../components/TextComponent';
import InputComponent from '../../../components/InputComponent';
import ButtonComponent from '../../../components/ButtonComponent';
import { fonts } from '../../../constants/fontFamily';

const VerificationScreen = () => {
    const [number1, setdatanumber1] = useState("");
    const [number2, setdatanumber2] = useState("");
    const [number3, setdatanumber3] = useState("");
    const [number4, setdatanumber4] = useState("");

    const _onChangedata1 = (value: string) => {
      setdatanumber1(value);
    };
    const _onChangedata2 = (value: string) => {
        setdatanumber2(value);
      };
      const _onChangedata3 = (value: string) => {
        setdatanumber3(value);
      };
      const _onChangedata4 = (value: string) => {
        setdatanumber4(value);
      };


    const navigation = useNavigation<RootStack>()
  return (
<ImageBackground
      style={[styles.constainerLoginScreen]}
      source={image.image_background}>
      <StatusBar translucent backgroundColor="transparent" />
   
      <TouchableOpacity onPress={()=>navigation.pop()}>
        <ArrowLeft size={22} color={appColors.back}/>
      </TouchableOpacity>

      <TextComponent
        tilte
        text="Verification"
        styles={{color: '#120D26', paddingVertical: 24}}
      />
       <TextComponent
        text="We’ve send you the verification code on +1 2620 0323 7631"
        styles={{color: '#120D26', paddingVertical: 24}}
      />
    <View style = {{flexDirection:'row' , alignItems:'center' , justifyContent:'space-evenly'}}>
    <InputComponent
    styles ={{flex:0}}
       keyBoardType='numeric'
       maxlength={1}
        value={number1}
        onChange={_onChangedata1}
        pleaceHolder="-"
      />
        <InputComponent
         styles ={{flex:0}}
         keyBoardType='numeric'
         maxlength={1}
        value={number2}
        onChange={_onChangedata2}
        pleaceHolder="-"
      />
        <InputComponent
         styles ={{flex:0}}
         keyBoardType='numeric'
         maxlength={1}
        value={number3}
        onChange={_onChangedata3}
        pleaceHolder="-"
      />
        <InputComponent
         styles ={{flex:0}}
         keyBoardType='numeric'
         maxlength={1}
        value={number4}
        onChange={_onChangedata4}
        pleaceHolder="-"
      />

    </View>
   

   
      <ButtonComponent

        styles={{marginHorizontal: 40}}
        flexIcon="reight"
        text="Continute"
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
    <View style = {{alignItems:'center' , flexDirection:'row' , justifyContent:'center'}}>
    <TextComponent
        text="Re-send code in"
        styles={{color: '#120D26', paddingVertical: 24}}
      />
        <TextComponent
        text="0:20"
        styles={{color:appColors.primary, paddingHorizontal: 12}}
      />
    </View>
  
    </ImageBackground>
)}

export default VerificationScreen

