function getOrderspec(state) {
    return state.data.orderspec;
  }
   
  function isLoading(state) {
    return state.loading;
  }
  
  function hasError(state) {
    return state.error;
  }
  
  export default {
    getOrderspec,
    isLoading,
    hasError,
  };
  