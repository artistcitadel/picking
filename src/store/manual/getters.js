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

  function getManualPickList(state){
    return state.data.manualPickList;
  }

  function getInspectionList(state){
    return state.data.inspectionList;
  }

  function getEventList(state){
    return state.data.eventList;
  }

  export default {
    getOrderspec,
    isLoading,
    hasError,
    getManualPickList,
    getInspectionList,
    getEventList,
  };
  