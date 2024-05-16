import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NAME_SCREENS } from "../../constants/nameNavigator";
import { RouteProp } from "@react-navigation/native";



type RootStackParamList = {
    LoginScreen:undefined , 
    HomeScreen :undefined , 
    SignupScreen:undefined  ,

    VerificationScreen:undefined,
    ResetPasswordScreen:undefined
    

  };




  export type  RootStack = NativeStackNavigationProp<RootStackParamList , NAME_SCREENS.LOGIN_SCREEN>
  
  export type  RootStackSignup = NativeStackNavigationProp<RootStackParamList , NAME_SCREENS.SIGNUP_SCREEN>



  export  type PropsRoute = RouteProp< RootStackParamList , NAME_SCREENS.HOME_SCREEN>