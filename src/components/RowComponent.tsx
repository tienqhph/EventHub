import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'


interface Props {
    flex?:number , 
    style?:StyleProp<ViewStyle>
    children?:ReactNode , 
    flexD:"row" | "column" | "row-reverse" | "column-reverse" | undefined

}
const RowComponent = (props:Props) => {

    const { flexD , flex , children , style} = props
  return (
    <View style = {[{flexDirection:flexD} , style]}>
      {children}
    </View>
  )
}

export default RowComponent