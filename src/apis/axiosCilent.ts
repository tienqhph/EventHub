import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  paramsSerializer: param => queryString.stringify(param),
});

axiosClient.interceptors.request.use(async (config: any) => {
  config.headers = {
    Authorization: '',
    Accept: 'application/json',

    ...config.headers,
  };
  config.data;

  return config;
});

axiosClient.interceptors.response.use(
  res => {
    if (res.status === 200) {
     return res.data
    } 
   
        throw new Error('Error');
    
  },
  error => {
    return error
  },
);

export default axiosClient;
