import { View, Text, ImageBackground, StatusBar, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { appInfor, image } from '../constants/const'
import SpaceComponent from '../components/SpaceComponent'
import { appColors } from '../constants/appColors'

const SplashScreen = () => {
  return (
    <ImageBackground source={image.image_background} style = {{flex:1 , justifyContent:'center', alignItems:'center'}} imageStyle = {{flex:1}}>
        <StatusBar backgroundColor='transparent'  translucent/>
        <Image source={image.image_logo} style = {{ width:appInfor.sizes.WIDTH *0.7 , resizeMode:'contain'}}/>

        <SpaceComponent height={16}/>
        <ActivityIndicator color={appColors.gray}/>
    </ImageBackground>
  )
}

export default SplashScreen