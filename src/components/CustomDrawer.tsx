import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import ContainerComponent from './ContainerComponent';
import {image} from '../constants/const';
import TextComponent from './TextComponent';
import {fonts} from '../constants/fontFamily';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Bookmark,
  Calendar1,
  Crown,
  Crown1,
  Logout,
  Message,
  Profile,
  Setting,
} from 'iconsax-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RowComponent from './RowComponent';
import { style } from '../styles/globalStyle';
import { appColors } from '../constants/appColors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { AuthState, removeAuth } from '../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk-next';
interface Props {
  id: string;
  title: string;
  icon: ReactNode;
}
const dataAuthAffterLogOut:AuthState = {
  email: '',
  id: '',
  token: '',
  isUpdated: false,
  name: '',
  photo: '',
  familyName: '',
  givenName: ''
}
const CustomDrawer = ({navigation}: any) => {
  const dataselect = useSelector((state: RootState) => state.authReducer.dataAuth);

  console.log(dataselect)
  const dispatch = useDispatch<AppDispatch>()
  const dataDrawer: Props[] = [
    {
      id: '0',
      title: 'My Profile',
      icon: <Profile size={20} color="#767676" />,
    },
    {
      id: '1',
      title: 'Message',
      icon: <Message size={20} color="#767676" />,
    },
    {
      id: '2',
      title: 'Calender',
      icon: <Calendar1 size={20} color="#767676" />,
    },
    {
      id: '3',
      title: 'BookMark',
      icon: <Bookmark size={20} color="#767676" />,
    },
    {
      id: '4',
      title: 'Contact Us',
      icon: <AntDesign name="mail" size={20} color="#767676" />,
    },
    {
      id: '5',
      title: 'Setting',
      icon: <Setting size={20} color="#767676" />,
    },

    {
      id: '6',
      title: 'Helps & FAQs',
      icon: <SimpleLineIcons name='question' size={20} color="#767676" />,
    },
    {
      id: '7',
      title: 'Sign out',
      icon: <Logout size={20} color="#767676" />,
    },
  ];


  const handleButtonDrawer = async (id:string)=>{
  switch(id){
    case'0':
    console.log('case1')
    break;
    case'1':
    console.log('case2')
    break;
    case'2':
    console.log('case3')
    break;
    case'3':
    console.log('case4')
    break;
    case'4':
    console.log('case5')
    break;
    case'5':
    console.log('case6')
    break;
    case'6':
    console.log('case7')
    break;
    case'7':
      await
      dispatch(removeAuth());
      await AsyncStorage.setItem('auth',JSON.stringify(dataAuthAffterLogOut));
      await GoogleSignin.signOut()
      await LoginManager.logOut()
    break;
    default:
      console.log('default')
  }
  }
  type ItemProps = {title: string; icon: ReactNode , id:string};
  const Item = ({title, icon  , id}: ItemProps) => (
    <TouchableOpacity onPress={() => handleButtonDrawer(id)}  style = {{justifyContent:'center'}}>
      <RowComponent flexD='row' style = {{marginBottom:33}}>
      {icon} 
      <TextComponent text={title} font={fonts.regular} styles = {{paddingLeft:10}}/>
      
      </RowComponent>
    </TouchableOpacity>
  );
  return (
    <ContainerComponent styles={{flex: 1, backgroundColor: 'red'}}>
      <View style={{padding: 20, justifyContent: 'flex-start', flex: 1}}>
        <Image
          source={image.image_onboarding_1}
          style={style.avt}
        />

        <TextComponent text={dataselect.name} font={fonts.bold}  styles = {{paddingTop:14}}/>

        <View style={{flex:1  , alignContent:'center' }}>
          <FlatList
            contentContainerStyle={{flexGrow:1,  marginTop:40,   }}
            data={dataDrawer}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Item title={item.title} icon={item.icon} id={item.id} />
            )}
          />
        </View>

        <TouchableOpacity>
          <RowComponent
            flexD="row"
            style={styleCustomDrawer.styleButtonRow}>
            <MaterialCommunityIcons name="crown" size={20} color={appColors.colorcyan} />
            <TextComponent text="Upgrade Pro" color={appColors.colorcyan} />
          </RowComponent>
        </TouchableOpacity>
      </View>
    </ContainerComponent>
  );
};

export default CustomDrawer;


const styleCustomDrawer = StyleSheet.create({
  styleButtonRow:{
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
    padding: 10,
    backgroundColor: '#00F8FF33',
  }
})