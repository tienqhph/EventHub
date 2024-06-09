import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  PropsRouteVerification,
  RootStack,
} from '../../../navigators/typechecking/TypeChecking';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from '../style';
import {image} from '../../../constants/const';
import {ArrowLeft, ArrowRight, Sms} from 'iconsax-react-native';
import {appColors} from '../../../constants/appColors';
import TextComponent from '../../../components/TextComponent';
import InputComponent from '../../../components/InputComponent';
import ButtonComponent from '../../../components/ButtonComponent';
import {fonts} from '../../../constants/fontFamily';
import SpaceComponent from '../../../components/SpaceComponent';
import authenticationApi from '../../../apis/authApi';
import LoadingModal from '../../../modals/LoadingModal';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { addAuth } from '../../../redux/reducers/authReducer';

const VerificationScreen = () => {
  const {params} = useRoute<PropsRouteVerification>();
  const [countDown, setcountDown] = useState(60);
  const [visiableModal, setvisiableModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>()
  const [dataCode, setdataCode] = useState(params?.code);

  const [dataCodeCompare, setdataCodeCompare] = useState("");
  const [datacodeInput, setdatacodeInput] = useState<string []>([]);
  const [disableButton, setdisableButton] = useState(false);
  const [textError, settextError] = useState('');

  const ref1 = useRef<any>()
  const ref2 = useRef<any>()
  const ref3 = useRef<any>()
  const ref4 = useRef<any>()
  const navigation = useNavigation<RootStack>();



  useEffect(() => {
    
    if(countDown>0){

      const interval = setInterval(()=>{
      setcountDown(countDown => countDown-1)
      } , 1000)
      return  ()=>clearInterval(interval)
    }
   
  }, [countDown]);

  const handleChangeValueCode = ( val :string, index:number )=>{
      const datacopy = [...datacodeInput]
      datacopy [index] = val
      setdatacodeInput(datacopy)

  

  }
  useEffect(()=>{
    ref1.current.focus()
  } , [])
useEffect(() => {
    countDown>0?settextError(""):settextError("time out please Resend the code")
    countDown==0&&setdataCode(0)
}, [countDown]);
useEffect(() => {
    if(datacodeInput.length<4){
        setdisableButton(true)
    }else{
      setdisableButton(false)
    }

}, [datacodeInput.length]);

  const hanldReSendCode =async ()=>{

    settextError("")
    setvisiableModal(true)
    try {
      const res = await authenticationApi.handleAuthentication(
        '/verification',
        {email: params?.email},
        'post',
      );
        setvisiableModal(false)

        console.log(res)
        setdataCode(res.data.code)
        setcountDown(60)
 
    } catch (error) {}

    setvisiableModal(false);
  }


  useEffect(() => {
    let res = ``
      datacodeInput.forEach(data=>res+=data)
      setdataCodeCompare(res)
  }, [datacodeInput]);
  const hanldContinue = async()=>{
    setvisiableModal(true)
    console.log(dataCodeCompare , dataCode)
    
    if(parseInt(dataCodeCompare)==dataCode){
      console.log("vaof ddaay")
        const res = await authenticationApi.handleAuthentication('/regiter' , {
          email:params?.email, fullname:params?.fullname, passworrd:params?.passworrd 
        } , 'post')
          setvisiableModal(false)

          dispatch(addAuth({email:res.data.email , id:res.data.id , token:res.data.token}))
          
    }else{
      setvisiableModal(false)
      settextError("code is not correct please try again!!!")
    }

  }
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
        text="Verification"
        styles={{color: '#120D26', paddingVertical: 24}}
      />
      <TextComponent
        text={`We’ve send you the verification code on ${params?.email}`}
        styles={{color: '#120D26', paddingVertical: 24}}
      />
      <View
        style={{ width:'100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <TextInput
          style={[
            stylesVerification.textInput
          ]}
          keyboardType="numeric"
          maxLength={1}
          ref={ref1}
          value={datacodeInput[0]}

          onChangeText={(val)=> 
            { val.length>0&&ref2.current.focus()
              handleChangeValueCode(val , 0)
            }}
          placeholder="-"
        />
        <TextInput
        ref={ref2}      value={datacodeInput[1]}
          onChangeText={(val )=> {
            val.length>0&&ref3.current.focus()
            handleChangeValueCode(val , 1)
          }}
        style={[
         stylesVerification.textInput
        ]}
          keyboardType="numeric"
          maxLength={1}
          
          placeholder="-"
        />
        <TextInput
        ref={ref3}
        value={datacodeInput[2]}
          onChangeText={(val)=> { ref4.current.focus() 
            handleChangeValueCode(val , 2)
          }}
        style={[
         stylesVerification.textInput
        ]}
          keyboardType="numeric"
          maxLength={1}
          
          placeholder="-"
        />
        <TextInput
        ref={ref4}
        value={datacodeInput[3]}
        onChangeText={(val)=> handleChangeValueCode(val , 3)}
        style={[
         stylesVerification.textInput
        ]}
          keyboardType="numeric"
          maxLength={1}
          
          placeholder="-"
        />
      </View>
          <SpaceComponent height={20}/>
          <ButtonComponent
          disable = {disableButton}
        styles={{marginHorizontal: 40, marginVertical: 24}}
        flexIcon="reight"
        text="Continue"
        type="primary"
        onPress={hanldContinue}
        textColor={appColors.white}
        textStyle={{
          fontFamily: fonts.bold,
          flex: 1,
          alignItems: 'center',
          textAlign: 'center',
        }}
        icon={<ArrowRight size={22} color={appColors.white} />}
      />

     
      {
        countDown>0?      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TextComponent
          text="Re-send code in"
          styles={{color: '#120D26', paddingVertical: 24}}
        />
        <TextComponent
          text={`00:${countDown}`}
          styles={{color: appColors.primary, paddingHorizontal: 12}}
        />
      </View>:<View style = {{alignItems:'center'  ,justifyContent:'center'}}>
      <TextComponent text={textError} color='red' styles = {{textAlign:'center'}}/>
      <ButtonComponent type='link' text='Re_Send Code' onPress={hanldReSendCode}/>
      </View>
      }
        <LoadingModal isvisiable={visiableModal} />
    </ImageBackground>
  );
};

export default VerificationScreen;



const stylesVerification = StyleSheet.create({
  textInput:{padding:10,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: appColors.back,
             textAlign:'center',
              alignItems: 'center',
              justifyContent: 'center',
            },
})