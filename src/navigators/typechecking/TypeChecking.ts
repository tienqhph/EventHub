import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NAME_SCREENS } from '../../constants/nameNavigator';

type RootStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  VerificationScreen:
    | undefined
    | {
        code: number;
        email: string;
        passworrd: string;
        fullname: string;
      };
  ResetPasswordScreen: undefined;
  NewPassWord_Screen:
    | undefined
    | {
        id: string;
      };
  HomeDrawerScreen: undefined;
  DetailScreen: undefined |{
    item:EventModel
  };
  HomeScreen: undefined;
  ExploreScreen: undefined;
};

export type RootStack = NativeStackNavigationProp<
  RootStackParamList,
  NAME_SCREENS.LOGIN_SCREEN
>;

export type RootStackSignup = NativeStackNavigationProp<
  RootStackParamList,
  NAME_SCREENS.SIGNUP_SCREEN
>;

export type PropsRouteVerification = RouteProp<
  RootStackParamList,
  NAME_SCREENS.VERIFICATION
>;
export type PropsRouteNewPass = RouteProp<
  RootStackParamList,
  NAME_SCREENS.NEWPASSWORD_SCREEN
>;
export type PropsRouteDetailScreen = RouteProp<
  RootStackParamList,
  NAME_SCREENS.DETAIL_SCREEN
>;
