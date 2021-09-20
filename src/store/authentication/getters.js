function isLoading(state) {
  return state.data.loading;
}
  
function hasError(state) {
  return state.data.error;
}

function getUserid(state) {
  return state.data.userid;
}
function getUserdata(state) {
  return state.data.userData;
}

function getAuth(state){
  return state.data.getAuth;
}

function getStoreCode(state){
  return state.data.storeCode;
}

function getOMS_STATUS(state) {
  return _.filter(state.data.OMS_STATUS, function(o) { 
    return (o.ETC_CODE==='01' || o.ETC_CODE==='05' || o.ETC_CODE==='10' || o.ETC_CODE==='12' || o.ETC_CODE==='15');
  });

  //return state.data.OMS_STATUS
}
function getOMS_DELI_DIV(state) {
  return state.data.OMS_DELI_DIV;
}
function getOMS_DELI_ORDER(state) {
  return state.data.OMS_DELI_ORDER;
}
function getOMS_DELI_METHOD(state) {
  return state.data.OMS_DELI_METHOD;
}
function getOMS_PICK_AREA(state) {
  return state.data.OMS_PICK_AREA;
}

export default {
  isLoading,
  hasError,
  getUserid,
  getUserdata,
  getOMS_STATUS,
  getOMS_DELI_DIV,
  getOMS_DELI_ORDER,
  getOMS_DELI_METHOD,
  getOMS_PICK_AREA,
  getAuth,
  getStoreCode,
};
  