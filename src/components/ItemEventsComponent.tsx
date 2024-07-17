import { Location } from 'iconsax-react-native';
import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AvataGroupComponent from './AvataGroupComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

import { useNavigation } from '@react-navigation/native';
import { NAME_SCREENS } from '../constants/nameNavigator';
import { RootStack } from '../navigators/typechecking/TypeChecking';
import { appInfor } from '../constants/const';
import { appColors } from '../constants/appColors';
interface Props {
  dataEvent?: EventModel[];
  onpress?: () => void;
}

const ItemEventsComponent = (props: Props) => {
  const navigation = useNavigation<RootStack>();
  const {dataEvent, onpress} = props;

  const fakedatauids = ['dasasd', 'dasdsad', 'sadada', 'gdgg'];

  const RenderItem = ({data}:any)=>{
    return (

      
    <TouchableOpacity
       style = {{ flex:1 , marginRight:10}}
        onPress={() => navigation.navigate(NAME_SCREENS.DETAIL_SCREEN , {item:data})}>
        <View style={[stylesItemEvent.shadow, stylesItemEvent.viewCard ,]}>
          <View style={{width: '100%', height: 131}}>
            <ImageBackground
              source={{uri:data.imgUrl?data.imgUrl:'https://cdn.brvn.vn/topics/1280px/2020/23552_23552_xuhuongEvent2020-Covid-19_Ava_2.jpg'}}
              borderRadius={12}
              style={{flex: 1, padding: 10}}>
              <RowComponent
                flexD="row"
                style={{justifyContent: 'space-between'}}>
                <View
                  style={stylesItemEvent.containerDate}>
                  <TextComponent text={`${new Date(data.date).getDate()}`}  color={'coral'}/>
                  <TextComponent text={`${appInfor.month[new Date(data.date).getMonth()]}`}  color={'coral'} />
                </View>
                <TouchableOpacity
                  style={stylesItemEvent.containerBookmark}>
                  <MaterialIcons name="bookmark" size={18} color="#EB5757" />
                </TouchableOpacity>
              </RowComponent>
            </ImageBackground>
          </View>
          <TextComponent
            numberofline={1}
            text={data.title}
            size={18}
          />
          <AvataGroupComponent uids={fakedatauids} />
          <RowComponent flexD="row" style={{alignItems: 'center'}}>
            <Location size={12} color="#716E90" />
            <TextComponent
              text={data.location.adress}
              color="#716E90"
              size={12}
              numberofline={1}
              styles = {{flex:1}}
            />
          </RowComponent>
        </View>
      </TouchableOpacity>
  
    )
  }
  return (
    <View style={{ flex:1  ,paddingHorizontal:20}}>
      <FlatList showsHorizontalScrollIndicator = {false}style = {{flex:1}} data={dataEvent} horizontal renderItem={({item})=><RenderItem data= {item}/>}/>
    </View>
  );
};

export default ItemEventsComponent;

const stylesItemEvent = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 1,
  },
  viewCard: {
    width:237 , 
    height:255, 
       justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  containerBookmark:{
    width: 30,
    height: 30,
    backgroundColor: '#ffffffB3',
    right: 0,
    top: 0,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
  ,containerDate :{
    width: 45,
    height: 45,
    backgroundColor: '#ffffffB3',
    borderRadius: 10,
    alignItems: 'center',
  }
});
