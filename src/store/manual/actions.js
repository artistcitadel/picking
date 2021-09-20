import Swal from 'sweetalert2';
import {
    getHttp,
    patchHttp,
    deleteHttp,
    postHttp,
  } from '@/http/fetchApi';
  import MT from './types';
  
  async function getJangman({ commit }, param) {
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
  
  async function getManualPickList({ commit }, param) {
    param.storeCode=sessionStorage.getItem("storeCode");
    try {
        commit(MT.LOADING,true);
        const manualpicklist = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/getmanualpicklist`, {
          ...param,
        });
        console.log('manualpicklist ', manualpicklist.data);
        commit(MT.SET_MANUALPICK_LIST, manualpicklist.data);
        commit(MT.LOADING,false);
        
        
      } catch (error) {
        console.log('error occured on manualpicklist',error);
        commit(MT.ERROR, error);
        commit(MT.LOADING,false);
      }
  }
  
  async function doPick({ commit }, payload) {
    console.log(payload);
     let msg = '처리되었습니다!';
    // if(payload[0].status==='01')msg="확정취소되었습니다";
    // if(payload[0].status==='40' && payload[0].picknode==='alterandinspection')msg="검수확정되었습니다";
    console.log('payload ',payload[0].status, payload[0].picknode);
    try {
      commit(MT.LOADING,true);
      // const pick = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/domanualpick`, {
         const pick = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/dobulkpick`, {
        ...payload,
        
      });
      console.log('pick result is',pick.data);
      commit(MT.LOADING,false);
      // Swal.fire({
      //   type: 'info',
      //   // title: 'NG!',
      //   text: msg,
      // });
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

  async function getInspections({ commit }, param) {
    param.storeCode=sessionStorage.getItem("storeCode");
    try {
        commit(MT.LOADING,true);
        const inspectionlist = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/getinspectionlist`, {
          ...param,
        });
        console.log('inspectionlist ', inspectionlist.data);
        commit(MT.SET_INSPECTION_LIST, inspectionlist.data);
        commit(MT.LOADING,false);
        
      } catch (error) {
        console.log('error occured on getInspections',error);
        commit(MT.ERROR, error);
        commit(MT.LOADING,false);
      }
  }

  async function getEventList({ commit }, param) {
    param.storeCode=sessionStorage.getItem("storeCode");
    try {
        commit(MT.LOADING,true);
        const eventList = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/getEventList`, {
          ...param,
        });
        console.log('eventList ', eventList.data);
        commit(MT.SET_EVENT_LIST, eventList.data);
        commit(MT.LOADING,false);
        
      } catch (error) {
        console.log('error occured on getInspections',error);
        commit(MT.ERROR, error);
        commit(MT.LOADING,false);
      }
  }

  export default {
    getJangman,
    getManualPickList,
    doPick,
    getInspections,
    getEventList,
  }
  