import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../../../components/ButtonComponent';
import TextComponent from '../../../components/TextComponent';
import { appColors } from '../../../constants/appColors';
import { iconApp } from '../../../constants/const';
import { fonts } from '../../../constants/fontFamily';
import {
  RootStack
} from '../../../navigators/typechecking/TypeChecking';
import authenticationApi from "../../../apis/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { addAuth } from "../../../redux/reducers/authReducer";
import { Settings , LoginButton  , AccessToken , LoginManager, Profile } from "react-native-fbsdk-next";

GoogleSignin.configure({
  webClientId:'177856044457-8q7f8v0vhgcij9tn89bg4abi32avmlqd.apps.googleusercontent.com'
});
Settings.setAppID('986865533094298');
interface Props {
  text: string;
}


const LoginWithOther = ({text}: Props) => {
  const navigation = useNavigation<RootStack>();
  const dispatch = useDispatch<AppDispatch>()
  const _gotoSignup = () => {
    navigation.navigate('SignupScreen');
  };

  const _gotoSignIn = () => {
    navigation.navigate('LoginScreen');
  };

  const handleLoginWithGoogle = async()=>{  
 
      try {
       
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog:true
        });
        const userInfo = await GoogleSignin.signIn();
        const res =  await authenticationApi.handleAuthentication('/signinwithgoogle' , {userInfor:userInfo} , 'post')
        await AsyncStorage.setItem('auth',JSON.stringify(res) ).then(()=>console.log("lưu thành công"))

        console.log("data ress" , res)
        dispatch(addAuth({
         email:res.data.email , 
         id:res.data.id , 
         token:res.data.token , 
         isUpdated:res.data.isUpdated??false , 
         familyName:res.data.familyName , 
         photo:res.data.photo , 
         givenName:res.data.givenName , 
         name:res.data.name
        }))
      } catch (error) {
          console.log(error)
      }
  }
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
   
    } catch (error) {
      console.error(error);
    }
  };


  const handleLoginWithFaceBook =  async()=>{
    const result = await LoginManager.logInWithPermissions(["public_profile"])

    try {
        if(result.isCancelled){
          console.log("Login cancelled");
        }else{
          const data = await Profile.getCurrentProfile()
            const res = await authenticationApi.handleAuthentication('/signinwithfacebook' , {datauser:data} , 'post')
              console.log( 'data res',res)
            await AsyncStorage.setItem('auth',JSON.stringify(res) ).then(()=>console.log("lưu thành công"))

            console.log("data ress" , res)
            dispatch(addAuth({
             email:res.data.email , 
             id:res.data.id , 
             token:res.data.token , 
             isUpdated:res.data.isUpdated??false , 
             familyName:res.data.familyName , 
             photo:res.data.photo , 
             givenName:res.data.givenName , 
             name:res.data.name
            }))
        }
    } catch (error) {
      
    }

  }
  return (
    <View style={[styles.container]}>
      <TextComponent text="OR" color={appColors.gray2} />

      <View style={{flexDirection: 'row'}}>
        
        <ButtonComponent
        onPress={handleLoginWithGoogle}
          styles={{
            marginHorizontal: 40,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
          flexIcon="left"
          text="Login With google"
          type="primary"
          textStyle={{
            fontFamily: fonts.medium,
          }}
          icon={
            <Image
              source={iconApp.icon_google}
              style={[{width: 24, height: 24, marginHorizontal: 12}]}
            />
          }
        />
        
      </View>
            

      <View style={{flexDirection: 'row'}}>
        <ButtonComponent

        onPress={handleLoginWithFaceBook}
          styles={{
            marginHorizontal: 40,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
          flexIcon="left"
          text="Login With facebook"
          type="primary"
          textStyle={{
            fontFamily: fonts.medium,
          }}
          icon={
            <Image
              source={iconApp.icon_facebook}
              style={[{width: 24, height: 24, marginHorizontal: 12}]}
            />
          }
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text>Dont'n have account?</Text>
        <ButtonComponent
          onPress={text == 'Sign up' ? _gotoSignup : _gotoSignIn}
          styles={{
            marginHorizontal: 40,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
          text={text}
          type="link"
          textStyle={{
            fontFamily: fonts.medium,
          }}
        />
      </View>
    </View>
  );
};

export default LoginWithOther;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
