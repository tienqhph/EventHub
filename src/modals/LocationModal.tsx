import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  SearchNormal1
} from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Mapview, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';
import RowComponent from '../components/RowComponent';
import TextComponent from '../components/TextComponent';
import { appInfor } from '../constants/const';
import { fonts } from '../constants/fontFamily';
import { LocationModel } from '../models/LoactionModel';
interface Props {
  isvisibal: boolean;
  onclose?: () => void;
  onchange: (val: string) => void;
  onchangeLatandLong: (val: {latidue: number; longtidue: number}) => void;
  data?: string;
}
const LocationModal = ({
  isvisibal,
  onchange,
  onclose,
  data,
  onchangeLatandLong,
}: Props) => {
  const [dataSearchkey, setdataSearchkey] = useState('');
  const [locationMarker, setlocationMarker] = useState<{
    latitude: number;
    longitude: number;
  }>();

  const [dataAdress, setdataAdress] = useState('');

  const [currentLocation, setcurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({latitude: 0, longitude: 0});
  const [dataLocation, setdataLocation] = useState<LocationModel[]>([]);
  useEffect(() => {
    if (!dataSearchkey) {
      setdataLocation([]);
    }
  }, [dataSearchkey]);
  const handleGetLocation = async () => {
    const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${dataSearchkey}&limit=10&apiKey=2YCjv-SMnzb4qtnQht5NwFpqg_XO7mCMTZymdE2jfYY`;
    try {
      const res = await axios.get(api);
      if (res.data.items) {
        setdataLocation(res.data.items);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isvisibal) {
      handleGetdataLatAndLong();
    }
  }, [isvisibal]);

  // useEffect(() => {
  //   handleReverseAdressToLocation();
  // }, [dataAdress]);
  // const handleReverseAdressToLocation = async () => {
  //   const url = `https://rsapi.goong.io/geocode?address=${dataAdress}&api_key=FebmVoxfgAOnN5HzUwbFl2bYJgVt1zXBwTOPVYRA`;
  //   try {
  //     const res: any = await axios.get(url);

  //     console.log(res.data.results[0].geometry.location);
  //     if (res) {
  //       setlocationMarker({
  //         latitude: res.data.results[0].geometry.location.lat,
  //         longitude: res.data.results[0].geometry.location.lng,
  //       });
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };
  const handleGetdataLatAndLong = async () => {
    const data = await AsyncStorage.getItem('datalocation');
    const dataparse = data != null ? JSON.parse(data) : null;
    if (dataparse) {
      setlocationMarker(dataparse);
    }
  };

  const RenderDataLocation = (item: LocationModel) => {
    return (
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => {
          setdataAdress(item.title);
          setdataSearchkey('');
        }}>
        <TextComponent text={item.title} color="gray" />
      </TouchableOpacity>
    );
  };

  const handleConfirm = () => {
    onclose;
    console.log('vao dday');
  };

  const handleRevLatandLong = async (e: any) => {
    setlocationMarker(e.nativeEvent.coordinate);
    console.log(e.nativeEvent.coordinate);
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${e.nativeEvent.coordinate.latitude}%2C${e.nativeEvent.coordinate.longitude}&lang=vi-US&apiKey=${process.env.APIKEY_HERAAPI}`;
    const res = await axios
      .get(url)
      .then(respon => {
        setdataAdress(respon.data.items[0].title);
      })
      .catch(error => console.log(error));
  };
  return (
    <Modal visible={isvisibal} animationType="slide" style={{}}>
      <Mapview
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{
          width: appInfor.sizes.WIDTH,
          height: appInfor.sizes.HEIGHT,
          position: 'absolute',
        }}
        onPress={item => {
          console.log(item.nativeEvent.coordinate);
          setlocationMarker({
            latitude: item.nativeEvent.coordinate.latitude,
            longitude: item.nativeEvent.coordinate.longitude,
          });
        }}
        region={{
          latitude: locationMarker ? locationMarker.latitude : 21.0518641,
          longitude: locationMarker ? locationMarker.longitude : 105.7425046,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsPointsOfInterest
        initialRegion={{
          latitude: locationMarker ? locationMarker.latitude : 21.0518641,
          longitude: locationMarker ? locationMarker.longitude : 105.7425046,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsScale>
        <Marker
          draggable
          onDragEnd={e => handleRevLatandLong(e)}
          coordinate={
            locationMarker ? locationMarker : currentLocation && currentLocation
          }
          description="đâsd"
          image={{uri: 'https://cdn-icons-png.flaticon.com/128/684/684908.png'}}
        />
      </Mapview>
      <RowComponent
        flexD="row"
        style={{padding: 10, alignItems: 'center', alignContent: 'center'}}>
        <InputComponent
          styles={{flex: 1, marginBottom: 0, backgroundColor: 'white'}}
          onChange={val => setdataSearchkey(val)}
          value={dataSearchkey}
          affix={<SearchNormal1 size={20} color="gray" />}
          pleaceHolder="Search Adress"
          onendEditing={handleGetLocation}
        />
        <ButtonComponent
          text="Cancle"
          type="link"
          styles={{}}
          onPress={onclose}
        />
      </RowComponent>
      {dataSearchkey ? (
        dataLocation.length > 0 ? (
          <FlatList
            style={{backgroundColor: 'white'}}
            data={dataLocation}
            renderItem={({item}) => (
              <RenderDataLocation
                address={item.address}
                highlights={item.highlights}
                id={item.id}
                language={item.language}
                localityType={item.localityType}
                resultType={item.resultType}
                title={item.title}
                key={item.id}
              />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <TextComponent text="" color="gray" styles={{padding: 10}} />
        )
      ) : (
        <TextComponent text="" color="gray" styles={{padding: 10}} />
      )}
      <View
        style={{
          bottom: 10,
          position: 'absolute',
          left: 0,
          right: 0,
          padding: 20,
        }}>
        <ButtonComponent
          onPress={async () => {
            onchange(dataAdress);
            if (locationMarker) {
              await AsyncStorage.setItem(
                'locationevent',
                JSON.stringify(locationMarker),
              );
              onchangeLatandLong({
                latidue: locationMarker.latitude,
                longtidue: locationMarker.longitude,
              });
            }
          }}
          text="Confirm"
          textColor="white"
          textStyle={{fontFamily: fonts.bold}}
          styles={{}}
          type="primary"
        />
      </View>
    </Modal>
  );
};

export default LocationModal;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
  },
});
