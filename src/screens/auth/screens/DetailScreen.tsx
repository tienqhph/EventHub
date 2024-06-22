import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
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
import {RootStack} from '../../../navigators/typechecking/TypeChecking';
import {useNavigation} from '@react-navigation/native';
import AvataGroupComponent from '../../../components/AvataGroupComponent';
import ButtonComponent from '../../../components/ButtonComponent';
import {appColors} from '../../../constants/appColors';
import IconComponent from '../../../components/IconComponent';
import {fonts} from '../../../constants/fontFamily';
import {image} from '../../../constants/const';

const DetailScreen = () => {
  const navigation = useNavigation<RootStack>();
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <ImageBackground
      
        source={require('./../../../assets/images/imageevnts.png')}
        style={{width: '100%', height: 244}}>
          
        <LinearGradient colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0)']}      style={{flex: 1}}>
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
        <View style={{flex: 1, alignItems: 'center'}}>
          <RowComponent
            flexD="row"
            style={[styleDetail.avtinvite, styleDetail.shadow]}>
            <AvataGroupComponent
              uids={['dasa', 'assad', 'dasdds', 'dsadasdd']}
            />
            <TouchableOpacity style={styleDetail.btninvite}>
              <TextComponent text="INVITE" color={appColors.white} />
            </TouchableOpacity>
          </RowComponent>
        </View>
      </ImageBackground>

      <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
        <TextComponent
          text="International Band Music Concert"
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
            <TextComponent text="14 December, 2021" size={16} />
            <TextComponent
              text="Tuesday, 4:00PM - 9:00PM"
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
          <View style={{paddingHorizontal: 14}}>
            <TextComponent text="Gala Convention Center" size={16} />
            <TextComponent
              text="36 Guild Street London, UK "
              color="#747688"
              font={fonts.regular}
              size={12}
            />
          </View>
        </RowComponent>
        <RowComponent flexD="row" style={{alignItems: 'center'}}>
          <Image
            source={image.image_onboarding_1}
            style={{width: 44, height: 44, borderRadius: 10}}
          />
          <View style={{paddingHorizontal: 14, flex: 1}}>
            <TextComponent text="Ashfak Sayem" size={16} />
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

        <TextComponent text="Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Read More..." />
        <TextComponent text="Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Read More..." />
        <TextComponent text="Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Read More..." />
        <TextComponent text="Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Read More..." />
        <TextComponent text="Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Read More..." />
        <TextComponent text="Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Read More..." />
     
     </ScrollView>
     <LinearGradient
      colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 1)']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={styleDetail.viewBuy}>
        <TouchableOpacity style={styleDetail.btnbuy}>
          <RowComponent flexD="row">
            <TextComponent
              text="BUY TICKET $120"
              color="white"
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
   
    position:'absolute' , 
     bottom:0, 
    height: 180,
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
  },
});
