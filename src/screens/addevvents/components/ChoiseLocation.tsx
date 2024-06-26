import { ArrowRight2, Location } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import RowComponent from '../../../components/RowComponent';
import TextComponent from '../../../components/TextComponent';
import { appColors } from '../../../constants/appColors';
import LocationModal from '../../../modals/LocationModal';
import { style } from '../../../styles/globalStyle';
interface Props {
  value: string;
  onchange: (
    val:
      | string
      | {
          latidue: number;
          longtidue: number;
        },
  ) => void;

  onchaneLatandLong: (val: {latidue: number; longtidue: number}) => void;
}
const ChoiseLocation = ({onchange, onchaneLatandLong, value}: Props) => {
  const [isvisiblemodal, setisvisiblemodal] = useState(false);
  const [dataAdress, setdataAdress] = useState('');
  const [dataLatandLong, setdataLatandLong] = useState<{
    latidue: number;
    longtidue: number;
  }>();
  useEffect(() => {
    onchange(dataAdress);
  }, [dataAdress]);
  useEffect(() => {
    if (dataLatandLong) {
      onchaneLatandLong(dataLatandLong);
    }
  }, [dataLatandLong]);
  return (
    <>
      <RowComponent
        onpress={() => setisvisiblemodal(!isvisiblemodal)}
        flexD="row"
        style={[style.inputcontainer]}>
        <RowComponent flexD="row" style={{flex: 1}}>
          <Location size={20} color={appColors.primary} variant="Bold" />

          <TextComponent numberofline={1} text={dataAdress} />
        </RowComponent>
        <ArrowRight2 size={20} color="gray" />
      </RowComponent>
      <LocationModal
        onchangeLatandLong={val => {
          setdataLatandLong(val);
          console.log('val choise location', val);
        }}
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
