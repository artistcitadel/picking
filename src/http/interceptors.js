import Swal from 'sweetalert2';

const postMethods = ['post', 'patch'];

export function requestInterceptor(config) {
  // console.log("requestInterceptor called",config);
  const token = sessionStorage.getItem("jwt");
  console.log('json web token', token);
  config.headers= Object.assign(config.headers,{'Authorization': token});
  console.log("requestInterceptor called",config);
  
  // if (
  //   postMethods.includes(config.method.toLocaleLowerCase()) &&
  //   Object.prototype.hasOwnProperty.call('id', config.data.data) && !config.data.data.id
  // ) {
  //   throw new Error('You need to pass an ID for this request');
  // }

  return config;
}

export function responseInterceptor(response) {
  return response;
}

export function errorInterceptor(error) {
  let txt = '오류가 발생하였습니다';
  console.log(error.response.status);
  // if(error.response.status===403){
  //   txt='';
  // }
  Swal.fire({
    type: 'error',
    title: 'NG!',
    //text: error.message,
    text:txt,
  });

  return Promise.reject(error);
}
