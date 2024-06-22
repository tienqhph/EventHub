import {View, Text} from 'react-native';
import React, {useState} from 'react';
import RowComponent from '../../../components/RowComponent';
import TextComponent from '../../../components/TextComponent';
import {appColors} from '../../../constants/appColors';
import {style} from '../../../styles/globalStyle';
import {ArrowRight, ArrowRight2, Location} from 'iconsax-react-native';
import LocationModal from '../../../modals/LocationModal';

const ChoiseLocation = () => {
  const [isvisiblemodal, setisvisiblemodal] = useState(false);


  return (
    <>
      <RowComponent
        onpress={() => setisvisiblemodal(!isvisiblemodal)}
        flexD="row"
        style={[style.inputcontainer]}>
        <RowComponent flexD="row" style={{flex: 1}}>
          <Location size={20} color={appColors.primary} variant="Bold" />

          <TextComponent text="New Yourk, USA" />
        </RowComponent>
        <ArrowRight2 size={20} color="gray" />
      </RowComponent>
      <LocationModal isvisibal = {isvisiblemodal} onclose={()=>setisvisiblemodal(false)} onchange={(val)=>console.log(val)}/>
    </>
  );
};

export default ChoiseLocation;
