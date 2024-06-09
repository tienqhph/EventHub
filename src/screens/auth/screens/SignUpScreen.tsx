import {
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  People,
  Personalcard,
  PresentionChart,
  Sms,
  User,
} from 'iconsax-react-native';
import {appColors} from '../../../constants/appColors';
import {fonts} from '../../../constants/fontFamily';
import ButtonComponent from '../../../components/ButtonComponent';
import ForgotPassComponent from '../Components/ForgotPassComponent';
import InputComponent from '../../../components/InputComponent';
import TextComponent from '../../../components/TextComponent';
import {image} from '../../../constants/const';
import {styles} from '../style';
import LoginWithOther from '../Components/LoginWithOther';
import {useNavigation} from '@react-navigation/native';
import {RootStack} from '../../../navigators/typechecking/TypeChecking';
import LoadingModal from '../../../modals/LoadingModal';
import authenticationApi from '../../../apis/authApi';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../redux/store';
import {addAuth} from '../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialValue = {
  fullname: '',
  email: '',
  password: '',
  confirmpassword: '',
};
const SignUpScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<RootStack>();
  const [dataSignup, setDataSignup] = useState(initialValue);

  const [textError, setTextError] = useState('');

  const [visiableModal, setvisiableModal] = useState(false);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...dataSignup};
    data[`${key}`] = value;

    setDataSignup(data);
  };

  const hanldleSignup = async () => {
    if (
      dataSignup.fullname.length > 0 &&
      dataSignup.email.length > 0 &&
      dataSignup.password.length > 0 &&
      dataSignup.confirmpassword.length > 0
    ) {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(dataSignup.email) == true) {
        setvisiableModal(true);
        if (dataSignup.password.includes(dataSignup.confirmpassword)) {
          setTextError('');
              setvisiableModal(true)
          try {
            const res = await authenticationApi.handleAuthentication(
              '/verification',
              {email: dataSignup.email},
              'post',
            );
              setvisiableModal(false)
            if(res.data){

              
              navigation.navigate('VerificationScreen' , {code:res.data.code , email:dataSignup.email ,passworrd:dataSignup.password , fullname:dataSignup.fullname??""})
            }
          } catch (error) {}

          setvisiableModal(false);
          
        } else {
          setTextError('mật khẩu không trùng khớp ');
          setvisiableModal(false);
        }
      } else {
        setTextError('vui lòng nhập đúng định dạng email');
        setvisiableModal(false);
      }
    } else {
      setTextError('vui lòng nhập đầy đủ thông tin');
      setvisiableModal(false);
    }
  };
  return (
    <ImageBackground
      style={[styles.constainerLoginScreen]}
      source={image.image_background}>
      <StatusBar translucent backgroundColor="transparent" />

      <TouchableOpacity onPress={() => navigation.pop()}>
        <ArrowLeft size={22} color={appColors.back} />
      </TouchableOpacity>

      <TextComponent
        tilte
        text="Sign up"
        styles={{color: '#120D26', paddingVertical: 24}}
      />
      <InputComponent
        affix={<User size={22} color={appColors.gray}></User>}
        value={dataSignup.fullname}
        onChange={val => handleChangeValue('fullname', val)}
        pleaceHolder="Full name"
      />
      <InputComponent
        affix={<Sms size={22} color={appColors.gray}></Sms>}
        value={dataSignup.email}
        onChange={val => handleChangeValue('email', val)}
        pleaceHolder="abc@gmail.com"
      />
      <InputComponent
        isPassword
        affix={<Lock size={22} color={appColors.gray}></Lock>}
        value={dataSignup.password}
        onChange={val => handleChangeValue('password', val)}
        pleaceHolder="Your Password"
      />
      <InputComponent
        isPassword
        affix={<Lock size={22} color={appColors.gray}></Lock>}
        value={dataSignup.confirmpassword}
        onChange={val => handleChangeValue('confirmpassword', val)}
        pleaceHolder="Confirm Password"
      />
      {textError.length > 0 ? <TextComponent text={textError} /> : null}
      <ButtonComponent
        styles={{marginHorizontal: 40, marginVertical: 24}}
        flexIcon="reight"
        text="SIGN UP"
        type="primary"
        onPress={hanldleSignup}
        textColor={appColors.white}
        textStyle={{
          fontFamily: fonts.bold,
          flex: 1,
          alignItems: 'center',
          textAlign: 'center',
        }}
        icon={<ArrowRight size={22} color={appColors.white} />}
      />

      <LoginWithOther text="Sign in" />

      <LoadingModal isvisiable={visiableModal} />
    </ImageBackground>
  );
};

export default SignUpScreen;
