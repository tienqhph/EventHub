import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextComponent from '../../../components/TextComponent';
import {appColors} from '../../../constants/appColors';
import ButtonComponent from '../../../components/ButtonComponent';
import {fonts} from '../../../constants/fontFamily';
import {Image} from 'react-native';
import {iconApp} from '../../../constants/const';
import {useNavigation} from '@react-navigation/native';
import {
  RootStack,
  RootStackSignup,
} from '../../../navigators/typechecking/TypeChecking';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Alert } from 'react-native';

GoogleSignin.configure({
  webClientId: "177856044457-mms872mt683b3t052tv7prr9pimgatus.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: "", // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: "", // [Android] specifies an account name on the device that should be used
  iosClientId: "<FROM DEVELOPER CONSOLE>", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120,
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


  const handleLoginWithGoogle = async ()=>{
 try {
  await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // this.setState({ userInfo, error: null });
        Alert.alert("success:" + JSON.stringify(userInfo));
 } catch (error) {
    console.log(error)
 }
  }
  const handleLoginWithFaceBook = ()=>{
    console.log('loginwith face book')
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
          onPress={handleLoginWithFaceBook}
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
