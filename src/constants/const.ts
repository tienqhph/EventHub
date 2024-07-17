import {ReactNode} from 'react';
import {Dimensions} from 'react-native';

export const image = {
  image_background: require('./../assets/images/splash-screen.png'),
  image_logo: require('./../assets/images/logo.png'),
  image_txtlogo: require('./../assets/images/txtlogo.png'),
  image_onboarding_1: require('./../assets/images/Onboarding_1.png'),
  image_onboarding_2: require('./../assets/images/Onboarding_2.png'),
  image_onboarding_3: require('./../assets/images/Onboarding_3.png'),
};

export const icon = {
  iconhome: require('./../assets/images/icon-facebook.png'),
  add_box: require('./../assets/images/add_box.png'),
  icon_knife: require('./../assets/images/knife.png'),
};
export const iconApp = {
  icon_facebook: require('./../assets/images/icon-facebook.png'),
  icon_google: require('./../assets/images/icon-google.png'),
};

export const appInfor = {
  sizes: {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
  },
  weekName: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  URL: 'http://10.215.22.44:3001',
  month: [
    'January',
    'February ',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};
