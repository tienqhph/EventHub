import {appInfor} from '../constants/const';
import axiosClient from './axiosCilent';

class userApi {
  handleGetuser = async (
    url: string,
    data?: any,
    method?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    return await axiosClient(`${appInfor.URL}/auth${url}`,{
      method: method ?? 'get',
      data,

    });
  };
}

const  UserApi= new userApi();

export default UserApi;
