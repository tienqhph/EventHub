import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StatusBar
} from 'react-native';
import SpaceComponent from '../components/SpaceComponent';
import { appColors } from '../constants/appColors';
import { appInfor, image } from '../constants/const';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={image.image_background}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      imageStyle={{flex: 1}}>
      <StatusBar backgroundColor="transparent" translucent />
      <Image
        source={image.image_logo}
        style={{width: appInfor.sizes.WIDTH * 0.7, resizeMode: 'contain'}}
      />

      <SpaceComponent height={16} />
      <ActivityIndicator color={appColors.gray} />
    </ImageBackground>
  );
};

export default SplashScreen;
