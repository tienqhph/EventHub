import { Location } from 'iconsax-react-native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { appColors } from '../constants/appColors';
import { fonts } from '../constants/fontFamily';
import UpcomingEventsComponent from '../screens/home/components/UpcomingEventsComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
interface Props {
  image?: string;
  time?: string;
  title?: string;
  address?: string;
  isBookmark?: boolean;
}
const NearYouItemComponent = (props: Props) => {
  const {address, image, isBookmark, time, title} = props;
  return (
    <View>
      <UpcomingEventsComponent
        title="Nearby you"
        onpress={() => console.log('see all')}
      />

      <RowComponent
        flexD="row"
        style={[
          {
            justifyContent: 'space-between',
            padding: 20,
            backgroundColor: '#ffffff',
            marginHorizontal: 20,
            borderRadius: 12,
          },
          stylesnearyou.shadow,
        ]}>
        <Image
          source={require('./../assets/images/imageevnts.png')}
          style={{width: 80, height: 90, borderRadius: 10}}
        />
        <View
          style={{
            justifyContent: 'center',
            flexShrink: 1,
            paddingHorizontal: 10,
          }}>
          <TextComponent
            text={time ? time : ''}
            color={appColors.primary}
            font={fonts.regular}
          />
          <TextComponent
            text={title ? title : ''}
            font={fonts.medium}
            numberofline={2}
            size={15}
            styles={{width: '90%'}}
          />
          <RowComponent flexD="row" style={{alignItems: 'center'}}>
            <Location size={18} color="#747688" />
            <TextComponent
              text={address ? address : ''}
              font={fonts.regular}
              color="#747688"
              numberofline={1}
            />
          </RowComponent>
        </View>
        {isBookmark ? (
          <TouchableOpacity>
            <MaterialIcons name="bookmark" size={18} color="#EB5757" />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </RowComponent>
    </View>
  );
};

export default NearYouItemComponent;
const stylesnearyou = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 1,
  },
  viewCard: {
    justifyContent: 'space-between',
    padding: 20,
    width: '68%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
