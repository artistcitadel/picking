import Swal from 'sweetalert2';
import _ from 'lodash';
import {
    getHttp,
    patchHttp,
    deleteHttp,
    postHttp,
  } from '@/http/fetchApi';
  import MT from './types';
  
  async function getGoods({ commit }, groupkey) {
    try {
      // commit(MT.LOADING,true);
      const storeCode = sessionStorage.getItem("storeCode");
      const goods = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getgoods?groupkey=${groupkey}&storeCode=${storeCode}`);
      
      console.log('goods ', goods);
      commit(MT.SET_GOOD_LIST, goods.data);
      // commit(MT.LOADING,false);
    } catch (error) {
      console.log('error occured on getGoods',error);
      commit(MT.ERROR, error);
      // commit(MT.LOADING,false);
    }
  }
  
  async function getGoodAll({ commit }, param) {
    try {
      console.log('productid',param);
      const storeCode = sessionStorage.getItem("storeCode");
      commit(MT.LOADING,true);
      const goods = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getgooddetaillist?groupkey=${param.groupkey}&productid=${param.productid}&sortno=${param.sortno}&storeCode=${storeCode}`);
      
      console.log('goods ', goods.data);
      commit(MT.SET_GOODS, goods.data);
      commit(MT.LOADING,false);
    } catch (error) {
      console.log('error occured on getGoods',error);
      commit(MT.ERROR, error);
      commit(MT.LOADING,false);
    }
  }

  function setGoodDetailList({ commit }, param) {
   try {
        commit(MT.SET_GOOD_DETAIL_LIST, param.goodlist);
        commit(MT.SET_GOOD, goods.data[param.idx]);
        commit(MT.SET_CURRENT_PRODUCT_COUNT, goods.data[param.idx].SORT_NO);
      
      // commit(MT.LOADING,false);
    } catch (error) {
      console.log('error occured on getGoodDetailList',error);
      commit(MT.ERROR, error);
      commit(MT.LOADING,false);
    }
  }

  async function getGoodDetailList({ commit }, param) {
    try {
      console.log('param',param);
      commit(MT.LOADING,true);
      const goods = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getgooddetaillist?groupkey=${param.groupkey}&productid=${param.productid}&sortno=${param.sortno}&storeCode=${param.storeCode}`);
      
      console.log('goods ', goods.data);
      if(goods.data.length<1)return;
      if(param.productid==='x') {
        commit(MT.SET_GOOD_DETAIL_LIST, goods.data);
      }
      commit(MT.SET_GOOD, goods.data[0]);
      commit(MT.SET_CURRENT_PRODUCT_COUNT, goods.data[0].SORT_NO);
      
      // commit(MT.LOADING,false);
    } catch (error) {
      console.log('error occured on getGoodDetailList',error);
      commit(MT.ERROR, error);
      commit(MT.LOADING,false);
    }
  }

  async function getGoodTotList({ commit }, param) {
    try {
      console.log('groupkey',param.groupkey);
      console.log('productid',param.productid);
      console.log('delino',param.delino);
      console.log('deliseq',param.deliseq);
      // commit(MT.LOADING,true);
      const goods = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getgoodtotlist?groupkey=${param.groupkey}&productid=${param.productid}&delino=${param.delino}&deliseq=${param.deliseq}&storeCode=${param.storeCode}`);
      
      console.log('tots ', goods.data);
      commit(MT.SET_GOOD_TOTLIST, goods.data);
      // commit(MT.LOADING,false);
    } catch (error) {
      console.log('error occured on getGoodDetailList',error);
      commit(MT.ERROR, error);
      // commit(MT.LOADING,false);
    }
  }

  function undefinedstring(str){
      return (_.isUndefined(str)?"":str);
  }
  async function getAssignTotList({ commit, getters }, param) {
    try {
      const getassigntotList = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/getassigntotelist`, {
        ...param,
      });
      
      console.log('assigned tote ', getassigntotList.data);
      commit(MT.SET_ASSIGNTOTLIST, getassigntotList.data);

      let totelist={};
      for(let i=0;i<getters.getTotList.length;i++){
        console.log(getters.getTotList[i].DELI_NO+ '=> '+getters.getTotList[i].MASTER_CART_CODE);
        console.log(undefinedstring(getters.getTotList[i].DELI_DETAIL_SEQ));
        // let key = getters.getTotList[i].DELI_NO+''+undefinedstring(getters.getTotList[i].DELI_DETAIL_SEQ);
        let key = getters.getTotList[i].DELI_NO+''+undefinedstring(getters.getTotList[i].MASTER_TOTE_AREA);
        console.log('key is ',key);
        totelist[key] = getters.getTotList[i].MASTER_CART_CODE;
       }
       console.log('1. totelist',totelist);
       
       console.log(getters.getassigntotList);
       for(let i=0;i<getters.getassigntotList.length;i++){
        // let skey = getters.getassigntotList[i].deliNo+''+getters.getassigntotList[i].deliDetailSeq;
        let skey = getters.getassigntotList[i].deliNo+''+getters.getassigntotList[i].toteArea;
        console.log('skey', skey);
         let idx = _.findIndex(getters.getTotList,function(o){
          //  console.log(o.DELI_NO+undefinedstring(o.DELI_DETAIL_SEQ));
          //  return o.DELI_NO+''+undefinedstring(o.DELI_DETAIL_SEQ) === skey;
           return o.DELI_NO+''+undefinedstring(o.MASTER_TOTE_AREA) === skey;
           }
         );
         console.log('idx',idx);
         if(idx!==-1){
         console.log(idx , '=>' ,getters.getTotList[idx].PRODUCT_CNT);
         if(getters.getTotList[idx].PRODUCT_CNT!==0){
          //  totelist[getters.getassigntotList[i].deliNo]= `${totelist[getters.getassigntotList[i].deliNo]},${getters.getassigntotList[i].cartCode}`;
          console.log('skey', skey);
          console.log('svalue',getters.getassigntotList[i].deliNo,getters.getassigntotList[i].deliDetailSeq,getters.getassigntotList[i].cartCode,getters.getassigntotList[i].toteArea);
          console.log(`${totelist[skey]},${getters.getassigntotList[i].cartCode}`);
          totelist[skey]= `${totelist[skey]},${getters.getassigntotList[i].cartCode}`;
         }
        }
       }
       console.log('2. totelist',totelist);
      //  _.map(totelist,function(v,k){
      //     console.log(k,'->',v);
      //  });
       commit(MT.SET_TOTELIST, totelist);
       commit(MT.LOADING,false);
    } catch (error) {
      console.log('error occured on getAssignTotList',error);
      commit(MT.ERROR, error);
      // commit(MT.LOADING,false);
    }
  }

  function setCurrentProductCount({ commit }, cnt){
    try {
      commit(MT.SET_CURRENT_PRODUCT_COUNT,cnt);
    }catch(error){

    }
  }

  function setGood({ commit }, payload){
    try {
      commit(MT.SET_GOOD, payload);
    }catch(error){

    }
  }

  async function getCheckupGood({ commit }, productid) {
    try {
      console.log('productid', productid);
      
      commit(MT.LOADING,true);
      const good = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getcheckupgood?productid=${productid}`);
      
      console.log('scan good ', good.data, String(good.data).length);
      
      commit(MT.SET_CHECKUP_GOOD, (String(good.data).length===8)?true:false);
      commit(MT.LOADING,false);
    } catch (error) {
      console.log('error occured on getCheckupGood',error);
      commit(MT.ERROR, error);
      commit(MT.LOADING,false);
    }
  }

  function setAllcQty({ commit }, cnt){
    try {
      commit(MT.SET_ALLC_QTY, cnt);
    }catch(error){

    }
  }

  function setPickQty({ commit }, cnt){
    try {
      commit(MT.SET_PICK_QTY, cnt);
    }catch(error){

    }
  }

  async function dopick({ commit }, pickData) {
    // let data = JSON.stringify(pickData);
    let msg = (pickData.status==='15'||pickData.status==='12')?'피킹처리되었습니다!':'피킹취소되었습니다!'
    if(pickData.picknode==='alter') msg='이형처리되었습니다.';
    if(pickData.picknode==='outofstock') msg='품절처리되었습니다.';
    if(pickData.picknode==='replace') msg='대체처리되었습니다.';
    try {
      commit(MT.LOADING,true);
      let apiurl=pickData.picknode==='cancellation'?'docancellationpick':'dopick';
      console.log('pick apiurl', apiurl);
      const pick = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/${apiurl}`, {
        ...pickData,
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

  async function doallpick({ commit }, pickData) {
    try {
      commit(MT.LOADING,true);
      const pick = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/doallpick`, {
        ...pickData,
      });
      console.log('All pick result is',pick.data);
      commit(MT.LOADING,false);
      // let msg = (pickData[0].status==='10')?'피킹취소되었습니다!':(pickData[0].status==='99')?'품절처리되었습니다!':'피킹되었습니다';
      // Swal.fire({
      //   type: 'info',
      //   // title: 'NG!',
      //   text: msg,
      // });
    } catch (error) {
      console.log('error occured on doallpick' , error);
      commit(MT.ERROR, error);
      commit(MT.LOADING,false);
      Swal.fire({
        type: 'error',
        title: 'NG!',
        text: '피킹처리실패!',
      });
    }
  }

  async function doallcancelpick({ commit }, pickData) {
    try {
      commit(MT.LOADING,true);
      const pick = await postHttp(`${process.env.VUE_APP_BASE_URL}/api/doallcancelpick`, {
        ...pickData,
      });
      console.log('All pick cancel result is',pick.data);
      commit(MT.LOADING,false);
      Swal.fire({
        type: 'info',
        // title: 'NG!',
        text: '피킹취소처리되었습니다!',
      });
    } catch (error) {
      console.log('error occured on doallcancelpick' , error);
      commit(MT.ERROR, error);
      commit(MT.LOADING,false);
      Swal.fire({
        type: 'error',
        title: 'NG!',
        text: '피킹취소처리실패!',
      });
    }
  }

  async function getProductByBarcode({ commit }, productid) {
    try {
      console.log('productid', productid);
      
    //  commit(MT.LOADING,true);
      const good = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getproductbybarcode?productId=${productid}`);
      
      console.log('scan good ', good.data, String(good.data).length);
      
      commit(MT.SET_VALIDPRODUCT, String(good.data) );
    //  commit(MT.LOADING,false);
    } catch (error) {
      console.log('error occured on getCheckupGood',error);
      commit(MT.ERROR, error);
    //  commit(MT.LOADING,false);
    }
  }

  async function getBcrCheck({ commit }, param) {
    try {
      // commit(MT.LOADING,true);
      const pick = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getBcrCheck?groupkey=${param.groupkey}&masterCartCode=${param.masterCartCode}`);
      console.log('All pick cancel result is',pick.data);
      return pick.data;
      // commit(MT.LOADING,false);
    } catch (error) {
      console.log('error occured on doBcrCheck' , error);
      commit(MT.ERROR, error);
      // commit(MT.LOADING,false);
    }
  }

  async function getProductInfoTarget({ commit }, param) {
    try {
      // commit(MT.LOADING,true);
      console.log('getProductInfoTarget', param);
      const pick = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getProductInfoTarget?orderCode=${param.orderCode}&productId=${param.productId}&storeCode=${param.storeCode}&orderDetailSeq=${param.orderDetailSeq}`);
      console.log('getProductInfo ',pick.data);
      // commit(MT.SET_PRODUCT, pick.data[0]);
      // commit(MT.LOADING,false);
      commit(MT.SET_PRODUCT_TARGET, pick.data[0]);
    } catch (error) {
      console.log('error occured on getProductInfo' , error);
      commit(MT.ERROR, error);
      // commit(MT.LOADING,false);
    }
  }

  async function getProductInfo({ commit }, param) {
    try {
      // commit(MT.LOADING,true);
      const pick = await getHttp(`${process.env.VUE_APP_BASE_URL}/api/getProductInfo?orderCode=${param.orderCode}&productId=${param.productId}&storeCode=${param.storeCode}&orderDetailSeq=${param.orderDetailSeq}`);
      console.log('getProductInfo ',pick.data);
      commit(MT.SET_PRODUCT, pick.data[0]);
      // commit(MT.LOADING,false);
    } catch (error) {
      console.log('error occured on getProductInfo' , error);
      commit(MT.ERROR, error);
      // commit(MT.LOADING,false);
    }
  }
  
  function setProductInfo({commit},param){
    commit(MT.SET_PRODUCT, param);
  }

  function setLoading({commit},payload){
    commit(MT.LOADING,payload);
  }

  export default {
    getGoods,
    getGoodAll,
    getGoodDetailList,
    setCurrentProductCount,
    setGood,
    getGoodTotList,
    getCheckupGood,
    setAllcQty,
    setPickQty,
    dopick,
    doallpick,
    doallcancelpick,
    getProductByBarcode,
    getAssignTotList,
    setLoading,
    getBcrCheck,
    getProductInfo,
    setProductInfo,
    setGoodDetailList,
    getProductInfoTarget,
  }
  