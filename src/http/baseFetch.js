import axios from 'axios';
import {
  errorInterceptor,
  requestInterceptor,
  responseInterceptor,
} from './interceptors';

export function createAxios(options = {}) {
  
  // console.log('createAxios',options);
  return axios.create({
    // withCredentials: true,
    // headers: {'Authorization': token},
    ...options,
  });
}

const localApi = createAxios({
  baseURL: `${document.location.protocol}//${document.location.host}`,
});

localApi.interceptors
  .request.use(requestInterceptor, errorInterceptor);

// localApi.interceptors
//   .response.use(responseInterceptor, errorInterceptor);

export default async (url, method, options = {}) =>
  localApi({
  method: method.toUpperCase(),
  url,
  ...options,
});

