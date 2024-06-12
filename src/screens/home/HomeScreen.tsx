import {View, Text, Button, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useDispatch,  useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {AuthState, removeAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HambergerMenu, Menu } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStack } from '../../navigators/typechecking/TypeChecking';
const dataAuthAffterLogOut:AuthState = {
  email: '',
  id: '',
  token: '',
  isUpdated: false
}
const HomeScreen = ({navigation}:any) => {
  const dispach = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.authReducer.dataAuth);  
  const [datastorage, setdataStorage] = useState<any>();
  

useEffect(() => {
  getdataFromStorage()
  console.log("data store" , data.email)
 
}, []);
const getdataFromStorage =async ()=>{
  const datastorage: any = await AsyncStorage.getItem('auth');

  const dataparse = datastorage != null ? JSON.parse(datastorage) : null;
  console.log("data storage111 ",data)
}
  return (
    <View style = {{padding:20}}>

      <TouchableOpacity onPress={()=> navigation.openDrawer()}>
        <HambergerMenu size={25} color='blue'/>
      </TouchableOpacity>
      {/* <Button
        title="Logout"
        onPress={ async () => {
          dispach(removeAuth());
          await AsyncStorage.setItem('auth',JSON.stringify(dataAuthAffterLogOut));
        }}
      /> */}
   

    </View>
  )
};

export default HomeScreen;
