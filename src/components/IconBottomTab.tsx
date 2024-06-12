import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { appColors } from '../constants/appColors'
interface Props {
    focused?:boolean , 
    icon?:any
}
const IconBottomTab = ({focused , icon} :Props) => {
  return (
    <View style={styleButton.containerIcon}>
      <Image source={require('./../assets/images/homeicon.png')} style={focused?styleButton.iconSelected: styleButton.iconunSelected} />
      {focused && (
        <View
          style={styleButton.BottomIconSelected}
        />
      )}
    </View>
  )
}

export default IconBottomTab


const styleButton = StyleSheet.create({
    containerIcon: {alignItems: 'center', justifyContent: 'center', padding: 10},
    iconSelected: {
        
        width:20 , height:20,
        tintColor: appColors.primary,
      },
      iconunSelected: {
        tintColor: 'gray',
        width:20 , height:20
      },
      BottomIconSelected: {
        width: '70%',
        height: 3,
        backgroundColor: appColors.primary,
        position: 'absolute',
        bottom: 1,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      },
})