import MT from './types';

const setLoading = (state, payload) => {
  state.loading = payload;
};

const setError = (state, payload) => {
  state.loading = false;
  state.error = payload;
};

const setPickList = (state, payload) => {
  state.data.pickList = payload;
  state.loading = false;
  state.error = null;
};

const setPick = (state, payload) => {
  state.data.pick = payload;
  state.loading = false;
  state.error = null;
};

const setOrderCode = (state, payload) => {
  state.data.orderCode = payload;
}

const setProductList = (state, payload) => {
  state.data.productList = payload;
  state.loading = false;
  state.error = null;
};

const setOwner = (state, payload) => {
  state.data.owner = payload;
  state.loading = false;
  state.error = null;
};

const setTotList = (state, payload) => {
  state.data.totList = payload;
  state.loading = false;
  state.error = null;
};

const setGroupKey = (state, payload) => {
  state.groupkey = payload;
  
};

const setHasAssignTot = (state, payload) => {
  state.data.hasAssigntot = payload;
  state.loading = false;
  state.error = null;
};

const setDeliveryAssignTot = (state, payload) => {
  state.data.assignDeliveryinfo = payload;
  state.loading = false;
  state.error = null;
};

const setMemo = (state, payload) => {
  state.data.memo = payload;
  //state.loading = false;
  //state.error = null;
};

const setJobList = (state, payload) => {
  state.data.jobList = payload;
};

const setStage = (state, payload) => {
  state.data.stage = payload;
};

export default {
  [MT.LOADING]: setLoading,
  [MT.ERROR]: setError,
  [MT.SET_PICK_LIST]: setPickList,
  [MT.SET_PICK]: setPick,
  [MT.SET_ORDERCODE]: setOrderCode,
  [MT.SET_PRODUCTLIST]: setProductList,
  [MT.SET_OWNER]: setOwner,
  [MT.SET_TOTLIST]: setTotList,
  [MT.SET_GROUPKEY]: setGroupKey,
  [MT.SET_HASASSIGNTOT]: setHasAssignTot,
  [MT.SET_DELIVERYASSIGNTOT]: setDeliveryAssignTot,
  [MT.SET_MEMO]: setMemo,
  [MT.SET_JOBLIST]: setJobList,
  [MT.SET_STAGE]: setStage,
}
