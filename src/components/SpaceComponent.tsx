import React from 'react';
import { View } from 'react-native';

interface Props {
  width?: number;
  height?: number;
}
export default function SpaceComponent(props: Props) {
  const {height, width} = props;
  return <View style={{height: height, width: width}} />;
}
