import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {appInfor} from '../../constants/const';
import InputComponent from '../../components/InputComponent';
import {
  ArrowCircleLeft,
  ArrowCircleLeft2,
  ArrowLeft2,
} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStack} from '../../navigators/typechecking/TypeChecking';
import RowComponent from '../../components/RowComponent';
import TextComponent from '../../components/TextComponent';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {appColors} from '../../constants/appColors';
import FilterDataComponent from '../home/components/FilterDataComponent';
const MapScreens = () => {
  const navigation = useNavigation<RootStack>();
  return (
    <View>
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
      <View style = {{paddingLeft:20}}>
      <FilterDataComponent onpress={(val)=>console.log('' , val)} textcolor='gray'  coloricon bgcolorcolor={appColors.white}/>
      </View>
    </View>
  );
};

export default MapScreens;
