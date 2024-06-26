import { ArrowCircleRight } from 'iconsax-react-native';
import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { fonts } from '../constants/fontFamily';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  title?: string;
  style?: StyleProp<ViewStyle>;
  onpress?: () => void;
}
const SeeAllComponent = ({title, style, onpress}: Props) => {
  return (
    <RowComponent flexD="row" style={{alignItems: 'center'}}>
      <TextComponent
        text={title ? title : ''}
        color="#120D26"
        styles={{flex: 1}}
        font={fonts.medium}
      />
      <TouchableOpacity onPress={onpress}>
        <RowComponent flexD="row">
          <TextComponent text="SeeAll" color="#747688" />
          <ArrowCircleRight size={20} color="#747688" />
        </RowComponent>
      </TouchableOpacity>
    </RowComponent>
  );
};

export default SeeAllComponent;
