import MT from './types';

const setLoading = (state, payload) => {
  state.loading = payload;
};

const setError = (state, payload) => {
  state.loading = false;
  state.error = payload;
};

const setOrderspec = (state, payload) => {
  state.data.orderspec = payload;
  state.loading = false;
  state.error = null;
};

const setManualPickList = (state, payload) => {
  state.data.manualPickList = payload;
  state.loading = false;
  state.error = null;
}

const setInspectionList = (state, payload) => {
  state.data.inspectionList = payload;
  state.loading = false;
  state.error = null;
}

const setEventList = (state, payload) => {
  state.data.inspectionList = payload;
  state.loading = false;
  state.error = null;
}

export default {
  [MT.LOADING]: setLoading,
  [MT.ERROR]: setError,
  [MT.SET_ORDERSPEC]: setOrderspec,
  [MT.SET_MANUALPICK_LIST] : setManualPickList,
  [MT.SET_INSPECTION_LIST]: setInspectionList,
  [MT.SET_EVENT_LIST]: setEventList,
}
