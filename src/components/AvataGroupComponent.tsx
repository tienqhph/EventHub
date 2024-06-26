import React from 'react';
import { View } from 'react-native';
import { appColors } from '../constants/appColors';
import TextComponent from './TextComponent';
interface Props {
  uids: string[];
}
const AvataGroupComponent = (props: Props) => {
  const {uids} = props;
  return (
    <View style={{flexDirection: 'row'}}>
      {uids.map(
        (data, index) =>
          index < 3 && (
            <View
              key={index}
              style={{
                width: 24,
                marginRight: index < 2 ? -10 : 0,
                height: 24,
                borderRadius: 12,
                backgroundColor: 'cyan',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextComponent text="T" />
            </View>
          ),
      )}
      {uids.length > 3 && (
        <View>
          <TextComponent
            text={`+${uids.length - 3} Going`}
            color={appColors.primary}
          />
        </View>
      )}
    </View>
  );
};

export default AvataGroupComponent;
