import {View, Text, Image, FlatList, TouchableOpacity, ViewStyle, StyleProp} from 'react-native';
import React, {ReactNode} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {appColors} from '../../../constants/appColors';
import {icon} from '../../../constants/const';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonComponent from '../../../components/ButtonComponent';
import RowComponent from '../../../components/RowComponent';
import TextComponent from '../../../components/TextComponent';
import SpaceComponent from '../../../components/SpaceComponent';
interface dataFilterInterface {
  id: string;
  icon: ReactNode;
  title: string;
  color: string;
  key:string

}

interface Props {
    onpress ?:(data:any)=>void , 
    bgcolorcolor?:string , 
    textcolor?:string , 
    coloricon?:string , 
    styles?:StyleProp<ViewStyle>
}

const FilterDataComponent = ({onpress , bgcolorcolor , coloricon , styles , textcolor}:Props) => {
  const dataFilter: dataFilterInterface[] = [
    {
      id: '0',
      icon: (
        <MaterialIcons
          name="sports-basketball"
          size={20}
          color={appColors.white}
        />
      ),key:'sports' , 

      title: 'Sports',
      color: '#F0635A',
    },
    {
      id: '1', key:'music' , 
      icon: <FontAwesome name="music" size={20} color={appColors.white} />,
      title: 'Music ',
      color: '#F59762',
    },
    {
      id: '2',
      key :'food',
      icon: (
        <View>
          <Image source={icon.icon_knife} style={{width: 20, height: 20}} />
        </View>
      ),
      title: 'Food',
      color: '#29D697',
    },
    {
      id: '3',
       key:'art',
      icon: (
        <MaterialCommunityIcons name="draw" size={20} color={appColors.white} />
      ),
      title: 'Art',
      color: '#46CDFB',
    },
  ];

  const Item = ({color , icon , title}: dataFilterInterface) => {
    return(
        <View  style = {{marginRight:10 , minWidth:82}}>
            <TouchableOpacity onPress={()=>onpress&&onpress(title)} style = {{backgroundColor:bgcolorcolor?bgcolorcolor:color , padding:10 , borderRadius:20}}>
                <RowComponent flexD='row'>
                    {icon}
                   
                    <TextComponent text={title} color={textcolor?textcolor:appColors.white} styles = {{marginLeft:5}}/>
                    
                </RowComponent>
            </TouchableOpacity>
        </View>
    )
  };
  return (
    <View >
      <FlatList 
      horizontal
            showsHorizontalScrollIndicator = {false}
        data={dataFilter}
        renderItem={({item}) => (
          <Item
          key={item.key}
            icon={item.icon}
            color={item.color}
            title={item.title}
            id={item.id}
          />
        )}
        keyExtractor={(Item)=>Item.key}
      />
    </View>
  );
};

export default FilterDataComponent;
