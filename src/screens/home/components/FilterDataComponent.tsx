import React, { ReactNode } from 'react';
import {
  FlatList,
  Image,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RowComponent from '../../../components/RowComponent';
import TextComponent from '../../../components/TextComponent';
import { appColors } from '../../../constants/appColors';
import { icon } from '../../../constants/const';
interface dataFilterInterface {
  id: string;
  icon: ReactNode;
  title: string;
  color: string;
  key: string;
}

interface Props {
  onpress?: (data: any) => void;
  bgcolorcolor?: string;
  textcolor?: string;
  coloricon?: boolean;
  styles?: StyleProp<ViewStyle>;
}

const FilterDataComponent = ({
  onpress,
  bgcolorcolor,
  coloricon,
  styles,
  textcolor,
}: Props) => {
  const dataFilter: dataFilterInterface[] = [
    {
      id: '0',
      icon: (
        <MaterialIcons
          name="sports-basketball"
          size={20}
          color={coloricon ? '#F0635A' : appColors.white}
        />
      ),
      key: 'sports',

      title: 'Sports',
      color: '#F0635A',
    },
    {
      id: '1',
      key: 'music',
      icon: (
        <FontAwesome
          name="music"
          size={20}
          color={coloricon ? '#F59762' : appColors.white}
        />
      ),
      title: 'Music ',
      color: '#F59762',
    },
    {
      id: '2',
      key: 'food',
      icon: (
        <View>
          <Image
            source={icon.icon_knife}
            style={{width: 20, height: 20}}
            tintColor={coloricon ? '#29D697' : appColors.white}
          />
        </View>
      ),
      title: 'Food',
      color: '#29D697',
    },
    {
      id: '3',
      key: 'art',
      icon: (
        <MaterialCommunityIcons
          name="draw"
          size={20}
          color={coloricon ? '#46CDFB' : appColors.white}
        />
      ),
      title: 'Art',
      color: '#46CDFB',
    },
  ];

  const Item = ({color, icon, title}: dataFilterInterface) => {
    return (
      <View style={[{marginRight: 10, minWidth: 82}, styles]}>
        <TouchableOpacity
          onPress={() => onpress && onpress(title)}
          style={{
            backgroundColor: bgcolorcolor ? bgcolorcolor : color,
            padding: 10,
            borderRadius: 20,
          }}>
          <RowComponent flexD="row">
            {icon}

            <TextComponent
              text={title}
              color={textcolor ? textcolor : appColors.white}
              styles={{marginLeft: 5}}
            />
          </RowComponent>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
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
        keyExtractor={Item => Item.key}
      />
    </View>
  );
};

export default FilterDataComponent;
