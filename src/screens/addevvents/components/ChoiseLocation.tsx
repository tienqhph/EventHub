import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import RowComponent from '../../../components/RowComponent';
import TextComponent from '../../../components/TextComponent';
import {appColors} from '../../../constants/appColors';
import {style} from '../../../styles/globalStyle';
import {ArrowRight, ArrowRight2, Location} from 'iconsax-react-native';
import LocationModal from '../../../modals/LocationModal';
interface Props {
  onchange: (
    val:
      | string
      | {
          title: string;
          adress: string;
        },
  ) => void;

  onchaneLatandLong: (val: {latidue?: number; longtidue?: number}) => void;
}
const ChoiseLocation = ({onchange, onchaneLatandLong}: Props) => {
  const [isvisiblemodal, setisvisiblemodal] = useState(false);
  const [dataAdress, setdataAdress] = useState('');
  const [dataLatandLong, setdataLatandLong] = useState<{
    latidue: number;
    longtidue: number;
  }>();
  useEffect(() => {
    onchange({
      title: '',
      adress: dataAdress,
    });
    onchaneLatandLong({
      latidue: dataLatandLong?.latidue,
      longtidue: dataLatandLong?.longtidue,
    });
  }, [dataAdress]);

  return (
    <>
      <RowComponent
        onpress={() => setisvisiblemodal(!isvisiblemodal)}
        flexD="row"
        style={[style.inputcontainer]}>
        <RowComponent flexD="row" style={{flex: 1}}>
          <Location size={20} color={appColors.primary} variant="Bold" />

          <TextComponent
            numberofline={1}
            text={dataAdress ? dataAdress : 'Choise your event location'}
          />
        </RowComponent>
        <ArrowRight2 size={20} color="gray" />
      </RowComponent>
      <LocationModal
        onchangeLatandLong={val => setdataLatandLong(val)}
        data={dataAdress.length > 0 ? dataAdress : ''}
        isvisibal={isvisiblemodal}
        onclose={() => setisvisiblemodal(false)}
        onchange={val => {
          setdataAdress(val);
          setisvisiblemodal(false);
        }}
      />
    </>
  );
};

export default ChoiseLocation;
