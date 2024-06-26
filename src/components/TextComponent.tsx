import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { appColors } from '../constants/appColors';
import { fonts } from '../constants/fontFamily';

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;

  tilte?: boolean;
  numberofline?: number;
}
const TextComponent = (props: Props) => {
  const {text, color, size, flex, font, styles, tilte, numberofline} = props;
  return (
    <Text
      numberOfLines={numberofline && numberofline}
      style={[
        {},
        {
          color: color ?? appColors.text,
          fontFamily: font ?? fonts.medium,
          fontSize: size ? size : tilte ? 24 : 14,
          flex: flex ?? 0,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
