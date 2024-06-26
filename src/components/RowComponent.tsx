import { View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'


interface Props {
    flex?:number , 
    style?:StyleProp<ViewStyle>
    children:ReactNode , 
    flexD:"row" | "column" | "row-reverse" | "column-reverse" | undefined
    onpress?:()=>void

}
const RowComponent = (props:Props) => {

    const { flexD , flex , children , style , onpress} = props
  return onpress?(
    <TouchableOpacity onPress = {onpress}style = {[{flexDirection:flexD} , style]}>
      {children}
    </TouchableOpacity>
  ):(
    <View style = {[{flexDirection:flexD} , style]}>
      {children}
    </View>
  )
}

export default RowComponent