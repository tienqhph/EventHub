import React, { ReactNode, useState } from 'react';
import {
  KeyboardType,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { appColors } from '../constants/appColors';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
interface Props {
  value: string;
  onChange: (val: any) => void;
  affix?: ReactNode;
  pleaceHolder?: string;
  subffix?: ReactNode;
  isPassword?: boolean;
  styles?: StyleProp<ViewStyle>;
  type?: string;
  key?: string;
  keyBoardType?: KeyboardType;
  maxlength?: number;
  onendEditing?: () => void;
}
const InputComponent = (props: Props) => {
  const {
    onendEditing,
    key,
    value,
    onChange,
    affix,
    subffix,
    pleaceHolder,
    isPassword,
    styles,
    keyBoardType,
    maxlength,
  } = props;

  const [showPass, setShowpass] = useState(isPassword ?? false);

  return (
    <View style={[style.containerInput, styles]}>
      {affix ?? affix}

      <TextInput
        maxLength={maxlength}
        keyboardType={keyBoardType}
        style={[{flex: 1, paddingHorizontal: 12}, styles]}
        secureTextEntry={showPass}
        value={value + ''}
        placeholder={pleaceHolder ?? ''}
        onChangeText={val => onChange(val)}
        onEndEditing={onendEditing}
      />
      {subffix ?? subffix}
      <TouchableOpacity
        onPress={
          isPassword ? () => setShowpass(!showPass) : () => onChange('')
        }>
        {isPassword ? (
          <FontAwesome
            size={22}
            color={appColors.gray}
            name={showPass ? 'eye' : 'eye-slash'}
          />
        ) : keyBoardType == 'numeric' ? null : value.length > 0 ? (
          <AntDesign name="close" color={appColors.text} size={22} />
        ) : null}
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
    borderRadius: 12,
    marginBottom: 19,
  },
});
