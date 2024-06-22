import { View, Text } from 'react-native'
import React from 'react'
import SeeAllComponent from '../../../components/SeeAllComponent'
interface Props {
  title:string , 
  onpress ?:()=>void
}
const UpcomingEventsComponent = (props:Props) => {
  const  {title , onpress} = props
  return (
    <View style = {{padding:20}}>
      <SeeAllComponent title={title} onpress={onpress}/>
    </View>
  )
}

export default UpcomingEventsComponent