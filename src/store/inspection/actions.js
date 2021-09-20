import Swal from 'sweetalert2';
import {
    getHttp,
    patchHttp,
    deleteHttp,
    postHttp,
  } from '@/http/fetchApi';
  import MT from './types';

  async function getInspections({ commit }, param) {
    console.log("inspection 폴더 및 getInspections 호출");
    param.storeCode=sessionStorage.getItem("storeCode");
    try {
      commit(MT.LOADING,true);
      const inspectionlist = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/inspection`, {  
        ...param,
      });
      console.log('inspectionlist : ', inspectionlist.data);
      commit(MT.SET_INSPECTION_LIST, inspectionlist.data);
      commit(MT.LOADING,false);
      
    } catch (error) {
      console.log('error occured on getInspections',error);
      commit(MT.ERROR, error);
      commit(MT.LOADING,false);
    }
  }

  async function confirmInspection({ commit }, payload) {
    let msg = '검수확정되었습니다';
    console.log('payload ', payload);

    try {
      commit(MT.LOADING,true);
      const result = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/inspection/confirmation`, {
        ...payload,
      });
      commit(MT.LOADING,false);

      console.log('검수결과 데이터', result.data);
      let SUCCESS = 0;
      if (result.data === SUCCESS) {
        Swal.fire({
          type: 'info',
          text: msg,
        });
      } else {
        Swal.fire({
          type: 'error',
          title: 'NG!',
          //text: error.message,
          text: '취소요청조건에 부합하지 않거나, 예외가 발생하였습니다.'
        });
      }
    } catch (error) {
      console.log('error occured on dopick' , error);
      commit(MT.ERROR, error);
      commit(MT.LOADING,false);
      Swal.fire({
        type: 'error',
        title: 'NG!',
        text: error.message,
      });
    }
  }

  async function getLabelCode({ commit }, param) {
    console.log("Call getLabelAndProductInfo in ./inspection/action.js");
    param.storeCode=sessionStorage.getItem("storeCode");
    try {
      commit(MT.LOADING,true);
      const codeInfo = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/inspection/labelcode`, {  
        ...param,
      });
      console.log('codeInfo : ', codeInfo);
      console.log('getLabelCode : ', codeInfo.data);
      //commit(MT.SET_INSPECTION_LIST, inspectionlist.data);
      // commit(MT.SET_CODE_INFO, codeInfo.data);
      commit(MT.SET_CODE_INFO, codeInfo.data);
      commit(MT.LOADING,false);
    } catch (error) {
      console.log('error occured in func getLabelCode',error);
      commit(MT.ERROR, error);
      commit(MT.LOADING,false);
    }
  }

  function setCurrentCount({ commit }, currentCount){
    commit(MT.SET_CURRENT_COUNT, currentCount);
  }

  export default {
    getInspections,
    confirmInspection,
    getLabelCode,
    setCurrentCount,
  }
  