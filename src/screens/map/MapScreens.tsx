import {useNavigation} from '@react-navigation/native';
import {ArrowLeft2, Bookmark, Location} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ApiEvent from '../../apis/eventApi';
import InputComponent from '../../components/InputComponent';
import RowComponent from '../../components/RowComponent';
import SpaceComponent from '../../components/SpaceComponent';
import TextComponent from '../../components/TextComponent';
import {appColors} from '../../constants/appColors';
import {appInfor, icon} from '../../constants/const';
import {fonts} from '../../constants/fontFamily';
import {RootStack} from '../../navigators/typechecking/TypeChecking';
import {GetDateTime} from '../../utils/getTime';
import FilterDataComponent from '../home/components/FilterDataComponent';
const MapScreens = () => {
  const navigation = useNavigation<RootStack>();
  const [curruntLocation, setcurruntLocation] = useState<{
    latidue: number;
    longtidue: number;
  }>();

  const [dataEventByDistance, setdataEventByDistance] = useState<EventModel[]>(
    [],
  );

  const [dataCategory, setdataCategory] = useState('');
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        console.log(location);
        setcurruntLocation({
          latidue: location.latitude,
          longtidue: location.longitude,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  
  const handleGetData = async () => {
    console.log(curruntLocation);
    try {
      if (curruntLocation) {
        const url = `/geteventbydistance?lat=${curruntLocation?.latidue}&long=${
          curruntLocation?.longtidue
        }&distance=${5}`;
        const res = await ApiEvent.handleEventApi(url, {}, 'get');

        console.log(res.data);
        setdataEventByDistance(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RenderItem = ({category}: {category: string}) => {
    console.log(category);
    switch (category) {
      case 'Sports':
        return (
          <View style={style.bg_imag_category}>
            <MaterialIcons
              name="sports-basketball"
              size={20}
              color={appColors.white}
            />
          </View>
        );

      case 'Music':
        return (
          <View style={[style.bg_imag_category, {backgroundColor: '#F59762'}]}>
            <FontAwesome name="music" size={20} color={appColors.white} />
          </View>
        );

      case 'Food':
        return (
          <View style={[style.bg_imag_category, {backgroundColor: '#29D697'}]}>
            <Image
              source={icon.icon_knife}
              tintColor={appColors.white}
              style={{width: 20, height: 20}}
            />
          </View>
        );

      case 'Art':
        return (
          <View style={[style.bg_imag_category, {backgroundColor: '#46CDFB'}]}>
            <MaterialCommunityIcons
              name="draw"
              size={20}
              color={appColors.white}
            />
          </View>
        );

      default:
        return (
          <View>
            <Text>0</Text>
          </View>
        );
    }
  };
  const RenderItemEvent = ({
    image,
    adress,
    date,
    title,
    time,
  }: {
    image: string;
    title: string;
    adress: string;
    date: string;
    time: string;
  }) => {
    return (
      <TouchableOpacity style={style.styleitem}>
        <RowComponent flexD="row" style={{alignItems: 'flex-start'}}>
          {image ? (
            <Image
              source={{
                uri: image
                  ? image
                  : 'https://img.freepik.com/premium-photo/there-is-crescent-with-flowers-moon-background-generative-ai_733139-18521.jpg',
              }}
              style={{width: 80, borderRadius: 20, height: 90}}
            />
          ) : (
            <View style={{width: 80, borderRadius: 20, height: 90}}></View>
          )}
          <View
            style={{
              flex: 1,
              height: '100%',
              justifyContent: 'space-evenly',
              paddingHorizontal: 12,
            }}>
            <RowComponent flexD="row">
              <TextComponent
                text={date}
                color={appColors.primary}
                size={12}
                numberofline={1}
              />
              <SpaceComponent width={5} />
              <TextComponent
                text={time}
                color={appColors.primary}
                size={12}
                numberofline={1}
              />
            </RowComponent>
            <TextComponent text={title} numberofline={2} />
            <RowComponent flexD="row" style={{alignItems: 'center'}}>
              <Location size={14} color="gray" variant="Bold" />
              <TextComponent
                text={adress}
                numberofline={1}
                size={12}
                font={fonts.regular}
              />
            </RowComponent>
          </View>
          <Bookmark size={20} color="red" variant="Bold" />
        </RowComponent>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <MapView
        showsMyLocationButton={false}
        showsUserLocation
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{
          width: appInfor.sizes.WIDTH,
          height: appInfor.sizes.HEIGHT,
          position: 'absolute',
        }}
        region={{
          latitude: 21.0518641,
          longitude: 105.7425046,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(val: any) => console.log(val.nativeEvent.coordinate)}
        showsPointsOfInterest
        initialRegion={{
          latitude: 21.0518641,
          longitude: 105.7425046,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsScale>
        {dataEventByDistance.length > 0 ? (
          dataEventByDistance.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: item.position.latitude,
                longitude: item.position.longitude,
              }}
              title={item.title}>
              <ImageBackground
                source={require('./../../assets/images/Union.png')}
                style={{
                  height: 35,
                  width: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <RenderItem category={item.category} key={index} />
              </ImageBackground>
            </Marker>
          ))
        ) : (
          <></>
        )}
      </MapView>

      <View style={{paddingHorizontal: 20, paddingTop: 40}}>
        <RowComponent flexD="row">
          <InputComponent
            affix={
              <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}>
                <ArrowLeft2 size={20} color="gray" />
              </TouchableOpacity>
            }
            pleaceHolder="Search"
            value=""
            onChange={val => console.log(val)}
            styles={{flex: 1, backgroundColor: 'white'}}
          />
          <TouchableOpacity
            onPress={handleGetData}
            style={{
              width: 56,
              height: 56,
              backgroundColor: '#ffffff',
              borderRadius: 10,
              marginLeft: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome6
              name="location-crosshairs"
              size={20}
              color={appColors.gray}
            />
          </TouchableOpacity>
        </RowComponent>
      </View>
      <View style={{paddingLeft: 20}}>
        <FilterDataComponent
          onpress={val => setdataCategory(val)}
          textcolor="gray"
          coloricon
          bgcolorcolor={appColors.white}
        />
      </View>
      <View style={style.containerViewItem}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{}}
          data={dataEventByDistance}
          horizontal
          renderItem={({item}) => (
            <RenderItemEvent
              adress={item.location.adress}
              date={`${GetDateTime.handlegetDate(item.date)}`}
              image={item.imgUrl}
              time={`${GetDateTime.handleGetime(item.startAt)}`}
              title={item.title}
            />
          )}
        />
      </View>
    </View>
  );
};

export default MapScreens;
const style = StyleSheet.create({
  bg_imag_category: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,

    width: 25,
    height: 25,
    backgroundColor: '#F0635A',
  },
  containerViewItem: {
    position: 'absolute',
    bottom: 25,
    marginHorizontal: 20,
    width: '100%',
    height: 106,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleitem: {
    backgroundColor: '#FFFFFF',
    width: 327,
    padding: 12,
    marginHorizontal: 14,
    justifyContent: 'center',
    height: '100%',
    borderRadius: 20,
  },
});
