import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {AuthState, removeAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ArrowDown,
  ArrowDown2,
  ArrowDown3,
  HambergerMenu,
  Menu,
  Notification,
  SearchNormal,
  SearchNormal1,
} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStack} from '../../navigators/typechecking/TypeChecking';
import ContainerComponent from '../../components/ContainerComponent';
import {appColors} from '../../constants/appColors';
import RowComponent from '../../components/RowComponent';
import TextComponent from '../../components/TextComponent';
import {fonts} from '../../constants/fontFamily';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ButtonComponent from '../../components/ButtonComponent';
import Octicons from 'react-native-vector-icons/Octicons';
import {styleHome} from './stylehome';
import FilterDataComponent from './components/FilterDataComponent';
import UpcomingEventsComponent from './components/UpcomingEventsComponent';

const HomeScreen = ({navigation}: any) => {
  const dispach = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.authReducer.dataAuth);
  const [datastorage, setdataStorage] = useState<any>();

  useEffect(() => {
    getdataFromStorage();
    console.log('data store', data.email);
  }, []);
  const getdataFromStorage = async () => {
    const datastorage: any = await AsyncStorage.getItem('auth');

    const dataparse = datastorage != null ? JSON.parse(datastorage) : null;
   
  };

  const handleFilter = (data :any)=>{
      console.log(data)
  }
  return (
    <View style={{flex: 1}} >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styleHome.containerHeader}>
        {/* viewtitle */}
        <RowComponent flexD="row" style={styleHome.viewRow}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <HambergerMenu size={25} color="white" />
          </TouchableOpacity>
          <View>
            <RowComponent flexD="row" style={{alignItems: 'center'}}>
              <TextComponent
                text="Current Location"
                color="white"
                font={fonts.regular}
              />
              <TouchableOpacity style={{marginLeft: 5}}>
                <AntDesign name="caretdown" size={10} color="white" />
              </TouchableOpacity>
            </RowComponent>
            <TextComponent text="New Yourk, USA" color="white" />
          </View>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff1A',
            }}>
            <TouchableOpacity>
              <Notification size={20} color="white" />
              <View
                style={{
                  width: 6,
                  height: 6,
                  backgroundColor: '#02E9FE',
                  borderRadius: 3,
                  position: 'absolute',
                  right: 5,
                }}
              />
            </TouchableOpacity>
          </View>
        </RowComponent>
        {/* viewsearch */}
        <View style={styleHome.viewRow}>
          <RowComponent flexD="row">
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
              <RowComponent flexD="row" style={{alignItems: 'center'}}>
                <SearchNormal1 size={20} color="white" />
                <TextComponent
                  text="| Search..."
                  color="#ffffff33"
                  size={18}
                  styles={{paddingLeft: 5}}
                />
              </RowComponent>
            </TouchableOpacity>
            <View style={styleHome.containerButtonFilter}>
              <RowComponent flexD="row">
                <RowComponent flexD="row">
                  <View style={styleHome.viewcontainerIconFilter}>
                    <Octicons name="filter" size={16} color="#00000066" />
                  </View>
                  <TextComponent
                    text="Filters"
                    color={appColors.white}
                    font={fonts.regular}
                    styles={{paddingLeft: 5}}
                  />
                </RowComponent>
              </RowComponent>
            </View>
          </RowComponent>
        </View>
     
      </View>
      <View style = {{marginTop:-20  , marginLeft:20}}>
             <FilterDataComponent onpress={handleFilter}/>
      </View>

      <UpcomingEventsComponent/>
 
    </View>
  );
};

export default HomeScreen;
