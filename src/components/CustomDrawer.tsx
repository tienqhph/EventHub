import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  Bookmark,
  Calendar1,
  Logout,
  Message,
  Profile,
  Setting
} from 'iconsax-react-native';
import React, { ReactNode, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { LoginManager } from 'react-native-fbsdk-next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { appColors } from '../constants/appColors';
import { fonts } from '../constants/fontFamily';
import { AuthState, removeAuth } from '../redux/reducers/authReducer';
import { AppDispatch, RootState } from '../redux/store';
import { style } from '../styles/globalStyle';
import ContainerComponent from './ContainerComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
interface Props {
  id: string;
  title: string;
  icon: ReactNode;
}

const dataAuthAffterLogOut: AuthState = {
  email: '',

  token: '',
  isUpdated: false,
  name: '',
  photo: '',
  familyName: '',
  givenName: '',
  iduser: '',
};
const CustomDrawer = ({navigation}: any) => {
  const dataselect = useSelector(
    (state: RootState) => state.authReducer.dataAuth,
  );

  const [datauser, setdatauser] = useState();

  useEffect(() => {
    handleGetdataUser();
  }, []);

  const handleGetdataUser = async () => {
    try {
      await AsyncStorage.getItem('auth').then((data: any) => setdatauser(data));

      console.log('data select', dataselect);
    } catch (error) {}
  };
  console.log(dataselect);
  const dispatch = useDispatch<AppDispatch>();
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
      icon: <SimpleLineIcons name="question" size={20} color="#767676" />,
    },
    {
      id: '7',
      title: 'Sign out',
      icon: <Logout size={20} color="#767676" />,
    },
  ];

  const handleButtonDrawer = async (id: string) => {
    switch (id) {
      case '0':
        console.log('case1');
        break;
      case '1':
        console.log('case2');
        break;
      case '2':
        console.log('case3');
        break;
      case '3':
        console.log('case4');
        break;
      case '4':
        console.log('case5');
        break;
      case '5':
        console.log('case6');
        break;
      case '6':
        console.log('case7');
        break;
      case '7':
        await dispatch(removeAuth());
        await AsyncStorage.setItem(
          'auth',
          JSON.stringify(dataAuthAffterLogOut),
        );
        await GoogleSignin.signOut();
        await LoginManager.logOut();
        break;
      default:
        console.log('default');
    }
  };
  type ItemProps = {title: string; icon: ReactNode; id: string};
  const Item = ({title, icon, id}: ItemProps) => (
    <TouchableOpacity
      onPress={() => handleButtonDrawer(id)}
      style={{justifyContent: 'center'}}>
      <RowComponent flexD="row" style={{marginBottom: 33}}>
        {icon}
        <TextComponent
          text={title}
          font={fonts.regular}
          styles={{paddingLeft: 10}}
        />
      </RowComponent>
    </TouchableOpacity>
  );

  const avtDefault = (name: string) => {
    const newname = name.charAt(0);
    return newname;
  };
  return (
    <ContainerComponent styles={{flex: 1}}>
      <View style={{padding: 20, justifyContent: 'flex-start', flex: 1}}>
        {dataselect.photo ? (
          <Image source={{uri: dataselect.photo}} style={style.avt} />
        ) : (
          <View
            style={[
              style.avt,
              {
                backgroundColor: appColors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <TextComponent
              text={avtDefault(dataselect.givenName)}
              color="white"
              font={fonts.bold}
            />
          </View>
        )}

        <TextComponent
          text={dataselect.name}
          font={fonts.bold}
          styles={{paddingTop: 14}}
        />

        <View style={{flex: 1, alignContent: 'center'}}>
          <FlatList
            contentContainerStyle={{flexGrow: 1, marginTop: 40}}
            data={dataDrawer}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Item title={item.title} icon={item.icon} id={item.id} />
            )}
          />
        </View>

        <TouchableOpacity>
          <RowComponent flexD="row" style={styleCustomDrawer.styleButtonRow}>
            <MaterialCommunityIcons
              name="crown"
              size={20}
              color={appColors.colorcyan}
            />
            <TextComponent text="Upgrade Pro" color={appColors.colorcyan} />
          </RowComponent>
        </TouchableOpacity>
      </View>
    </ContainerComponent>
  );
};

export default CustomDrawer;

const styleCustomDrawer = StyleSheet.create({
  styleButtonRow: {
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
    padding: 10,
    backgroundColor: '#00F8FF33',
  },
});
