import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import TextComponent from '../../../components/TextComponent';
import { appColors } from '../../../constants/appColors';
import { RootStack } from '../../../navigators/typechecking/TypeChecking';

interface Props {
  isEnable: boolean;
  onpress: () => void;
}

const ForgotPassComponent = (props: Props) => {
  const {isEnable, onpress} = props;

  const navigation = useNavigation<RootStack>();
  return (
    <View style={[style.container]}>
      <View style={[{flexDirection: 'row'}]}>
        <Switch
          trackColor={{false: '#767577', true: appColors.primary}}
          thumbColor="#fff"
          ios_backgroundColor="#3e3e3e"
          onValueChange={onpress}
          value={isEnable}
        />
        <TextComponent text="Remember Me" />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('ResetPasswordScreen')}>
        <TextComponent text="For got password?" />
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassComponent;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
});
