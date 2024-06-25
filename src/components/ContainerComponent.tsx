import React, {ReactNode} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {image} from '../constants/const';

import {style} from '../styles/globalStyle';
import TextComponent from './TextComponent';

interface Props {
  IsBackground?: boolean;
  title?: string;
  styles?: StyleProp<ViewStyle>;
  isScoll?: boolean;
  children: ReactNode;
}
const ContainerComponent = (props: Props) => {
  const {isScoll, IsBackground, title, styles, children} = props;

  const renderConptainer = isScoll ? (
    <ScrollView showsVerticalScrollIndicator={false} style={[{flex: 1}, styles]}>{children}</ScrollView>
  ) : (
    <View style={[{flex: 1}, styles]}>{children}</View>
  );
  return IsBackground ? (
    <ImageBackground
      source={image.image_background}
      style={[{flex: 1}, styles]}>
      <StatusBar translucent backgroundColor="transparent" />
      {title ? <TextComponent text={title} styles={{paddingTop: 20}} /> : <></>}
      <View style={{marginTop: 50}}>{renderConptainer}</View>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[style.container, styles]}>
      {title ? <TextComponent text={title} styles={{paddingTop: 20}} /> : <></>}
      <View style={[style.container]}>{renderConptainer}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
