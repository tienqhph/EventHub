import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponent from './TextComponent';
import { style } from '../styles/globalStyle';
import { appColors } from '../constants/appColors';
import { fonts } from '../constants/fontFamily';

interface Props {
  text: string;
  icon?: ReactNode;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: ()=>void
  flexIcon?: 'reight' | 'left';
  disable?:boolean , 
  afix ?:ReactNode , 
  prefix?:ReactNode
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
    disable , 
    afix , prefix
  } = props;
  return  type === 'primary' ?
    <TouchableOpacity disabled={disable} style = {[style.button , {backgroundColor:disable?appColors.gray:color??appColors.primary , } , styles]} onPress={onPress}>

        {icon && flexIcon ==='left' ? icon:<></>}
      <TextComponent text={text} color={textColor} styles={textStyle} font={fonts.regular} />
      
      {icon && flexIcon ==='reight' && icon}
    </TouchableOpacity>

    :<TouchableOpacity onPress={onPress}>
        <TextComponent text={text} color={type ==='link'? appColors.primary :appColors.text}/>
    </TouchableOpacity>

};

export default ButtonComponent;
