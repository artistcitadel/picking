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

export default {
  [MT.LOADING]: setLoading,
  [MT.ERROR]: setError,
  [MT.SET_ORDERSPEC]: setOrderspec,
}
