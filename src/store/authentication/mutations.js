import MT from './types';

const setLoading = (state, payload) => {
  state.data.loading = payload;
};

const setError = (state, payload) => {
  state.data.loading = false;
  state.data.error = payload;
};
const setAuth = (state,payload) => {
  console.log('setAuth called',payload);
  state.data.isAuthenticated = payload;
};
const setUserid = (state, payload) => {
  console.log('userid payload',payload);
  state.data.userid = payload;
  console.log('setUserid', state.data.userid);
};
const setUserData = (state, payload) => {
  state.data.userData = payload;
};

const setOMS_STATUS = (state, payload) => {
  state.data.OMS_STATUS = payload;
};
const setOMS_DELI_DIV = (state, payload) => {
  state.data.OMS_DELI_DIV = payload;
};
const setOMS_DELI_ORDER = (state, payload) => {
  state.data.OMS_DELI_ORDER = payload;
};
const setOMS_DELI_METHOD = (state, payload) => {
  state.data.OMS_DELI_METHOD = payload;
};
const setOMS_PICK_AREA = (state, payload) => {
  state.data.OMS_PICK_AREA = payload;
};
const setStoreCode = (state, payload) => {
  state.data.storeCode = payload;
};
export default {
  [MT.LOADING] : setLoading,
  [MT.ERROR] : setError,
  [MT.AUTH] : setAuth,
  [MT.SET_USERID] : setUserid,
  [MT.USERDATA] : setUserData,

  [MT.OMS_STATUS] : setOMS_STATUS,
  [MT.OMS_DELI_DIV] : setOMS_DELI_DIV,
  [MT.OMS_DELI_ORDER] : setOMS_DELI_ORDER,
  [MT.OMS_DELI_METHOD] : setOMS_DELI_METHOD,
  [MT.OMS_PICK_AREA] : setOMS_PICK_AREA,
  [MT.SET_STORECODE] : setStoreCode,
}
