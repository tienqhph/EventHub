import {View, Text, TouchableOpacity, Modal, StatusBar, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode, useEffect, useRef, useState} from 'react';
import TextComponent from './TextComponent';
import SpaceComponent from './SpaceComponent';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import RowComponent from './RowComponent';
import {Camera, Folder, Folder2, Link} from 'iconsax-react-native';
import ImageCropPicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';

interface dataChoise {
  key: string,
  title: string,
  icon: ReactNode,
}


interface Props {
  onchage: (val: string|ImageOrVideo) => void;
  data:dataChoise[] , 
  style?:StyleProp<ViewStyle> , 
  lable:string
}

const ChoiseImageComponent = ({onchage , data , style ,lable}: Props) => {
  const [isShowModalize, setisShowModalize] = useState(false);
  const [showmodalImageUrl, setshowmodalImageUrl] = useState(false);
  const [dataImage, setdataImage] = useState<string>('');
  const modalizeRef = useRef<Modalize>();

  useEffect(() => {
    if (isShowModalize) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [isShowModalize]);

  const handleSlect = (item: {
    case: string;
    title: string;
    icon: ReactNode;
  }) => {
    switch (item.case) {
      case 'camera':
        ImageCropPicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
          mediaType: 'photo',
        }).then(image => {
          setisShowModalize(false)
          onchage(image);
        }).catch(Error =>console.log(Error) );
      
        break;
      case 'libary':
        ImageCropPicker.openPicker({
          mediaType: 'photo',
        }).then(image => {
          setisShowModalize(false)
          onchage(image);
        }).catch(Error =>console.log(Error) )

        ;
        break;
      default:
        setshowmodalImageUrl(!showmodalImageUrl);
        setisShowModalize(false);
        break;
    }
  };
  const RenderSlect = (item: {
    case: string;
    title: string;
    icon: ReactNode;
  }) => {
    return (
      <TouchableOpacity onPress={() => handleSlect(item)}>
        <RowComponent flexD="row" key={item.case} style={{paddingVertical: 10}}>
          {item.icon}
          <TextComponent text={item.title} styles={{paddingHorizontal: 10}} />
        </RowComponent>
      </TouchableOpacity>
    );
  };
  return (
    <View style = {[style]}>
      <TouchableOpacity onPress={() => setisShowModalize(!isShowModalize)}>
        <TextComponent text={lable} />
      </TouchableOpacity>
      <SpaceComponent height={20} />

      <Portal>
        <Modalize
          adjustToContentHeight
          ref={modalizeRef}
          childrenStyle={{padding: 20}}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          onClose={() => setisShowModalize(!isShowModalize)}>
          <View>
            {data.map((item, index) => (
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

      <Modal transparent={true} visible={showmodalImageUrl}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '80%',
              padding: 20,
              borderRadius: 12,
            }}>
            <InputComponent
              onChange={val => setdataImage(val)}
              value={dataImage}
              pleaceHolder="Enter your Url"
            />
            <StatusBar translucent backgroundColor="rgba(0,0,0,0.5)" />
            <RowComponent flexD="row" style={{justifyContent: 'space-between'}}>
              <ButtonComponent
                text="cancle"
                type="text"
                onPress={() => {
                  setshowmodalImageUrl(!showmodalImageUrl);
                  setdataImage('');
                }}
              />
              <ButtonComponent
                text="confirm"
                type="text"
                onPress={() => {
                  setshowmodalImageUrl(!showmodalImageUrl);
                  onchage(dataImage);
                  setdataImage('');
                }}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChoiseImageComponent;
