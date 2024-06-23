import AsyncStorage from '@react-native-async-storage/async-storage';
import {HambergerMenu, Notification, SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {useDispatch, useSelector} from 'react-redux';
import ItemEventsComponent from '../../components/ItemEventsComponent';
import NearYouItemComponent from '../../components/NearYouItemComponent';
import RowComponent from '../../components/RowComponent';
import TextComponent from '../../components/TextComponent';
import {appColors} from '../../constants/appColors';
import {fonts} from '../../constants/fontFamily';
import {AppDispatch, RootState} from '../../redux/store';
import FilterDataComponent from './components/FilterDataComponent';
import UpcomingEventsComponent from './components/UpcomingEventsComponent';
import {styleHome} from './stylehome';
import ButtonComponent from '../../components/ButtonComponent';
import axios from 'axios';
import {AdressModel} from '../../models/AdressModel';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyBHcsobecROerAYEpmy0UnYgsyq4orC5dE');
const HomeScreen = ({navigation}: any) => {
  const dispach = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.authReducer.dataAuth);
  const [datastorage, setdataStorage] = useState<any>();
  const [datalocation, setdatalocation] = useState<{latitude:number ,longitude:number }>();
  const [dataadress, setdataadress] = useState<AdressModel>();

  useEffect(() => {
    getdataFromStorage();
 
  }, []);

  useEffect(() => {
    
    handleSaveLatAndLong()
    
  }, [datalocation]);


  const handleSaveLatAndLong = async() =>{
  if(datalocation){
    await AsyncStorage.setItem('datalocation' ,JSON.stringify(datalocation))
  }
  }
  const getdataFromStorage = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        console.log('location', location);
        location&&setdatalocation({latitude:location.latitude , longitude:location.longitude})
        hadleReverseGeolocation(location.latitude, location.longitude);
        
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
     
   
    const datastorage: any = await AsyncStorage.getItem('auth');

    const dataparse = datastorage != null ? JSON.parse(datastorage) : null;
  };
  const hadleReverseGeolocation = async (lat: number, long: number) => {
    try {
      await axios(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${long}&lang=vi-US&apiKey=2YCjv-SMnzb4qtnQht5NwFpqg_XO7mCMTZymdE2jfYY`,
      )
        .then((data: any) => {
          if (data) {
            setdataadress(data.data);
          }
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = (data: any) => {
    console.log(data);
  };

  const dataEvent = {
    title: 'International Band Music Concert',
    uids: ['dsfdsij', 'dsfjdisf'],
    date: '14 December, 2021',
    time: 'Tuesday, 4:00PM - 9:00PM',
    location: {
      title: 'Gala Convention Center',
      adress: '36 Guild Street London, UK ',
    },
    description: 'mô tả ',
    authorId: '',
    imgUrl: '',
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styleHome.containerHeader}>
        {/* viewtitle */}
        <RowComponent flexD="row" style={styleHome.viewRow}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <HambergerMenu size={25} color="white" />
          </TouchableOpacity>
          <View>
            <RowComponent
              flexD="row"
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <TextComponent
                text="Current Location"
                color="white"
                font={fonts.regular}
              />
              <TouchableOpacity style={{marginLeft: 5}}>
                <AntDesign name="caretdown" size={10} color="white" />
              </TouchableOpacity>
            </RowComponent>
            <TextComponent
              text={
                dataadress?.items[0].address.district +
                  ',' +
                  dataadress?.items[0].address.countryName ?? ''
              }
              color="white"
            />
          </View>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff1A',
            }}>
            <TouchableOpacity>
              <Notification size={20} color="white" />
              <View
                style={{
                  width: 6,
                  height: 6,
                  backgroundColor: '#02E9FE',
                  borderRadius: 3,
                  position: 'absolute',
                  right: 5,
                }}
              />
            </TouchableOpacity>
          </View>
        </RowComponent>
        {/* viewsearch */}
        <View style={styleHome.viewRow}>
          <RowComponent flexD="row">
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
              <RowComponent flexD="row" style={{alignItems: 'center'}}>
                <SearchNormal1 size={20} color="white" />
                <TextComponent
                  text="| Search..."
                  color="#ffffff33"
                  size={18}
                  styles={{paddingLeft: 5}}
                />
              </RowComponent>
            </TouchableOpacity>
            <View style={styleHome.containerButtonFilter}>
              <RowComponent flexD="row">
                <RowComponent flexD="row">
                  <View style={styleHome.viewcontainerIconFilter}>
                    <Octicons name="filter" size={16} color="#00000066" />
                  </View>
                  <TextComponent
                    text="Filters"
                    color={appColors.white}
                    font={fonts.regular}
                    styles={{paddingLeft: 5}}
                  />
                </RowComponent>
              </RowComponent>
            </View>
          </RowComponent>
        </View>
      </View>
      <View style={{marginTop: -20, marginLeft: 20}}>
        <FilterDataComponent onpress={handleFilter} />
      </View>
      <ScrollView>
        <UpcomingEventsComponent
          title="Upcoming Events"
          onpress={() => console.log('see all')}
        />

        <ItemEventsComponent dataEvent={dataEvent} />

        <View style={{paddingTop: 20, paddingHorizontal: 20}}>
          <ImageBackground
            source={require('./../../assets/images/bg_invite.png')}
            style={{
              padding: 10,
              width: '100%',
              height: 127,
              justifyContent: 'space-evenly',
            }}
            borderRadius={20}>
            <TextComponent text="Invite your friends" />
            <TextComponent text="Get $20 for ticket" font={fonts.regular} />
            <TouchableOpacity
              style={{
                backgroundColor: '#00F8FF',
                borderRadius: 12,
                width: 72,
                height: 32,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextComponent text="INVITE" color="white" />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <NearYouItemComponent
          address="36 Guild Street London, UK "
          time="1st  May- Sat -2:00 PM"
          image=""
          isBookmark
          title="International Band Music Concert"
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
