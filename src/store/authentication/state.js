const generateState = () => ({
  data: {
    userid: '',
    token: '',
    expiresAt: null,
    storeCode:'',
    userData: {
      // userName:'',
      // authorities:[
      // ]
    },
    loading: false,
    error: null,
    isAuthenticated:false,
    OMS_STATUS : [],
    OMS_DELI_DIV : [],
    OMS_DELI_ORDER : [],
    OMS_DELI_METHOD : [],
    OMS_PICK_AREA : [],
  }
});

export default { ...generateState() };
