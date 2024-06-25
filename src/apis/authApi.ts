import {appInfor} from '../constants/const';
import axiosClient from './axiosCilent';

class AuthApi {
  handleAuthentication = async (
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

const authenticationApi = new AuthApi();

export default authenticationApi;
