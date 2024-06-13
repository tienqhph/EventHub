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

GoogleSignin.configure({
  webClientId:'177856044457-8jdnbticjo5h1il4i3ijol1i4m5ftssa.apps.googleusercontent.com'
});
interface Props {
  text: string;
}


const LoginWithOther = ({text}: Props) => {
  const navigation = useNavigation<RootStack>();

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
    console.log("vao day" , userInfo)
      } catch (error) {
          console.log(error)
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
