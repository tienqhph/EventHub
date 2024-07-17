import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RowComponent from '../../../components/RowComponent';
import {
  ArrowLeft,
  ArrowRight,
  Back,
  Backward,
  Bookmark,
  Calendar,
  Location,
} from 'iconsax-react-native';
import TextComponent from '../../../components/TextComponent';
import LinearGradient from 'react-native-linear-gradient';
import {
  PropsRouteDetailScreen,
  RootStack,
} from '../../../navigators/typechecking/TypeChecking';
import {useNavigation, useRoute} from '@react-navigation/native';
import AvataGroupComponent from '../../../components/AvataGroupComponent';
import ButtonComponent from '../../../components/ButtonComponent';
import {appColors} from '../../../constants/appColors';
import IconComponent from '../../../components/IconComponent';
import {fonts} from '../../../constants/fontFamily';
import {appInfor, image} from '../../../constants/const';
import {GetDateTime} from '../../../utils/getTime';
import UserApi from '../../../apis/userApi';
import {UserModel} from '../../../models/UserModel';

const DetailScreen = () => {
  const params = useRoute<PropsRouteDetailScreen>().params;

  const [datauser, setdatauser] = useState<UserModel>();

  useEffect(() => {
    console.log('data params', params?.item.authorId);
    handleGetdataUser();
  }, []);

  const handleGetdataUser = async () => {
    if (params) {
      const url = `/getUerInfor/${params.item.authorId}`;
      const res = await UserApi.handleGetuser(url, {}, 'get');
      setdatauser(res.data);
    }
  };
  const navigation = useNavigation<RootStack>();
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <ImageBackground
        source={{uri: params?.item.imgUrl ?? ''}}
        style={{width: '100%', height: 244}}>
        <LinearGradient
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0)']}
          style={{flex: 1}}>
          <RowComponent flexD="row" style={{padding: 20, paddingTop: 35}}>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <TouchableOpacity onPress={() => navigation.pop()}>
                <ArrowLeft size={23} color="white" variant="Bold" />
              </TouchableOpacity>
              <TextComponent text="Event Details" size={24} color="white" />
            </View>
            <TouchableOpacity style={styleDetail.btnbookmark}>
              <Bookmark size={23} color="white" variant="Bold" />
            </TouchableOpacity>
          </RowComponent>
        </LinearGradient>
        {params && params.item.uids.length > 0 ? (
          <View style={{flex: 1, alignItems: 'center'}}>
            <RowComponent
              flexD="row"
              style={[styleDetail.avtinvite, styleDetail.shadow]}>
              <AvataGroupComponent uids={params?.item.uids ?? []} />
              <TouchableOpacity style={styleDetail.btninvite}>
                <TextComponent text="INVITE" color={appColors.white} />
              </TouchableOpacity>
            </RowComponent>
          </View>
        ) : (
          <View style={{paddingHorizontal: 20,bottom:-30 , borderRadius: 12}}>
            <TouchableOpacity
              style={styleDetail.btnInvite}>
              <RowComponent flexD="row">
                <TextComponent
                  text={`INVITE`}
                  color="white"
                  font={fonts.bold}
                  flex={1}
                  styles={{textAlign: 'center'}}
                />
                <ArrowRight size={20} color="white" />
              </RowComponent>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>

      <ScrollView
        contentContainerStyle={{paddingHorizontal: 20, width: '100%'}}>
        <TextComponent
          text={params?.item.title ?? ''}
          size={35}
          numberofline={2}
          styles={{paddingTop: 35}}
        />
        <RowComponent flexD="row" style={{alignItems: 'center'}}>
          <IconComponent
            icon={
              <Calendar size={20} color={appColors.primary} variant="Bold" />
            }
          />
          <View style={{paddingHorizontal: 14}}>
            <TextComponent
              text={`${params && GetDateTime.handlegetDate(params?.item.date)}`}
              size={16}
            />
            <TextComponent
              text={`${
                params &&
                appInfor.weekName[new Date(params?.item.date).getDay()]
              } ${
                params &&
                GetDateTime.handleGetime(new Date(params.item.startAt))
              } - ${
                params && GetDateTime.handleGetime(new Date(params.item.endAt))
              }`}
              color="#747688"
              font={fonts.regular}
              size={12}
            />
          </View>
        </RowComponent>
        <RowComponent
          flexD="row"
          style={{alignItems: 'center', marginVertical: 18}}>
          <IconComponent
            icon={
              <Location size={20} color={appColors.primary} variant="Bold" />
            }
          />
          <View style={{flex: 1, paddingHorizontal: 14}}>
            <TextComponent
              text={params ? params.item.location.title : 'title adress'}
              size={16}
            />
            <TextComponent
              text={params ? params.item.location.adress : ''}
              color="#747688"
              font={fonts.regular}
              size={12}
              numberofline={1}
            />
          </View>
        </RowComponent>
        <RowComponent flexD="row" style={{alignItems: 'center', flex: 1}}>
          <Image
            source={image.image_onboarding_1}
            style={{width: 44, height: 44, borderRadius: 10}}
          />
          <View style={{paddingHorizontal: 14, flex: 1}}>
            <TextComponent
              text={`${datauser ? datauser.name : ''}`}
              size={16}
            />
            <TextComponent
              text="Organizer"
              color="#747688"
              font={fonts.regular}
              size={12}
            />
          </View>

          <TouchableOpacity
            style={{backgroundColor: '#EAEDFF', padding: 12, borderRadius: 7}}>
            <TextComponent text="FLOW" color="#5669FF" size={12} />
          </TouchableOpacity>
        </RowComponent>

        <TextComponent
          text="About Event"
          size={18}
          styles={{paddingVertical: 20}}
        />

        <TextComponent text={params ? params.item.description : ''} />
      </ScrollView>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 1)']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={styleDetail.viewBuy}>
        <TouchableOpacity style={styleDetail.btnbuy}>
          <RowComponent flexD="row">
            <TextComponent
              text={`BUY TICKET ${params?.item.price}$ `}
              color="white"
              font={fonts.bold}
              flex={1}
              styles={{textAlign: 'center'}}
            />
            <ArrowRight size={20} color="white" />
          </RowComponent>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default DetailScreen;

const styleDetail = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.05,
    elevation: 1,
  },
  avtinvite: {
    position: 'absolute',
    paddingHorizontal: 20,
    width: '75%',
    zIndex: 1,
    height: 70,
    backgroundColor: 'white',
    bottom: -30,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 30,
  },
  btnbookmark: {
    width: 36,
    height: 36,
    backgroundColor: '#ffffff80',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btninvite: {
    backgroundColor: appColors.primary,
    padding: 10,
    borderRadius: 12,
  },
  btnbuy: {
    backgroundColor: appColors.primary,

    padding: 20,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    width: '90%',
  },
  viewBuy: {
    position: 'absolute',
    bottom: 0,
    height: 180,
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
  },
  btnInvite:{
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    backgroundColor: appColors.primary,
  }
});
