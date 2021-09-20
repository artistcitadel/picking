import {
  getHttp,
  patchHttp,
  deleteHttp,
  postHttp,
} from '@/http/fetchApi';
import MT from './types';
// import router from '../../router';

function setOrderCode({ commit },payload) {
  // console.log('setOrderCode in picking action');
  commit(MT.SET_ORDERCODE, payload);
}

function setTotList({ commit },payload) {
  commit(MT.SET_TOTLIST, payload);
}

function initpicks({ commit }) {
  try {
    commit(MT.SET_PICK_LIST, []);
    commit(MT.LOADING,false);
  } catch (error) {
    console.log('error occured on initpicks',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }
}

async function getJob({ commit }, param) {
  try {
    // commit(MT.LOADING,true);
    console.log('getJob',param);
    const joblist = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getjob?pickerId=${param.pickerId}&pickArea=${param.pickArea}&storeCode=${param.storeCode}`);
    console.log('joblist ', joblist.data);
    commit(MT.SET_JOBLIST, joblist.data);
    // commit(MT.LOADING,false);
  } catch (error) {
    console.log('error occured on getjob',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }
}

async function getpicks({ commit },pickData) {
  pickData.storeCode=sessionStorage.getItem("storeCode");
  // let data = JSON.stringify(pickData);
  try {
    commit(MT.LOADING,true);
    const picks = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/getpicks`, {
      ...pickData,
    });
    console.log('picks ', picks);
    commit(MT.SET_PICK_LIST, picks.data);
    commit(MT.LOADING,false);
  } catch (error) {
    console.log('error occured on getpicks',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }
}

async function getProducts({ commit },orderCode) {
  try {
    // commit(MT.LOADING,true);
    const productlist = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getorderdetailproduct?orderCode=${orderCode}`);
    console.log('productlist ', productlist);
    commit(MT.SET_PRODUCTLIST, productlist.data);
    // commit(MT.LOADING,false);
  } catch (error) {
    console.log('error occured on getpicks',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }
}

async function getOwner({ commit }, orderCode) {
  try {
    // commit(MT.LOADING,true);
    const owner = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getorderdetailowner?orderCode=${orderCode}`);
    console.log('owner ', owner.data);
    commit(MT.SET_OWNER, owner.data);
    // commit(MT.LOADING,false);
  } catch (error) {
    console.log('error occured on getpicks',error);
    commit(MT.ERROR, error);
    // commit(MT.LOADING,false);
  }
}

function setPickItem({ commit }, payload) {
  // console.log('setPickItem ', payload);
  commit(MT.SET_PICK_LIST, payload);
  // router.push({name:'tot'});
}

async function getMemo({ commit }, deliNo) {
  try {
    // commit(MT.LOADING,true);
    console.log('getMemo started');
    const memo = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getmemo?deliNo=${deliNo}`);
    // console.log('result in memo', memo.data);
    commit(MT.SET_MEMO, memo.data);
    // commit(MT.LOADING,false);
  } catch (error) {
    console.log('error occured on getmemo',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }
}

async function putMemo({ commit }, payload) {
  payload.storeCode=sessionStorage.getItem("storeCode");
  console.log('putMemo payload',payload);
  try {
    commit(MT.LOADING,true);
      const rtn = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/putMemo`, {
      ...payload,
    });
    console.log('put memo',rtn.data);
    commit(MT.LOADING,false);
  
  } catch (error) {
    console.log('error occured on getpicks',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }
}

async function getTots({ commit }, param) {
  console.log('param', param);
  const groupkey = param.groupkey;
  const pickArea = param.pickArea;
  const storeCode = sessionStorage.getItem("storeCode");
  try {
    // commit(MT.LOADING,true);
    const totlist = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/gettots?groupkey=${groupkey}&pickArea=${pickArea}&storeCode=${storeCode}`);
    console.log('totlist ', totlist);
    commit(MT.SET_TOTLIST, totlist.data);
    // commit(MT.LOADING,false);
  } catch (error) {
    console.log('error occured on gettots',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }
}

async function instructpick({ commit }, param) {
  try {
    console.log("instructpick start",param);
    commit(MT.LOADING,true);
    const result = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/generategroupkey`, {
      ...param,
    });
    console.log('result ', result.data[0].GROUPKEY);
    commit(MT.SET_GROUPKEY, result.data[0].GROUPKEY);
    // commit(MT.LOADING,false);
  } catch (error) {
    console.log('error occured on getpicks',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }  
}

