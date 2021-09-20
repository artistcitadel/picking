import { _ } from "core-js";

  function getGoodList(state) {
    return state.data.goodList;
  }
   
  function getGoodDetailList(state) {
    return state.data.goodDetailList;
  }

  function isLoading(state) {
    return state.loading;
  }
  
  function hasError(state) {
    return state.error;
  }
  
  function getCurrentProductCount(state) {
    return state.currentproductcount;
  }

  function getGood(state) {
    return state.data.good;
  }

  function getGoods(state) {
    return state.data.goods;
  }

  function getTotList(state) {
    // let ary = [];
    // let keys = [];
    // let objs=[];
    // const data = _.groupBy(state.data.totList, function(v){
    //      return v.DELI_NO;
    // });
    // _.map(data,function(v,k){
    //   console.log(k);
    //   let obj = {};
    //   obj.deliNo=k;
    //   obj.count=0;
    //   objs.push(obj);
      

    // });
    // _.chain(state.data.totList)
    // .groupBy('DELI_NO')
    // .toPairs()
    // .map(function(v,k) {
    //   for(let i=0;i<v.length;i++){
    //     if(_.isArray(v[i])){
    //       for(let j=0;j<v[i].length;j++){
    //         // if(!_.isUndefined(v[i][j]['DELI_DETAIL_SEQ'])){
    //         //   console.log(v[i][j]['DELI_DETAIL_SEQ']);
    //         // }
    //         if(!_.includes(keys,(v[i][j]['DELI_NO']))){
    //           keys.push(v[i][j]['DELI_NO']);
    //         }
    //       }
    //     }
    //   }
    // }).value();

    // const data = _.groupBy(state.data.totList, function(v){
    //   return v.DELI_NO;
    // });
    // console.log("maniplate data",data);
    return state.data.totList;
  }

  function getCheckupGood(state) {
    return state.isrightproduct;
  }

  function getAllcQty(state) {
    return state.allcQty;
  }

  function getPickQty(state) {
    return state.pickQty;
  }

  function getValidProduct(state) {
    return state.validproduct;
  }

  function getassigntotList(state) {
    return state.data.assigntotList;
  }

  function gettotelist(state) {
    return state.data.totelist;
  }

  function getProduct(state) {
    return state.data.product;
  }

  function getProductTarget(state) {
    return state.data.productTarget;
  }

  export default {
    getGoodList,
    getGoodDetailList,
    isLoading,
    hasError,
    getCurrentProductCount,
    getGood,
    getGoods,
    getTotList,
    getCheckupGood,
    getAllcQty,
    getPickQty,
    getValidProduct,
    getassigntotList,
    gettotelist,
    getProduct,
    getProductTarget,
  };
  