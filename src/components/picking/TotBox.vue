<template>
<div class="modal for-tote-box-modal" id="for-tote-box-modal">
  <div class="layer">
    <div class="layer-content">
      <div class="modal-inner modal-lg">
        <div class="modal-close close-wh" @click="modalclose"></div>
        <!--아래 클랙스로 색상구분 tote-red, tote-green-->
        <div class="tote-modal-header tote-blue">
          <div class="tote-box-header">
            <div class="tote-title"> {{totearea}} </div>
            <div class="tote-order-info">
               <li>주문번호 : <span class="text-yw">#{{deliNo.substring(9)}}</span></li>
              <!-- <li>토트번호 : <span class="text-yw">#{{masterCartCode}}</span><span class="text-yw" v-if="appendCartCode!==''">{{appendCartCode}}</span></li> -->
              <li>토트번호 : <span class="text-yw">#{{currentCartCode}}</span></li>
              <li>주문자 : <span class="text-yw">{{orderName}}</span></li>
            </div>
          </div>
          <div class="tote-section-area">
           <div class="tote-content-area">
            <div class="scan-area">
            <div class="scan-input">
              <input type="text" ref="barcodeinput" v-model="barcodeValue" v-on:keyup.enter="barcodeaction" placeholder="바코드를 스캔하세요.">
              <button type="button" class="ic-scan"></button>
            </div>
          </div>
          <div class="modal-content tote-box-content">
            <div class="number-set-area">
              <div class="number-area">
              <div class="number-wrap"> <span class="minus" @click="decreasepickproduct"></span>
                <div class="input-number-wrap">
                    <input class="input-number" style="width:10%" type="text" readonly>
                  <span class="input-number-total">{{getPickQty}}/<span class="fontbold">{{getAllcQty}}</span></span> </div>
                <span class="plus" @click="increasepickproduct"></span> </div>
            </div>
              <div class="number-btn">
              <button type="button" class="btn" @click="increaseaddup">전체</button>
              </div>
            </div>
            <span class="float" v-bind:style="{ 'color': 'blue' }">{{replaceMessage}}</span>
            <div class="btn-area">
               <div class="row">
                <div>
                  <button type="button" class="btn btn-big btn-bk-outline modal-open replace-modal" @click="alteropen">대체</button>
                </div>
                <div>
                  <button type="button" class="btn btn-big btn-primary-outline modal-open replace-over-modal" @click="limitopen">품절</button>
                </div>
                <div>
                  <button type="button" class="btn btn-big btn-bk" @click="alterPick">{{alterlationtitle}}</button>
                </div>
                <div v-if="masterCartCode!='*'">
                  <button type="button" class="btn btn-big btn-primary" @click="dopick">피킹</button>
                </div>
                <div>
                  <button type="button" class="btn btn-big btn-bk" @click="cancelpick">취소</button>
                </div>
              </div>
            </div>

          </div>

          <!-- <div class="scan-area">
            <div class="scan-input scan-input-btn-set">
              <div class="row">
                <div>
                  <input type="text" ref="totbarcodeinput" v-model="totbarcodeValue" v-on:keyup.enter="totbarcodeaction" placeholder="토트 박스 바코드를 스캔하세요.">
                  <button type="button" class="ic-scan"></button>
                </div>
                <div>
                  <button type="button" class="btn btn-ml btn-bk">토트추가</button>
                </div>
              </div>
            </div>
          </div> -->
          </div>
         <div class="tote-real-area">
         <div class="tote-box-area">
            <div class="tote-box-wrap tote-blue">
              <div class="row">
                <div>
                  <div ref="cart0" v-bind:class="['tote-box', (totearea!==1) ? 'disable' : '' ]">
                   #1
                  </div>
                </div>
                <div>
                  <div ref="cart1" v-bind:class="['tote-box', (totearea!==2) ? 'disable' : '' ]">
                    #2
                  </div>
                </div>
              </div>
            </div>
            <div class="tote-box-wrap tote-red">
              <div class="row">
                <div>
                  <div ref="cart2" v-bind:class="['tote-box', (totearea!==3) ? 'disable' : '' ]">
                   #3
                  </div>
                </div>
                <div>
                  <div ref="cart3" v-bind:class="['tote-box', (totearea!==4) ? 'disable' : '' ]">
                   #4
                  </div>
                </div>
              </div>
            </div>
            <div class="tote-box-wrap tote-green">
              <div class="row">
                <div>
                  <div ref="cart4" v-bind:class="['tote-box', (totearea!==5) ? 'disable' : '' ]">
                   #5
                  </div>
                </div>
                <div>
                  <div ref="cart5" v-bind:class="['tote-box', (totearea!==6) ? 'disable' : '' ]">
                   #6
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
        
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import VueBarcode from 'vue-barcode';
import {mapGetters} from 'vuex';
import Swal from 'sweetalert2';

 export default {
    name: 'TotBox',
    props: {
      deliNo : {
                  type: String,
                  require: true 
               },
    //  masterCartCode : {
    //               type: String,
    //               require: true 
    //            },
    //  orderName : {
    //               type: String,
    //               require: true 
    //            },
    //  deliDetailSeq : {
    //               type: String,
    //               require: true 
    //          },    
    }
    ,
    components: {
      'barcode': VueBarcode,
    },
    data: () => ({
      alterlationtitle : '피킹',
      deliDetailSeq:'',
      orderName:'',
      masterCartCode:'',
      toteArea:'',
      orderCode:'',

      currentCartCode:'',
      appendCartCode:'',
      barcodeValue: '',
      currentPorductId:'',
      status:0,
      currentStatus:0,
      title:'피킹처리 하시겠습니까?',
      pbuttontitle:'피킹처리!',
      originallcqty:'0',
      originpickqty:0,
      groupkey:'',
      toteType:'M',
      pickCartCode:'',
      totearea:'',
      picknode:'standard',
      toteentry:[],
      orderCnclType:'0',
      orgProductId:'',
      orgDeliNo:'',
      isreplace:false,
      qty:'0',
      orderCodeSeq:'',
      hasbeenreplace : false,
      replaceReasonCode:'0',
      replaceMessage:'',
    })
    ,
    computed: {
       ...mapGetters('GoodStore', [
         'getCheckupGood',
         'getAllcQty',
         'getPickQty',
         'isLoading',
         'getValidProduct',
      ])
      ,
      // groupkey() {
      //   return this.$route.params.id;
      // }
    }
    ,
    methods: {
      modalclose() {
        this.picknode='standard';
        this.$emit('modal-close',this.status,this.isreplace,this.hasbeenreplace);
      }
      ,
      alteropen() {
        // if(!_.isUndefined(this.orgProductId) && this.orgProductId!==''){
        if(this.isreplace)  {
          Swal.fire({
                title: '대체불가상품입니다!',
                text: "",
                type: 'warning',
                 onAfterClose: () => {
                this.$refs.barcodeinput.focus();
              }
              })
              return;  
        }
        if(this.originpickqty===this.getAllcQty){
        Swal.fire({
                title: '피킹완료건입니다!',
                text: "",
                type: 'warning',
                 onAfterClose: () => {
                this.$refs.barcodeinput.focus();
              }
              })
              return;
      }
        this.$emit('alter-open',this.orderCode, this.currentCartCode);
      }
      ,
      limitopen() {
        // this.$emit('limit-open');
        if(this.originpickqty===this.getAllcQty){
        Swal.fire({
                title: '피킹완료건입니다!',
                text: "",
                type: 'warning',
                 onAfterClose: () => {
                this.$refs.barcodeinput.focus();
              }
              })
              return;
      }
        this.status='99';
        this.title='품절처리하시겠습니까!';
        this.pbuttontitle = '품절';
        this.orderCnclType='1';
        this.picknode='outofstock';
        this.pick();
      },
    
    barcodeaction(e){
      console.log(this.toteentry);
      console.log(e.target.value, e.target.value.length);
      let tentry = [];
       _.map(this.toteentry,function(v,k){
           console.log(k,'->',v);
           if(v.indexOf(",")===-1)
            tentry.push(v);
          else{
            let arr = v.split(",");
            for(let i=0;i<arr.length;i++){
              tentry.push(arr[i]);
            }
          }
      });
      console.log(tentry);
      const svalue=e.target.value;
      if(svalue.length===6){
        if(_.includes(tentry,svalue)){
           Swal.fire({
              type: 'error',
              title: 'NG!',
              text: '이미 할당된 토트박스입니다!',
            });
            this.barcodeValue='';
            this.picknode="standard";
            return;
        }
        //  this.appendCartCode=svalue;
        this.currentCartCode=svalue;
         this.$forceUpdate();
         this.picknode="append";
         this.$emit('pass-totetype','C',svalue);
         this.barcodeValue='';
         this.$refs.barcodeinput.focus();
        return;
      }

       let isreject=false;
       this.$store.dispatch('GoodStore/getProductByBarcode', e.target.value).then(() => {
          console.log('after validation product code',this.getValidProduct, svalue);
          // if(this.getValidProduct!=svalue){
             if(this.getValidProduct!=this.currentPorductId){
            Swal.fire({
                title: '잘못된 바코드 해당하는 상품을 스캔하세요!',
                text: "",
                type: 'warning',
              });
              this.barcodeValue='';
              this.$refs.barcodeinput.focus();
              return;
      }
     
     
      // if(this.currentPorductId!==pid){
      //   Swal.fire({
      //         type: 'error',
      //         title: 'NG!',
      //         text: '상품이 일치하지 않습니다!',
      //       });
      //       this.$refs.barcodeinput.focus();
      //       return;
      // }
      (this.getAllcQty!==this.getPickQty)?this.$store.dispatch('GoodStore/setPickQty', this.getPickQty+1):"";
      
      // this.$store.dispatch('GoodStore/getCheckupGood', pid).then(() => {
      //   this.$store.dispatch('GoodStore/setPickQty', this.getPickQty+1);
      // });
    this.barcodeValue='';
    this.$refs.barcodeinput.focus();
     });
    }
    ,

    // totbarcodeaction(e){
    //   console.log(e.target.value);
    //   let pid = e.target.value;
    //   if(this.currentPorductId!==pid){
    //     Swal.fire({
    //           type: 'error',
    //           title: 'NG!',
    //           text: '상품이 일치하지 않습니다!',
    //         });
    //         return;
    //   }
    //   (this.getAllcQty!==this.getPickQty)?this.$store.dispatch('GoodStore/setPickQty', this.getPickQty+1):"";
    //   this.increasepickproduct();
    //   // this.$store.dispatch('GoodStore/getCheckupGood', pid).then(() => {
    //   //   this.$store.dispatch('GoodStore/setPickQty', this.getPickQty+1);
    //   // });
    
    // }
    // ,
    setqty(allcQty,pickQty,productId,status,groupkey,masterToteArea,pickArea,appendtoteboxentry,toteentry, orderName, masterCartCode,deliDetailSeq, orgProductId, orderCode, currentCartCode, isreplace,qty,orderCodeSeq, replaceMessage){
      this.hasbeenreplace=false,
      this.qty=qty;
      this.isreplace = isreplace;
      this.picknode='standard';
      console.log('masterCartCode',masterCartCode);
      console.log('currentCartCode',currentCartCode)
      console.log(appendtoteboxentry);
      console.log(toteentry);
      this.appendtoteboxentry = appendtoteboxentry;
      // console.log(productId);
      console.log('status',status);
      console.log('allcqty',allcQty);
      console.log('pickqty', pickQty);
      this.orderCode=orderCode;
      this.orderCodeSeq=orderCodeSeq;
      // this.masterCartCode=masterCartCode;
      this.masterCartCode=masterCartCode;
      this.currentCartCode=currentCartCode;
      this.deliDetailSeq = deliDetailSeq;
      this.currentPorductId = productId;
      this.totearea = masterToteArea;
      this.pickArea=pickArea;
      this.pickCartCode=masterCartCode;
      this.currentStatus=status;
      this.$store.dispatch('GoodStore/setAllcQty', allcQty);
      this.$store.dispatch('GoodStore/setPickQty', pickQty);
      this.originpickqty = pickQty;
      // alert(this.originpickqty);
      if(this.originpickqty===0){
        this.increasepickproduct();
      }
      this.groupkey=groupkey;
      this.orderName=orderName;
      this.orgProductId = orgProductId;
      if(toteentry.length>0){
        console.log(this.$refs['cart'+(masterToteArea-1)]);
        const el = this.$refs['cart'+(masterToteArea-1)];
        el.classList.remove('disable');
      }
      this.appendCartCode="";
      // if(!_.isUndefined(appendtoteboxentry) && appendtoteboxentry.indexOf(",")!==-1){
      //   this.appendCartCode=appendtoteboxentry.substring(appendtoteboxentry.lastIndexOf(",")+1);
      //   this.picknode='append';
      // }
      if(this.masterCartCode!==this.currentCartCode){
        this.picknode='append';
      }
      this.toteentry=toteentry;
      this.barcodeValue="";
      this.$refs.barcodeinput.focus();
      
      if(masterCartCode!=='*'){
        this.alterlationtitle='이형';
      }
      this.replaceMessage = replaceMessage;
    }
    ,
    setInputFocus(){
      this.$refs.barcodeinput.focus();
    }
    ,
    decreasepickproduct(){
      if((this.getPickQty-1)<this.originpickqty)return;
      (this.getPickQty!==0)?this.$store.dispatch('GoodStore/setPickQty', this.getPickQty-1):"";
    }
    ,
    increasepickproduct(){
      //const temp = this.appendCartCode;
      (this.getAllcQty!==this.getPickQty)?this.$store.dispatch('GoodStore/setPickQty', this.getPickQty+1):"";
      //this.appendCartCode=temp;
    }
    ,
    increaseaddup(){
      this.$store.dispatch('GoodStore/setPickQty', this.getAllcQty);
    }
    ,
    alterPick(){
      // console.log(this.originpickqty, this.getAllcQty,(this.originpickqty===this.getAllcQty));
      if(this.originpickqty===this.getAllcQty){
        Swal.fire({
                title: '피킹완료건입니다!',
                text: "",
                type: 'warning',
                 onAfterClose: () => {
                this.$refs.barcodeinput.focus();
              }
              })
              return;
      }
      // this.status='40';
      this.status='01';
      this.pickArea='E';
      this.replaceReasonCode='0';
      this.pickQty=this.getAllcQty;
      this.title='이형처리하시겠습니까!';
      this.pbuttontitle = '이형';
      this.orderCnclType='3';
      this.orgDeliNo=this.deliNo;
      this.picknode='alter';
      this.currentCartCode="";
      this.hasbeenreplace=true;
      this.pick();
    }
    ,
    dopick(){
      console.log(this.originpickqty, this.getPickQty);
      if(this.getPickQty===0 || this.originpickqty===this.getPickQty){
        Swal.fire({
                title: '피킹된 건이 없습니다!',
                text: "",
                type: 'warning',
                 onAfterClose: () => {
                this.$refs.barcodeinput.focus();
              }
              })
        return;
      }
      (this.getPickQty!=this.getAllcQty)?this.status='12':this.status='15';
      // this.title='피킹처리하시겠습니까!';
      this.title=`토트박스 #${this.currentCartCode} 에 피킹처리됩니다 피킹처리하시겠습니까!`;
      this.toteType='M';
      this.pickCartCode = this.masterCartCode;
      // this.pickQty=this.getPickQty;
      // console.log('qty',this.getPickQty, this.originpickqty,this.getPickQty-this.originpickqty);
      this.pickQty=this.getPickQty-this.originpickqty;

      // if(this.appendCartCode!==''){
      if(this.picknode==='append'){  
        // this.title=`추가토트박스 #${this.appendCartCode} 에 피킹처리됩니다 피킹처리하시겠습니까!`;
        this.title=`토트박스 #${this.currentCartCode} 에 피킹처리됩니다 피킹처리하시겠습니까!`;
        this.toteType='A';
        // this.pickCartCode = this.appendCartCode;
        this.pickCartCode = this.currentCartCode;
      }
      this.pbuttontitle = '피킹';
      this.pick();
    }
    ,
    cancelpick(){
      
      if(this.currentStatus!=='40' && this.getPickQty===0){
        Swal.fire({
                title: '피킹된 건이 없습니다!',
                text: "",
                type: 'warning',
                 onAfterClose: () => {
                this.$refs.barcodeinput.focus();
              }
              })
        return;
      }
      //BCR check
      // let aidx = this.appendtoteboxentry.indexOf(",");
      // const cartCode = (aidx===-1)?
      //                  this.pickCartCode:
      //                  this.appendtoteboxentry.split(",").join(",");
      const cartCode = this.currentCartCode;
      
      const param = {
        'groupkey':this.groupkey,
        'masterCartCode':cartCode==='*'?"'*'":cartCode,
      }
      console.log(param);
      this.$store.dispatch('GoodStore/getBcrCheck', param).then((data) => {
        console.log(data);
        if(data!==0){
          Swal.fire({
             title: 'BCR 스캔 완료된 건입니다!',
             text: "",
             type: 'warning',
           })
          return;
        }
      });
      //BCR check end

      this.$store.dispatch('GoodStore/setPickQty', 0);
      this.pickQty=0;
      this.status='10';
      this.picknode="cancellation";
      this.originallcqty=this.allcQty;
      this.allcQty='0';
      this.orderCnclType='0';
      this.title='피킹취소하시겠습니까!';
      if(this.isreplace)
        this.title='대체건임으로 원래상품으로 대체됩니다 피킹취소하시겠습니까!';
      this.pbuttontitle = '피킹취소';
      this.pick();
    }
    ,
    pick(){
      // if(this.currentStatus==='15'){
      //     Swal.fire({
      //       title: '피킹완료된 건입니다!',
      //       text: "",
      //       type: 'warning',
      //     })
      //     return;
      // }
      Swal.fire({
            title: this.title,
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this.pbuttontitle,
            cancelButtonText: '취소!'
          }).then((result) => {
            if(result.dismiss==='cancel')return;
            if (result) {
              let param = {
                  deliNo: this.deliNo,
                  status: this.status,
                  deliDetailSeq: this.deliDetailSeq,
                  masterCartCode: this.masterCartCode,
                  // currentCartCode:this.pickCartCode,
                  currentCartCode:this.currentCartCode,
                  pickQty: this.pickQty,
                  totalPickQty:this.getPickQty,
                  pickArea:this.pickArea,
                  toteType:this.toteType,
                  toteArea:this.totearea,
                  pickerId:sessionStorage.getItem("userid"),
                  groupkey:this.groupkey,
                  orderCnclType:this.orderCnclType,
                  picknode:this.picknode,
                  storeCode:sessionStorage.getItem("storeCode"),
                  allcQty:this.getAllcQty,
                  replaceReasonCode:this.replaceReasonCode,
                  subPickNode:'',
                }
                if(this.isreplace){
                  param.subPickNode='recovery';
                  param.orgProductId=this.orgProductId;
                  param.allcQty=this.qty;
                }
              //  alert(this.currentCartCode)
                if(this.currentCartCode==='*'){
                  param.picknode='alterindex';
                }
              
                console.log('do picking',param);
                
                if(param.picknode==='alterindex'){
                  let params = [];
                  params.push(param);
                  this.$store.dispatch('ManualStore/doPick', params).then(() => {
                  
                  });
                }
                if(param.picknode==='alterindex')return;
                
                this.$store.dispatch('GoodStore/dopick', param).then(() => {
                  if(this.status==='10'){
                    this.$store.dispatch('GoodStore/setPickQty', 0);
                  }
                  console.log(this.getPickQty,'==>' ,this.getAllcQty,this.getPickQty===this.getAllcQty);
                   if(this.getPickQty===this.getAllcQty || this.status==='40' || this.isreplace || this.picknode==='outofstock' || this.picknode==='alter'){
                     this.modalclose();
                   }

                  this.originpickqty = this.getPickQty;
                  this.allcQty=this.originallcqty;
                  this.barcodeValue="";
                  if(this.picknode!=='append')this.picknode="standard";

                });
              
              // Swal.fire(
              //   '피킹완료되었습니다.'
              // )
              // this.toteType='M';
              // this.pickCartCode = this.masterCartCode;
              
            }
          })
      
    }
    ,
    setNode(node){
      this.hasbeenreplace=true;
    }
    ,
  }
  ,
  mounted(){
    
  }
  ,
 
 } 
</script>
<style scoped>
.btn-big {
  min-width: 110px;
}
.fontbold {
  font-weight: 600;
  color:black;
}
.float {
  /* border: 2px solid red; */
  float: left;
  margin-left: 120px;
  }
</style>
