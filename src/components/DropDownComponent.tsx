import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ArrowCircleDown, SearchNormal1 } from 'iconsax-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { appColors } from '../constants/appColors';
import { fonts } from '../constants/fontFamily';
import { RootState } from '../redux/store';
import { style } from '../styles/globalStyle';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
interface SelectModal {
  label: string;
  email: string;
}
export interface Userselect {
  email: string;
  name: string;
  iduser: string;
}
export interface Category {}
interface Props {
  select: string[];
  onselected: (val: Userselect[]) => void;
  values: Userselect[];
  multible?: boolean;
  dataconfirm: Userselect[];
}
const DropDownComponent = ({
  onselected,
  select,
  values,
  multible,
  dataconfirm,
}: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [dataSearchkey, setdataSearchkey] = useState('');
  const [isvisiableModalize, setisvisiableModalize] = useState(false);
  const modalize = useRef<Modalize>();
  const datauser = useSelector(
    (state: RootState) => state.authReducer.dataAuth,
  );

  const [dataUserSelect, setdataUserSelect] = useState<Userselect[]>([]);

  useEffect(() => {
    if (isvisiableModalize) {
      modalize.current?.open();
    } else {
      modalize.current?.close();
    }
  }, [isvisiableModalize]);

  const handleChangeUser = (user: Userselect, index: number) => {
    const exitstinguser = dataUserSelect.findIndex(
      item => item.iduser === user.iduser,
    );
    if (exitstinguser != -1) {
      dataUserSelect.splice(exitstinguser, 1);
      const datacopy = [...dataUserSelect];
      setdataUserSelect(datacopy);
    } else {
      dataUserSelect.push(user);
      const datacopy = [...dataUserSelect];
      setdataUserSelect(datacopy);
      onselected(dataUserSelect);
    }
  };

  const handleDeleteUser = (index: number) => {
    dataUserSelect.splice(index, 1);
    const datacopy = [...dataUserSelect];
    setdataUserSelect(datacopy);
    onselected(dataUserSelect);
  };
  return (
    <View>
      <TouchableOpacity
        style={[style.inputcontainer, {}]}
        onPress={() => setisvisiableModalize(!isvisiableModalize)}>
        <RowComponent flexD="row" style={{flex: 1, alignItems: 'center'}}>
          {dataconfirm.length > 0 ? (
            <View style={{alignItems: 'flex-start', flex: 1, padding: 10}}>
              {dataconfirm.map((item, index) => (
                <RowComponent
                  key={index}
                  flexD="row"
                  style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    padding: 5,
                    marginVertical: 5,
                  }}>
                  <TextComponent
                    key={item.iduser}
                    text={item.email}
                    styles={{
                      textAlign: 'center',
                    }}
                  />

                  <TouchableOpacity onPress={() => handleDeleteUser(index)}>
                    <AntDesign name="close" color={appColors.text} size={22} />
                  </TouchableOpacity>
                </RowComponent>
              ))}
            </View>
          ) : (
            <TextComponent
              text="Add user"
              flex={1}
              styles={{textAlign: 'center'}}
            />
          )}
          <ArrowCircleDown size={20} color="gray" />
        </RowComponent>
      </TouchableOpacity>
      <Portal>
        <Modalize
          HeaderComponent={
            <RowComponent
              flexD="row"
              style={{
                padding: 10,
                paddingTop: 40,
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <InputComponent
                styles={{flex: 1, marginBottom: 0, backgroundColor: 'white'}}
                onChange={val => setdataSearchkey(val)}
                value={dataSearchkey}
                affix={<SearchNormal1 size={20} color="gray" />}
                pleaceHolder="Search Email"
              />
              <ButtonComponent
                text="Cancle"
                type="link"
                styles={{}}
                onPress={() => {
                  setisvisiableModalize(!isvisiableModalize);
                }}
              />
            </RowComponent>
          }
          FooterComponent={
            dataUserSelect.length > 0 ? (
              <View
                style={{
                  width: '100%',
                  bottom: 0,
                  padding: 20,
                }}>
                <ButtonComponent
                  text="Confirm"
                  textColor="white"
                  textStyle={{fontFamily: fonts.bold}}
                  type="primary"
                  styles={{width: '100%'}}
                  onPress={() => {
                    setisvisiableModalize(!isvisiableModalize);
                    onselected(dataUserSelect);
                  }}
                />
              </View>
            ) : (
              <></>
            )
          }
          ref={modalize}
          onClose={() => setisvisiableModalize(!isvisiableModalize)}
          childrenStyle={{height: '100%'}}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          adjustToContentHeight>
          <View style={{padding: 20, flex: 1}}>
            {values
              ? values.map((item, index) => (
                  <TouchableOpacity
                    key={item.iduser}
                    onPress={() =>
                      multible
                        ? handleChangeUser(item, index)
                        : setdataUserSelect([item])
                    }
                    style={{paddingVertical: 10}}>
                    <RowComponent flexD="row">
                      <TextComponent
                        text={item.email}
                        styles={{
                          flex: 1,
                          color:
                            dataUserSelect.includes(item) ||
                            select.includes(item.iduser)
                              ? appColors.primary
                              : appColors.gray,
                        }}
                      />
                      {dataUserSelect.includes(item) ||
                      dataUserSelect.includes(item) ||
                      select.includes(item.iduser) ? (
                        <MaterialIcons
                          name="check-circle-outline"
                          size={20}
                          color={appColors.primary}
                        />
                      ) : (
                        <></>
                      )}
                    </RowComponent>
                  </TouchableOpacity>
                ))
              : ''}
          </View>
        </Modalize>
      </Portal>
    </View>
  );
};

export default DropDownComponent;
const styles = StyleSheet.create({});