function setGroupKey({ commit }, groupkey){
  try {
    commit(MT.SET_GROUPKEY, groupkey);
  }catch(error){

  }
}

async function getHasassigntot({ commit }, param) {
  try {
    console.log(param);
    let groupkey = param.groupkey;
    let cartcode = param.cartcode;
    console.log("gethasassigntot start",groupkey, cartcode);
    commit(MT.LOADING,true);
    const result = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/gethasassigntot?groupkey=${groupkey}&cartcode=${cartcode}`);
    console.log('result ', result.data);
    commit(MT.SET_HASASSIGNTOT, result.data);
  } catch (error) {
    console.log('error occured on getHasassigntot',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }  
}

async function getAssignDeliveryinfo({ commit }, groupkey) {
  try {
    console.log(groupkey);
    console.log("getAssignDeliveryinfo start",groupkey);
    commit(MT.LOADING,true);
    const result = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getAssignDeliveryinfo?groupkey=${groupkey}`);
    console.log('result ', result.data);
    commit(MT.SET_DELIVERYASSIGNTOT, result.data);
  } catch (error) {
    console.log('error occured on getAssignDeliveryinfo',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }  
}

async function putMasterTrDetail({ commit }, param) {
  try {
    console.log("putMasterTrDetail start",param);
    commit(MT.LOADING,true);
    const result = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/putMasterTrDetail`, {
      ...param,
    });
    console.log('result ', result);
    // commit(MT.SET_GROUPKEY, result.data[0].GROUPKEY);
    commit(MT.LOADING,false);
  } catch (error) {
    console.log('error occured on putMasterTrDetail',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }  
}

async function deleteMasterTrDetail({ commit }, param) {
  try {
    console.log("deleteMasterTrDetail start",param);
    commit(MT.LOADING,true);
    const result = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/deleteMasterTrDetail`, {
      ...param,
    });
    console.log('result ', result);
    // commit(MT.SET_GROUPKEY, result.data[0].GROUPKEY);
    commit(MT.LOADING,false);
  } catch (error) {
    console.log('error occured on deleteMasterTrDetail',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }  
}

async function putMoveStatusProductScan({ commit }, param) {
  const storeCode = sessionStorage.getItem("storeCode");
  param.storeCode=storeCode;
  try {
    console.log("putMoveStatusProductScan start",param);
    commit(MT.LOADING,true);
    const result = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/putMoveStatusProductScan`, {
      ...param,
    });
    console.log('result ', result);
    // commit(MT.SET_GROUPKEY, result.data[0].GROUPKEY);
    commit(MT.LOADING,false);
  } catch (error) {
    console.log('error occured on getpicks',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }  
}

async function rollbacktote({ commit },param) {
  // let data = JSON.stringify(pickData);
  console.log('rollbacktote',param);
  try {
    commit(MT.LOADING,true);
    const picks = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/rollbacktote`, {
      ...param,
    });
    console.log('picks ', picks);
    commit(MT.SET_PICK_LIST, picks.data);
    commit(MT.LOADING,false);
  } catch (error) {
    console.log('error occured on getpicks',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }
}

async function rollbackpick({ commit }, param) {
  // let data = JSON.stringify(pickData);
  try {
    commit(MT.LOADING,true);
    const rtn = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/rollbackpick`, {
      ...param,
    });
    console.log('picks ', rtn);
    commit(MT.SET_PICK_LIST, rtn.data);
    commit(MT.LOADING,false);
  } catch (error) {
    console.log('error occured on getpicks',error);
    commit(MT.ERROR, error);
    commit(MT.LOADING,false);
  }
}

function setStage({ commit }, payload){
  try {
    commit(MT.SET_STAGE, payload);
  }catch(error){

  }
}

export default {
  initpicks,
  getpicks,
  setOrderCode,
  getProducts,
  getOwner,
  setPickItem,
  getTots,
  instructpick,
  getHasassigntot,
  getAssignDeliveryinfo,
  putMasterTrDetail,
  putMoveStatusProductScan,
  deleteMasterTrDetail,
  putMemo,
  getMemo,
  getJob,
  setGroupKey,
  setTotList,
  rollbacktote,
  rollbackpick,
  setStage,
}
