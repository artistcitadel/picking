import Swal from 'sweetalert2';
import {
    getHttp,
    patchHttp,
    deleteHttp,
    postHttp,
  } from '@/http/fetchApi';
  import MT from './types';
  
  async function getJangman({ commit }, param) {
    param.storeCode=sessionStorage.getItem("storeCode");
    try {
        commit(MT.LOADING,true);
        const jangman = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/getjangman`, {
          ...param,
        });
        console.log('jangman ', jangman.data);
        commit(MT.SET_ORDERSPEC, jangman.data);
        commit(MT.LOADING,false);
        
        
      } catch (error) {
        console.log('error occured on getjangman',error);
        commit(MT.ERROR, error);
        commit(MT.LOADING,false);
      }
  }
  
 async function printJangman({ commit }, param) {
    try {
      commit(MT.LOADING,true);
      const pick = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/printjangman`, {
        ...param,
      });
      commit(MT.LOADING,false);
      console.log(pick.data);
      const msg = (pick.data===1)?'성공하였습니다':'실패하였습니다';
      Swal.fire({
        type: 'info',
        // title: 'NG!',
        text: msg,
      });
      return pick.data;
    } catch (error) {
      console.log('error occured on dopick' , error);
      commit(MT.ERROR, error);
      commit(MT.LOADING,false);
      Swal.fire({
        type: 'error',
        title: 'NG!',
        text: '실패하였습니다.',
      });
    }
  }
    
  export default {
    getJangman,
    printJangman,
   
  }
  