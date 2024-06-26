import { Calendar, Clock } from 'iconsax-react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { style } from '../styles/globalStyle';
import { GetDateTime } from '../utils/getTime';
import TextComponent from './TextComponent';

interface Props {
  type: 'date' | 'time';
  selected?: Date;
  onchange: (val: Date) => void;
}
const DateTimePickerComponent = ({onchange, type, selected}: Props) => {
  const [date, setDate] = useState(new Date());
  const [openDateTimepicker, setOpenDateTimepicker] = useState(false);
  return (
    <TouchableOpacity
      style={[style.inputcontainer, {flex: type === 'date' ? 0 : 1}]}
      onPress={() => setOpenDateTimepicker(!openDateTimepicker)}>
      <TextComponent
        text={
          date
            ? type === 'date'
              ? GetDateTime.handlegetDate(date)
              : GetDateTime.handleGetime(date)
            : 'choise'
        }
        styles={{flex: 1, textAlign: 'center'}}
      />

      {type === 'date' ? (
        <Calendar size={20} color="gray" />
      ) : (
        <Clock size={20} color="gray" />
      )}
      <DatePicker
        mode={type}
        modal
        open={openDateTimepicker}
        date={date}
        onConfirm={date => {
          setOpenDateTimepicker(false);
          setDate(date);
          onchange(date);
        }}
        onCancel={() => {
          setOpenDateTimepicker(false);
        }}
      />
    </TouchableOpacity>
  );
};

export default DateTimePickerComponent;
