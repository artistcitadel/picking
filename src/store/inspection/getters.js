import state from "./state";

function getOrderspec(state) {
  return state.data.orderspec;
}
   
function isLoading(state) {
  return state.loading;
}
  
function hasError(state) {
  return state.error;
}

function getInspectionList(state) {
  return state.data.inspectionList;
}

function getCodeInfo(state) {
  return state.data.codeInfo;
}

export default {
  getOrderspec,
  isLoading,
  hasError,
  getInspectionList,
  getCodeInfo,
};
  