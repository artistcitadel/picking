import Swal from 'sweetalert2';
import MT from './types';
import {
  getHttp,
  // patchHttp,
  // deleteHttp,
  // postHttp,
} from '@/http/fetchApi';
import router from '../../router';

function logOut({ commit}) {
  sessionStorage.removeItem("jwt");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("userid");
  sessionStorage.removeItem("storeCode");
  commit(MT.AUTH,false);
  // commit(MT.USERID, '');
  router.push({name:'login'});
}

async function login({ commit },paramData) {
  console.log('store dispatch login');
  try {
    commit(MT.LOADING,true);
    const userId = paramData.userId;
    console.log('login ', userId);
      
    await fetch(`${process.env.VUE_APP_BASE_URL}/login`, {
      method: 'POST',
      // contentType: "application/text; charset=UTF-8",
      body: JSON.stringify(paramData)
    })
      .then(res => {
        const jwtToken = res.headers.get('Authorization');
        if (jwtToken !== null) {
          console.log('jwtToken', jwtToken);
          sessionStorage.setItem("jwt", jwtToken);
          commit(MT.AUTH,true);
          console.log('login ', userId);
          sessionStorage.setItem("userid", userId);
          commit(MT.SET_USERID, userId);

        //  dispatch('getUsername',userId);
        // router.push(`/picking_list/'${userId});
        // router.push({name:'list'});
        }
        else {
          errorInterceptor(403);
          commit(MT.LOADING,false);
        }
      })
      .catch(err => {
        console.error(err);
        alert(err);
        }
      ) 

  } catch (error) {
    console.log('error ',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }
}
export function errorInterceptor(error) {
  let txt = '';
  if (error===403){
    txt='입력하신 정보가 불일치 합니다';
  }
  Swal.fire({
    type: 'error',
    title: 'NG!',
    //text: error.message,
    text:txt,
  });
  
  return Promise.reject(error);
}

async function getUsername({commit}, paramData) {
  console.log('getUsername started',paramData);
  try {
    // commit(MT.LOADING);
    const {data} =  await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getusername?userId=${paramData}`, {
      data: {
        ...paramData,
      }
    });
     console.log('getusername',data);
    commit(MT.USERDATA, data);
    // console.log('this.$store.state.userData',this.state.data.userData);
    sessionStorage.setItem("username", data.userName);
    sessionStorage.setItem("storeCode", data.storeCode);
    commit(MT.SET_STORECODE, data.storeCode);
    // commit(MT.LOADING,false);
    // await router.push({name:'list'});
    // const codes = ['OMS_STATUS','OMS_DELI_DIV','OMS_DELI_ORDER','OMS_DELI_METHOD','OMS_PICK_AREA'];
    // for(let i=0;i<codes.length;i++) {
    //   await dispatch('getCode',codes[i]);
    // }
    commit(MT.LOADING,false);
    
    // router.push('/picking_list/1');
    // router.push({name:'list'});
  } catch (error) {
    console.log(error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }
}

async function getCode({ commit },paramData) {
  console.log('getcode started',paramData);
  try {
    // commit(MT.LOADING);
    const result =  await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getcommcode?codeDiv=${paramData}`, {
      data: {
        ...paramData,
      }
    });
    console.log(result.data);
    if(paramData==='OMS_STATUS') commit(MT.OMS_STATUS, result.data);
    if(paramData==='OMS_DELI_DIV') commit(MT.OMS_DELI_DIV, result.data);
    if(paramData==='OMS_DELI_ORDER') commit(MT.OMS_DELI_ORDER, result.data);
    if(paramData==='OMS_DELI_METHOD') commit(MT.OMS_DELI_METHOD, result.data);
    if(paramData==='OMS_PICK_AREA') commit(MT.OMS_PICK_AREA, result.data);
    console.log('get code done');
          
  } catch (error) {
    console.log(error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }
}
  
export default {
  logOut,
  login,
  getUsername,
  getCode,
}
