import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { appColors } from '../constants/appColors';
import { fonts } from '../constants/fontFamily';
import { style } from '../styles/globalStyle';
import TextComponent from './TextComponent';

interface Props {
  text: string;
  icon?: ReactNode;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  flexIcon?: 'reight' | 'left';
  disable?: boolean;
  afix?: ReactNode;
  prefix?: ReactNode;
}
const ButtonComponent = (props: Props) => {
  const {
    text,
    icon,
    type,
    textColor,
    textStyle,
    onPress,
    styles,
    color,
    flexIcon,
    disable,
    afix,
    prefix,
  } = props;
  return type === 'primary' ? (
    <TouchableOpacity
      disabled={disable}
      style={[
        style.button,
        {
          backgroundColor: disable
            ? appColors.gray
            : color ?? appColors.primary,
        },
        styles,
      ]}
      onPress={onPress}>
      {icon && flexIcon === 'left' ? icon : <></>}
      <TextComponent
        text={text}
        color={textColor}
        styles={textStyle}
        font={fonts.regular}
      />

      {icon && flexIcon === 'reight' && icon}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress} style={styles}>
      <TextComponent
        text={text}
        color={type === 'link' ? appColors.primary : appColors.text}
      />
    </TouchableOpacity>
  );
};

export default ButtonComponent;
