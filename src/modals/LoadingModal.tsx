import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import TextComponent from '../components/TextComponent'
interface Props  {
    isvisiable :boolean , 

}
const LoadingModal = ({isvisiable}:Props) => {
  return (
    <Modal   transparent visible = {isvisiable} style = {[{flex:1 , alignItems:'center' , justifyContent:'center' }]}>
        <View style = {[{flex:1 , alignItems:'center' , justifyContent:'center' ,backgroundColor:'rgba(0,0,0, 0.5)'}]}>
        <TextComponent text='Loading'/>
        <ActivityIndicator size={32}/>
        </View>
    </Modal>
  )
}

export default LoadingModal