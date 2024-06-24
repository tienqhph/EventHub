import { appInfor } from "../constants/const";
import axiosClient from "./axiosCilent";



  class EventApi {
    handleEventApi = async (
        url: string,
        data?: any,
    
        method?: 'get' | 'post' | 'put' | 'delete',
      ) => {
        return await axiosClient(`${appInfor.URL}/event${url}`, {
          method: method ?? 'get',
          data,
        });
      };
}


const ApiEvent = new EventApi();

export default ApiEvent;