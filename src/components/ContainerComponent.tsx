import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {ReactNode} from 'react';
import {image} from '../constants/const';


import { style } from '../styles/globalStyle';

interface Props {
  IsBackground?: boolean;
  title?: string;
  styles?: StyleProp<ViewStyle>;
  isScoll?: boolean;
  children: ReactNode;
}
const ContainerComponent = (props: Props) => {
  const {isScoll, IsBackground, title, styles, children} = props;

  const renderConpainer = isScoll ? (
    <ScrollView style = {{flex:1}}>{children}</ScrollView>
  ) : (
    <View style = {[{flex:1}]}>{children}</View>
  );
  return IsBackground ? (
    <ImageBackground source={image.image_background} style = {{flex:1 }} >
        <StatusBar  translucent backgroundColor='transparent'/>
          
            <View style = {{marginTop:50}}>
            {renderConpainer}
            </View>
         
        
           
    </ImageBackground>
  ) : (
    <SafeAreaView style = {[style.container]}>
      <View  style = {[style.container]}>{renderConpainer}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
