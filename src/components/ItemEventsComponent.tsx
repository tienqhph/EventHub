import {Location} from 'iconsax-react-native';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightBase,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthState} from '../redux/reducers/authReducer';
import AvataGroupComponent from './AvataGroupComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {EventModel} from '../models/EventModel';
import { useNavigation } from '@react-navigation/native';
import { RootStack } from '../navigators/typechecking/TypeChecking';
import { NAME_SCREENS } from '../constants/nameNavigator';
interface Props {
  dataEvent?: EventModel;
  onpress?: () => void;
}

const ItemEventsComponent = (props: Props) => {
  const navigation = useNavigation<RootStack>()
  const {dataEvent, onpress} = props;
  console.log(dataEvent);
  const fakedatauids = ['dasasd', 'dasdsad', 'sadada', 'gdgg'];
  return (
    <View style={{paddingHorizontal: 20, height: 255}}>
      <TouchableOpacity onPress={() => navigation.navigate(NAME_SCREENS.DETAIL_SCREEN)}>
        <View style={[stylesItemEvent.shadow, stylesItemEvent.viewCard]}>
          <View style={{width: '100%', height: 131}}>
            <ImageBackground
              source={require('./../assets/images/imageevnts.png')}
              borderRadius={12}
              style={{flex: 1, padding: 10}}>
              <RowComponent
                flexD="row"
                style={{justifyContent: 'space-between'}}>
                <View
                  style={{
                    width: 45,
                    height: 45,
                    backgroundColor: '#ffffffB3',
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <TextComponent text="10" />
                  <TextComponent text="JUNE" />
                </View>
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: '#ffffffB3',
                    right: 0,
                    top: 0,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons name="bookmark" size={18} color="#EB5757" />
                </TouchableOpacity>
              </RowComponent>
            </ImageBackground>
          </View>
          <TextComponent numberofline={1} text="International Band Mu " size={18} />
          <AvataGroupComponent uids={fakedatauids} />
          <RowComponent flexD="row" style={{alignItems: 'center'}}>
            <Location size={12} color="#716E90" />
            <TextComponent
              text="36 Guild Street London, UK "
              color="#716E90"
              size={12}
            />
          </RowComponent>
        </View>
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    padding: 20,
    width: '68%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
