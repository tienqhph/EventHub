import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {EyeSlash} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
interface Props {
  value: string;
  onChange: Function;
  affix?: ReactNode;
  pleaceHolder?: string;
  subffix?: ReactNode;
  isPassword?: boolean; 
  styles ?: StyleProp<ViewStyle>,
  type?: string
}
const InputComponent = (props: Props) => {
  const {value, onChange, affix, subffix, pleaceHolder, isPassword , styles} = props;


  const [showPass , setShowpass] = useState(isPassword ?? false)

  return (
    <View style={[style.containerInput]}>
      {affix ?? affix}
        
      <TextInput style = {[{flex:1 , paddingHorizontal:12} , styles] }
        secureTextEntry={showPass}
        value={value}
        placeholder={pleaceHolder ?? ''}
        onChangeText={val => onChange(val)}

        
      />
      {subffix ?? subffix}
      <TouchableOpacity onPress={isPassword?()=> setShowpass(!showPass) :()=> onChange('')}>
        {isPassword ? (
          <FontAwesome size={22} color={appColors.gray} name ={showPass?'eye' :'eye-slash'}/>
        ) : (
          value.length > 0 && (
            <AntDesign name="close" color={appColors.text} size={22} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;

const style = StyleSheet.create({
  containerInput: {
    paddingHorizontal: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: appColors.gray2,
    minHeight: 56,
    borderRadius: 12,  marginBottom:19
  },  
});
