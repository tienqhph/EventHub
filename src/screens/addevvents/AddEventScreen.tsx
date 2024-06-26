import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { Camera, Folder2, Link } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Image, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import authenticationApi from '../../apis/authApi';
import EventApi from '../../apis/eventApi';
import ButtonComponent from '../../components/ButtonComponent';
import ChoiseCategoryComponent from '../../components/ChoiseCategoryComponent';
import ChoiseImageComponent from '../../components/ChoiseImageComponent';
import ContainerComponent from '../../components/ContainerComponent';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import DropDownComponent, {
  Userselect,
} from '../../components/DropDownComponent';
import InputComponent from '../../components/InputComponent';
import RowComponent from '../../components/RowComponent';
import SpaceComponent from '../../components/SpaceComponent';
import { fonts } from '../../constants/fontFamily';
import { RootStack } from '../../navigators/typechecking/TypeChecking';
import { RootState } from '../../redux/store';
import ChoiseLocation from './components/ChoiseLocation';
const dataEventInit = {
  title: '',
  uids: [],
  date: new Date(),
  startAt: new Date(),
  endAt: new Date(),
  location: {
    titleadress: '',
    adress: '',
  },
  description: '',
  price: 0,
  authorId: '',
  imgUrl: '',
  category: '',
  position: {
    latitude: 0,
    longitude: 0,
  },
};
const AddEventScreen = () => {
  const [dataEvent, setdataEvent] = useState(dataEventInit);
  const navigation = useNavigation<RootStack>();
  const datauser = useSelector(
    (state: RootState) => state.authReducer.dataAuth,
  );

  const [dataUser, setdataUser] = useState<Userselect[]>([]);

  useEffect(() => {
    handleGetlocationEvnt();
  }, [dataEvent.location.adress]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('auth');

      if (data) {
        const dataparse = JSON.parse(data);
        hanleChangeValue('authorId', dataparse.data.iduser);
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    handleGetAllUser();
  }, []);
  const handleGetlocationEvnt = async () => {
    const data = await AsyncStorage.getItem('locationevent');
    if (data) {
      const reversedata = JSON.parse(data);

      console.log(reversedata);
      hanleChangeValue('position', reversedata);
    }
  };
  const handleGetAllUser = async () => {
    try {
      const res = await authenticationApi.handleAuthentication(
        '/getalluser',
        datauser,
        'get',
      );

      setdataUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const hanleChangeValue = (key: string, val: any) => {
    const datacopy: any = {...dataEvent};

    datacopy[`${key}`] = val;
    setdataEvent(datacopy);
  };

  const handleAddnewEvent = async () => {
    console.log(dataEvent);
    try {
      const res = await EventApi.handleEventApi('/addevent', dataEvent, 'post');
      console.log(res);
      if (res) {
        navigation.navigate('ExploreScreen');
        setdataEvent(dataEventInit);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dataChoiseSlectImage = [
    {
      key: 'camera',
      title: 'Take a picture',
      icon: <Camera size={20} color="black" />,
    },
    {
      key: 'libary',
      title: 'From libary',
      icon: <Folder2 size={20} color="black" />,
    },
    {
      key: 'url',
      title: 'From url',
      icon: <Link size={20} color="black" />,
    },
  ];

  const checkTypeImage = async (val: any) => {
    console.log('val data image ', val);
    if (typeof val === 'object') {
      const type = val.path.split('.');
      const filename = `${val.modificationDate ?? `image-${Date.now()}`}.${
        type[type.length - 1]
      }`;
      const path = `images/${filename}`;

      const reference = storage().ref(path).putFile(val.path);
      reference.on(
        'state_changed',
        taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        },
        error => {
          console.log(error);
        },
        () => {
          storage()
            .ref(path)
            .getDownloadURL()
            .then(data => hanleChangeValue('imgUrl', data));
        },
      );
    } else {
      hanleChangeValue('imgUrl', val);
    }
  };

  return (
    <ContainerComponent title="Add new " styles={{padding: 10}} isScoll>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />

      {dataEvent.imgUrl.length > 0 ? (
        <Image
          source={{uri: dataEvent.imgUrl}}
          style={{width: '100%', height: 200}}
          resizeMode="cover"
        />
      ) : (
        <></>
      )}
      <SpaceComponent height={10} />
      <ChoiseImageComponent
        onchage={val => checkTypeImage(val)}
        data={dataChoiseSlectImage}
        lable="Choise your image"
      />
      <InputComponent
        onChange={val => hanleChangeValue('title', val)}
        value={dataEvent.title}
        pleaceHolder="title"
      />
      <InputComponent
        onChange={val => hanleChangeValue('description', val)}
        value={dataEvent.description}
        pleaceHolder="description"
      />
      <InputComponent
        onChange={val =>
          hanleChangeValue('location', {
            ...dataEvent.location,
            titleadress: val,
          })
        }
        value={dataEvent.location.titleadress}
        pleaceHolder="title adress"
      />
      <InputComponent
        onChange={val => hanleChangeValue('price', Number(val))}
        keyBoardType="number-pad"
        value={dataEvent.price.toString()}
        pleaceHolder="Price"
      />

      <RowComponent flexD="row">
        <DateTimePickerComponent
          type="time"
          onchange={val => hanleChangeValue('startAt', val)}
        />
        <SpaceComponent width={10} />
        <DateTimePickerComponent
          type="time"
          onchange={val => hanleChangeValue('endAt', val)}
        />
      </RowComponent>
      <DateTimePickerComponent
        type="date"
        onchange={val => hanleChangeValue('date', val)}
      />
      <ChoiseLocation
        value={
          dataEvent.location.adress.length > 0
            ? dataEvent.location.adress
            : 'choiseYour location'
        }
        onchange={val => {
          if (typeof val === 'string') {
            hanleChangeValue('location', {...dataEvent.location, adress: val});
          }
        }}
        onchaneLatandLong={val => console.log(val)}
      />
      <DropDownComponent
        onselected={val => hanleChangeValue('uids', val)}
        dataconfirm={dataEvent.uids}
        select={dataEvent.uids}
        multible
        values={dataUser}
      />

      <ChoiseCategoryComponent
        onSlected={val => hanleChangeValue('category', val)}
        dataselect={dataEvent.category}
      />
      <ButtonComponent
        text="Add new Event"
        type="primary"
        textColor="white"
        onPress={handleAddnewEvent}
        styles={{bottom: 10}}
        textStyle={{fontSize: 16, fontFamily: fonts.bold}}
      />
    </ContainerComponent>
  );
};

export default AddEventScreen;
