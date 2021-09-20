import MT from './types';

const setLoading = (state, payload) => {
  state.loading = payload;
};

const setError = (state, payload) => {
  state.loading = false;
  state.error = payload;
};

const setGoodList = (state, payload) => {
  state.data.goodList = payload;
  state.loading = false;
  state.error = null;
};

const setGoodDetailList = (state, payload) => {
  state.data.goodDetailList = payload;
  state.loading = false;
  state.error = null;
};

const setGroupkey = (state, payload) => {
  state.groupkey = payload;
};

const setCurrentproductcount = (state,payload) => {
  state.currentproductcount=payload;
};

const setGood = (state,payload) => {
  state.data.good=payload;
};

const setGoods = (state,payload) => {
  state.data.goods=payload;
};

const setGoodTotList = (state, payload) => {
  state.data.totList = payload;
  state.loading = false;
  state.error = null;
};

const setCheckupGood = (state, payload) => {
  state.isrightproduct = payload;
  state.loading = false;
  state.error = null;
};

const setAllcQty = (state,payload) => {
  state.allcQty=payload;
};

const setPickQty = (state,payload) => {
  state.pickQty=payload;
};

const setValidProduct = (state,payload) => {
  state.validproduct=payload;
};

const setAssignTotList = (state, payload) => {
  state.data.assigntotList = payload;
};

const setTotelist = (state, payload) => {
  state.data.totelist = payload;
};

const setProduct = (state, payload) => {
  state.data.product = payload;
};

const setProductTarget = (state, payload) => {
  state.data.productTarget = payload;
};

export default {
  [MT.LOADING]: setLoading,
  [MT.ERROR]: setError,
  [MT.SET_GOOD_LIST]: setGoodList,
  [MT.SET_GOOD_DETAIL_LIST]: setGoodDetailList,
  [MT.SET_CURRENT_PRODUCT_COUNT]: setCurrentproductcount,
  [MT.SET_GOOD]: setGood,
  [MT.SET_GOOD_TOTLIST]: setGoodTotList,
  [MT.SET_GOODS]: setGoods,
  [MT.SET_CHECKUP_GOOD]: setCheckupGood,
  [MT.SET_ALLC_QTY]: setAllcQty,
  [MT.SET_PICK_QTY]: setPickQty,
  [MT.SET_VALIDPRODUCT]: setValidProduct,
  [MT.SET_ASSIGNTOTLIST]: setAssignTotList,
  [MT.SET_TOTELIST]: setTotelist,
  [MT.SET_PRODUCT]: setProduct,
  [MT.SET_PRODUCT_TARGET]: setProductTarget,
}
