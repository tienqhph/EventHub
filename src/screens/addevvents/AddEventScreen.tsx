import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputComponent from '../../components/InputComponent';
import ContainerComponent from '../../components/ContainerComponent';
import ButtonComponent from '../../components/ButtonComponent';
import {fonts} from '../../constants/fontFamily';
import ChoiseLocation from './components/ChoiseLocation';
import RowComponent from '../../components/RowComponent';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import SpaceComponent from '../../components/SpaceComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ApiEvent from '../../apis/eventApi';
import authenticationApi from '../../apis/authApi';

const dataEventInit = {
  title: '',
  uids: [],
  date: new Date(),
  startAt: new Date(),
  endAt: new Date(),
  location: {
    title: '',
    adress: '',
  },
  description: '',
  authorId: '',
  imgUrl: '',
};
const AddEventScreen = () => {
  const [dataEvent, setdataEvent] = useState(dataEventInit);
  const datauser = useSelector((state :RootState)=> state.authReducer.dataAuth) 

  useEffect(() => {
     if(dataEvent){
      hanleChangeValue('authorId' , datauser.id)
     }
  }, [datauser]);
  const hanleChangeValue = (key: string, val: any) => {
    const datacopy: any = {...dataEvent};
   
    datacopy[`${key}`] = val;
    setdataEvent(datacopy);
  };

  const handleAddnewEvent = async()=>{
    console.log('vaoddaay', dataEvent)
  try {
    const res = await  authenticationApi.handleAuthentication('/getalluser' ,datauser,'get' )
    console.log(res)
  } catch (error) {
    console.log(error)
  }
  }
  return (
    <ContainerComponent title="Add new " styles={{padding: 10}}>
      <StatusBar translucent barStyle={'dark-content'} />
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
          hanleChangeValue('location', {...dataEvent.location, title: val})
        }
        value={dataEvent.location.title}
        pleaceHolder="title adress"
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
      <ChoiseLocation onchange={val => hanleChangeValue('location', val)} />
      <ButtonComponent
        text="Add new Event"
        type="primary"
        textColor="white"
        onPress={handleAddnewEvent}
        textStyle={{fontSize: 16, fontFamily: fonts.bold}}
      />
    </ContainerComponent>
  );
};

export default AddEventScreen;
