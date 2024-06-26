import React, { ReactNode } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
interface Props {
  onpress?: () => void;
  icon: ReactNode;
  color?: string;
  style?: StyleProp<ViewStyle>;
}
const IconComponent = (props: Props) => {
  const {icon, color, style, onpress} = props;
  return onpress ? (
    <TouchableOpacity
      style={[
        {
          width: 48,
          height: 48,
          backgroundColor: '#EAEDFF',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
        },
        style,
      ]}>
      {icon}
    </TouchableOpacity>
  ) : (
    <View
      style={[
        {
          width: 48,
          height: 48,
          backgroundColor: '#EAEDFF',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
        },
        style,
      ]}>
      {icon}
    </View>
  );
};

export default IconComponent;
