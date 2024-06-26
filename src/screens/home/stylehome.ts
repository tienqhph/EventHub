import {StyleSheet} from 'react-native';
import {appColors} from '../../constants/appColors';

export const styleHome = StyleSheet.create({
  containerHeader: {
    width: '100%',
    height: '22%',
    padding: 24,
    backgroundColor: appColors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  viewRow: {
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  viewcontainerIconFilter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff66',
  },
  containerButtonFilter: {
    backgroundColor: '#ffffff1a',
    borderRadius: 20,
    padding: 6,
  },
});
