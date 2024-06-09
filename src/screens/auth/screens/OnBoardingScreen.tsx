import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {style} from '../../../styles/globalStyle';
import Swiper from 'react-native-swiper';
import {appInfor, image} from '../../../constants/const';
import {appColors} from '../../../constants/appColors';
import {useNavigation} from '@react-navigation/native';
import {RootStack} from '../../../navigators/typechecking/TypeChecking';

const OnBoardingScreen = () => {
  const [indexSwiper, setIndexSwiper] = useState(0);
  const navigation = useNavigation<RootStack>();
  return (
    <View style={[style.container]}>
      <Swiper
        loop={false}
        index={indexSwiper}
        activeDotColor={appColors.white}
        onIndexChanged={num => setIndexSwiper(num)}>
        <Image
          source={image.image_onboarding_1}
          style={{
            flex: 1,
            width: appInfor.sizes.WIDTH,
            height: appInfor.sizes.HEIGHT,
          }}
        />
        <Image
          source={image.image_onboarding_2}
          style={{
            flex: 1,
            width: appInfor.sizes.WIDTH,
            height: appInfor.sizes.HEIGHT,
          }}
        />
        <Image
          source={image.image_onboarding_3}
          style={{
            flex: 1,
            width: appInfor.sizes.WIDTH,
            height: appInfor.sizes.HEIGHT,
          }}
        />
      </Swiper>

      <View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 12,
            paddingVertical: 16,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          },
        ]}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            indexSwiper < 2
              ? setIndexSwiper(indexSwiper + 1)
              : navigation.navigate('LoginScreen')
          }>
          <Text>next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingScreen;
