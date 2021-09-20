const generateState = () => ({
  data: {
    orderspec:[],
    inspectionList:[],
  },
  loading: false,
  error: null,
});
  
export default { ...generateState() };
  