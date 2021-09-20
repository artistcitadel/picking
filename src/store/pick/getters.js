function getPickList(state) {
  return state.data.pickList;
}

// function getPick(state) {
//   return state.data.pick;
// }

function isLoading(state) {
  return state.loading;
}

function hasError(state) {
  return state.error;
}

function getOrderCode(state){
  return state.data.orderCode;
}

function getProductList(state) {
  return state.data.productList;
}

function getOwner(state) {
  return state.data.owner;
}

function getTotList(state) {
  return state.data.totList;
}

function getMemo(state) {
  return state.data.memo;
}

function getJobList(state) {
  return state.data.jobList;
}

function getGroupkey(state) {
  return state.groupkey;
}

function getPickStage(state) {
  return state.data.stage;
}

export default {
  getPickList,
  getProductList,
  // getPick,
  isLoading,
  hasError,
  getOrderCode,
  getOwner,
  getTotList,
  getMemo,
  getJobList,
  getGroupkey,
  getPickStage,
};
