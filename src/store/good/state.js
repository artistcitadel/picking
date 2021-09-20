const generateState = () => ({
    data: {
      goodList: [],
      goodDetailList:[],
      good:{},
      goods:[],
      totList:[],
      assigntotList:[],
      totelist:[],
      product:{},
      productTarget:{},
    },
    loading: false,
    error: null,
    groupkey:'',
    currentproductcount:1,
    isrightproduct:false,
    allcQty:0,
    pickQty:0,
    validproduct:'',
  });
  
  export default { ...generateState() };
  