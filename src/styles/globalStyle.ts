import {StyleSheet} from 'react-native';
import {appColors} from '../constants/appColors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },

  button: {
    flexDirection: 'row',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 56,
  },

  avt: {
    width: 60,
    height: 60,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  inputcontainer: {
    paddingHorizontal: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: appColors.gray2,
    minHeight: 56,
    borderRadius: 12,
    marginBottom: 19,
  },
});
