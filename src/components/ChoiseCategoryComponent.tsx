import { ArrowCircleDown } from 'iconsax-react-native';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { appColors } from '../constants/appColors';
import { icon } from '../constants/const';
import { style } from '../styles/globalStyle';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
interface Props {
  dataselect: string;
  onSlected: (val: string) => void;
}

const dataCategory = [
  {
    icon: (
      <MaterialIcons
        name="sports-basketball"
        size={20}
        color={appColors.gray}
      />
    ),
    key: 'sports',

    title: 'Sports',
  },
  {
    key: 'music',
    icon: <FontAwesome name="music" size={20} color={appColors.gray} />,
    title: 'Music',
  },
  {
    key: 'food',
    icon: (
      <View>
        <Image source={icon.icon_knife} tintColor={appColors.gray} style={{width: 20, height: 20 }}  />
      </View>
    ),
    title: 'Food',
  },
  {
    key: 'art',
    icon: (
      <MaterialCommunityIcons name="draw" size={20} color={appColors.gray} />
    ),
    title: 'Art',
  },
];

const ChoiseCategoryComponent = ({dataselect , onSlected}:Props) => {
  const modalizeRef = useRef<Modalize>();
  const [isShowModalize, setisShowModalize] = useState(false);

  useEffect(() => {
    if (isShowModalize) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [isShowModalize]);
  const RenderSlect = (item: {
    case: string;
    title: string;
    icon: ReactNode;
  }) => {
    return (
      <TouchableOpacity onPress={() => {
        onSlected(item.title)
        setisShowModalize(false)
      }}>
        <RowComponent flexD="row" key={item.case} style={{paddingVertical: 10}}>
          {item.icon}
          <TextComponent text={item.title} styles={{paddingHorizontal: 10}} />
        </RowComponent>
      </TouchableOpacity>
    );
  };
  return (
    <TouchableOpacity style={style.inputcontainer} onPress={()=>setisShowModalize(true)}>
      <RowComponent flexD="row">
        <TextComponent
          text={dataselect?dataselect:"Choise Event category"}
          styles={{flex: 1, textAlign: 'center'}}
        />
        <ArrowCircleDown size={20} color="gray" />
      </RowComponent>
      <Portal>
        <Modalize
          adjustToContentHeight
          ref={modalizeRef}
          childrenStyle={{padding: 20}}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          onClose={() => setisShowModalize(!isShowModalize)}>
          <View>
            {dataCategory.map((item, index) => (
              <RenderSlect
                title={item.title}
                case={item.key}
                icon={item.icon}
                key={item.key}
              />
            ))}
          </View>
        </Modalize>
      </Portal>
    </TouchableOpacity>
  );
};

export default ChoiseCategoryComponent;
