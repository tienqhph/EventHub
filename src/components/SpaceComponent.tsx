import { View, Text } from 'react-native'
import React from 'react'


interface Props {
    width?:number  , 
    height?:number
}
export default function SpaceComponent(props:Props) {

    const {height , width} = props
  return (
  <View  style = {{height:height , width:width}}/>
  )
}