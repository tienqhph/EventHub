import {View, Text, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {appColors} from '../../../constants/appColors';
import TextComponent from '../../../components/TextComponent';
import ButtonComponent from '../../../components/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { RootStack } from '../../../navigators/typechecking/TypeChecking';

const ForgotPassComponent = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
const navigation = useNavigation<RootStack>()
  return (
    <View style={[style.container]}>
      <View style = {[{flexDirection:'row'}]} >
        <Switch
          trackColor={{false: '#767577', true: appColors.primary}}
          thumbColor="#fff"
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <TextComponent text='Remember Me'/>
      </View>

      <TouchableOpacity onPress={()=>navigation.navigate('ResetPasswordScreen')}>
        <TextComponent  text='For got password?'/>
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
    alignItems: 'center', marginVertical:20
  },
});
