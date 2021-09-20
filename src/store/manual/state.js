const generateState = () => ({
    data: {
      orderspec:[],
      manualPickList:[],
      inspectionList:[],
      eventList:[],
    },
    loading: false,
    error: null,
  });
  
  export default { ...generateState() };
  