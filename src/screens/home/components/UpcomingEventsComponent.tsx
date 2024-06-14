import { View, Text } from 'react-native'
import React from 'react'
import SeeAllComponent from '../../../components/SeeAllComponent'

const UpcomingEventsComponent = () => {
  return (
    <View style = {{padding:20}}>
      <SeeAllComponent title='Upcoming Events' onpress={()=>console.log('see alll')}/>
    </View>
  )
}

export default UpcomingEventsComponent