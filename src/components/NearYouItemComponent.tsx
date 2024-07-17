import {Location} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appColors} from '../constants/appColors';
import {fonts} from '../constants/fontFamily';
import UpcomingEventsComponent from '../screens/home/components/UpcomingEventsComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import GetLocation from 'react-native-get-location';
import ApiEvent from '../apis/eventApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetDateTime} from '../utils/getTime';
interface Props {
  curruntLocation:{latitude:number , longitude:number}
}
const NearYouItemComponent = (props: Props) => {
  const {curruntLocation} = props;



  const [dataEventNearYou, setdataEventNearYou] = useState<EventModel[]>([]);
  useEffect(() => {
      console.log(curruntLocation)
      handleGetData();
  }, [curruntLocation]);


  const handleGetData = async () => {
    console.log('currunt', curruntLocation);
    try {
      if (curruntLocation) {
        const url = `/geteventbydistance?lat=${curruntLocation.latitude}&long=${
          curruntLocation.longitude
        }&distance=${5}`;
        const res = await ApiEvent.handleEventApi(url, {}, 'get');
        console.log(curruntLocation);
        setdataEventNearYou(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = (item: any) => (
    <RowComponent
      key={item.description}
      flexD="row"
      style={[
        {
          justifyContent: 'space-between',
          padding: 20,
          backgroundColor: '#ffffff',
          marginHorizontal: 20,
          borderRadius: 12,
          marginVertical: 5,
        },
        stylesnearyou.shadow,
      ]}>
      {item.imgUrl.length > 0 ? (
        <Image source={{uri: item.imgUrl}} style={stylesnearyou.image} />
      ) : (
        <View style={stylesnearyou.image}></View>
      )}
      <View
        style={{
          justifyContent: 'center',
          flexShrink: 1,
          paddingHorizontal: 10,
        }}>
        <TextComponent
          text={`${GetDateTime.handlegetDate(
            new Date(item.date),
          )} ${GetDateTime.handleGetime(item.startAt)}`}
          color={appColors.primary}
          size={12}
          font={fonts.regular}
        />
        <TextComponent
          text={item.title}
          font={fonts.medium}
          numberofline={2}
          size={15}
          styles={{width: '90%'}}
        />
        <RowComponent flexD="row" style={{alignItems: 'center'}}>
          <Location size={18} color="#747688" />
          <TextComponent
            text={item.location.adress}
            font={fonts.regular}
            color="#747688"
            size={12}
            numberofline={1}
          />
        </RowComponent>
      </View>
      
        <TouchableOpacity>
          <MaterialIcons name="bookmark" size={18} color="#EB5757" />
        </TouchableOpacity>
  
    </RowComponent>
  );

  return (
    <View>
      <UpcomingEventsComponent
        title="Nearby you"
        onpress={() => console.log('see all')}
      />

      {dataEventNearYou.map((item, index) => renderItem(item))}
    </View>
  );
};

export default NearYouItemComponent;
const stylesnearyou = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 1,
  },
  viewCard: {
    justifyContent: 'space-between',
    padding: 20,
    width: '68%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  image: {width: 80, height: 90, borderRadius: 10},
});
