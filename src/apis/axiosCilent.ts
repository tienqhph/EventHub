import axios from 'axios';
import queryString from 'query-string';
const axiosClient = axios.create({
  paramsSerializer: param => queryString.stringify(param),
});

axiosClient.interceptors.request.use(async (config: any) => {
  console.log('data config', config.data);
  config.headers = {
    Authorization: config.data.token? `Bearer ${config.data.token}`:'',
    Accept: 'application/json',
    ...config.headers,
  };
  config.data;

  return config;
});

axiosClient.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return res.data;
    }
  },
  error => {
    return error;
  },
);

export default axiosClient;
