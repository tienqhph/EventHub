import {appInfor} from '../constants/const';
import {addZero} from './addZeroToNumber';

export class GetDateTime {
  static handleGetime = (num: Date) => {
    const hour = new Date(num).getHours();
    const minute = new Date(num).getMinutes();

    return `${addZero(hour)} : ${addZero(minute)}`;
  };
  static handlegetDate = (date: Date) => {
    const day = new Date(date).getDate();
    const month = appInfor.month[new Date(date).getMonth()];
    const year = new Date(date).getFullYear();

    return `${day}-${month}-${year}`;
  };
}
