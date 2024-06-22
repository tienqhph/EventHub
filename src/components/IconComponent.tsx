import {View, Text, ViewStyle, StyleProp, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
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
