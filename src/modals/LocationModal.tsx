import {
  View,
  Text,
  Modal,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import InputComponent from '../components/InputComponent';
import {
  SearchFavorite,
  SearchNormal,
  SearchNormal1,
} from 'iconsax-react-native';
import RowComponent from '../components/RowComponent';
import ButtonComponent from '../components/ButtonComponent';
import axios from 'axios';
import {LocationModel} from '../models/LoactionModel';
import TextComponent from '../components/TextComponent';

interface Props {
  isvisibal: boolean;
  onclose?: () => void;
  onchange?: (val: string) => void;
}
const LocationModal = ({isvisibal, onchange, onclose}: Props) => {
  const [dataSearchkey, setdataSearchkey] = useState('');

  const [dataLocation, setdataLocation] = useState<LocationModel[]>([]);
  const [loadMap] = useState(
    'https://tiles.goong.io/assets/goong_map_web.json?api_key=cQhnjYc6t8Ol4tSTWVyQMDwbDe5PDGm5DZwOONsy',
  );
  const [coordinates] = useState([105.83991, 21.028]);
  const camera = useRef(null);
  useEffect(() => {
    if (!dataSearchkey) {
      setdataLocation([]);
    }
  }, [dataSearchkey]);
  const handleGetLocation = async () => {
    const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${dataSearchkey}&limit=10&apiKey=2YCjv-SMnzb4qtnQht5NwFpqg_XO7mCMTZymdE2jfYY`;
    try {
      const res = await axios.get(api);
      if (res.data.items) {
        setdataLocation(res.data.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RenderDataLocation = (item: LocationModel) => {
    return (
      <TouchableOpacity style={{padding: 10}}>
        <TextComponent text={item.title} color="gray" />
      </TouchableOpacity>
    );
  };
  return (
    <Modal visible={isvisibal} animationType="slide" style={{}}>
      <RowComponent
        flexD="row"
        style={{padding: 10, alignItems: 'center', alignContent: 'center'}}>
        <InputComponent
          styles={{flex: 1, marginBottom: 0}}
          onChange={val => setdataSearchkey(val)}
          value={dataSearchkey}
          affix={<SearchNormal1 size={20} color="gray" />}
          pleaceHolder="Search Adress"
          onendEditing={handleGetLocation}
        />
        <ButtonComponent
          text="Cancle"
          type="link"
          styles={{}}
          onPress={onclose}
        />
      </RowComponent>
      {dataSearchkey ? (
        dataLocation.length > 0 ? (
          <FlatList
            data={dataLocation}
            renderItem={({item}) => (
              <RenderDataLocation
                address={item.address}
                highlights={item.highlights}
                id={item.id}
                language={item.language}
                localityType={item.localityType}
                resultType={item.resultType}
                title={item.title}
                key={item.id}
              />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <TextComponent
            text="Không tìm thấy địa chỉ"
            color="gray"
            styles={{padding: 10}}
          />
        )
      ) : (
        <TextComponent
          text="search your adress"
          color="gray"
          styles={{padding: 10}}
        />
      )}
    </Modal>
  );
};

export default LocationModal;
