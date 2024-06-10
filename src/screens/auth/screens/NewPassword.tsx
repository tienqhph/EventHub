import { View, Text, ImageBackground, StatusBar, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../style'
import { image } from '../../../constants/const'
import { ArrowLeft, ArrowRight, Lock } from 'iconsax-react-native'
import { appColors } from '../../../constants/appColors'
import TextComponent from '../../../components/TextComponent'
import { useNavigation, useRoute } from '@react-navigation/native'
import { PropsRouteNewPass, RootStack } from '../../../navigators/typechecking/TypeChecking'
import InputComponent from '../../../components/InputComponent'
import ButtonComponent from '../../../components/ButtonComponent'
import { fonts } from '../../../constants/fontFamily'
import authenticationApi from '../../../apis/authApi'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { addAuth } from '../../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'


  const initialvalue = {
    password:'' , 
    newpassword :'' , 
    confirmnewpassword:''
  }
const NewPassword = () => {

  const navigation= useNavigation<RootStack>()
  const dispatch = useDispatch<AppDispatch>()
  const {params}  = useRoute<PropsRouteNewPass>()
  const [datachangeNewPass, setdatachangeNewPass] = useState(initialvalue);
  const [textError, settextError] = useState('');

  const [disable, setdisable] = useState(true);

  const handleChangeVlaue = (key:string , val:string)=>{
    settextError('')
      const datacopy:any= {...datachangeNewPass}
      datacopy [`${key}`] = val

      setdatachangeNewPass(datacopy)
  } 

useEffect(() => {
  
handleEnableButton()
 
}, [datachangeNewPass]);

 const handleEnableButton = ()=>{
    if(datachangeNewPass.password.length>0 && datachangeNewPass.newpassword.length>0 && datachangeNewPass.confirmnewpassword.length>0){
      setdisable(false)
    }else{
      setdisable(true)
    }
}


  const handleChangeNewPass =  async ()=>{
    if(datachangeNewPass.newpassword.localeCompare(datachangeNewPass.confirmnewpassword)==0){

      console.log(params?.id)
      settextError('')
        const res = await authenticationApi.handleAuthentication(`/updatepass/${params?.id}` , {
          password:datachangeNewPass.password , 
          newpassword:datachangeNewPass.newpassword
        } , 'put')

        if(res.data){
          await AsyncStorage.setItem('auth',JSON.stringify(res) ).then(()=>console.log("lưu thành công"))
          dispatch(addAuth({email:res.data.email , id:res.data.id , token:res.data.token , isUpdated:res.data.isUpdated??false}))
        }
    }else{
      settextError('Confirm password is not match!!!!')
    }
  }
  return ( 
    <ImageBackground
    style={[styles.constainerLoginScreen]}
    source={image.image_background}>
    <StatusBar translucent backgroundColor="transparent" />

    <TouchableOpacity onPress={() => navigation.pop()}>
      <ArrowLeft size={22} color={appColors.back} />
    </TouchableOpacity>

    <TextComponent
      tilte
      text="Reset Your PassWord"
      styles={{color: '#120D26', paddingVertical: 24}}
    />

<InputComponent
        isPassword
        affix={<Lock size={22} color={appColors.gray}></Lock>}
        value={datachangeNewPass.password}
        onChange={(val)=>handleChangeVlaue('password' , val)}
        pleaceHolder="Password"
      />

<InputComponent
        isPassword
        affix={<Lock size={22} color={appColors.gray}></Lock>}
        value={datachangeNewPass.newpassword}
        onChange={(val)=>handleChangeVlaue('newpassword' , val)}
        pleaceHolder="New Password"
      />
      <InputComponent
        isPassword
        affix={<Lock size={22} color={appColors.gray}></Lock>}
        value={datachangeNewPass.confirmnewpassword}
        onChange={(val)=>handleChangeVlaue('confirmnewpassword' , val)}
        pleaceHolder="Confirm new PassWord"
      />
        {
        textError.length>0?<TextComponent text={textError} color='red' />:null
      }
            <ButtonComponent
            disable = {disable}
        styles={{marginHorizontal: 40}}
        flexIcon="reight"
        text="Change Password"
        onPress={handleChangeNewPass}
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

export default NewPassword



const stylesNewpass = StyleSheet.create({
  textInput:{padding:10,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: appColors.back,
             textAlign:'center',
              alignItems: 'center',
              justifyContent: 'center',
            },
})