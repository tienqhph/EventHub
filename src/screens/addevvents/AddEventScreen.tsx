import {View, Text, StatusBar} from 'react-native';
import React, {useState} from 'react';
import InputComponent from '../../components/InputComponent';
import ContainerComponent from '../../components/ContainerComponent';
import ButtonComponent from '../../components/ButtonComponent';
import {fonts} from '../../constants/fontFamily';
import ChoiseLocation from './components/ChoiseLocation';

const dataEventInit = {
  title: '',
  uids: [],
  date: '',
  time: '',
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

  const hanleChangeValue = (key: string, val: any) => {
    const datacopy: any = {...dataEvent};

    datacopy[`${key}`] = val;
    setdataEvent(datacopy);
  };
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
      <ChoiseLocation />
      <ButtonComponent
        text="Add new Event"
        type="primary"
        textColor="white"
        onPress={() => console.log('vaoddaay', dataEvent)}
        textStyle={{fontSize: 16, fontFamily: fonts.bold}}
      />
    </ContainerComponent>
  );
};

export default AddEventScreen;
