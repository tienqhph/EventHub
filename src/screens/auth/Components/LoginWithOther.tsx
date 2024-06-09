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

  return (
    <View style={[styles.container]}>
      <TextComponent text="OR" color={appColors.gray2} />

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
