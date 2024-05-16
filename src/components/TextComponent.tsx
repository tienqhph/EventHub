import {View, Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import {appColors} from '../constants/appColors';
import {fonts} from '../constants/fontFamily';

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;

  tilte?:boolean

}
const TextComponent = (props: Props) => {
  const {text, color, size, flex, font, styles  , tilte} = props;
  return (
    <Text
      style={[
        {},
        {
          color: color ?? appColors.text,
          fontFamily: font ?? fonts.medium,
          fontSize: size ?? tilte? 24: 14,
          flex: flex ?? 0,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
