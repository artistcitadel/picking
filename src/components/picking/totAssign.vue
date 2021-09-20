<template>
<main-layout>
  <div class="section">
  <div class="section-wrap basic-section-wrap"> 
    <!--토트박스할당-->
    <div class="picking-list-wrap d-flex">
      <div class="row"> 
        <!--제품정보-->
        <div class="content-left">
          <div class="scan-area">
            <div class="scan-input">
              <input type="text" ref="barcodeinput" v-model="barcodeValue" v-on:keyup.enter="barcodeaction" placeholder="토트박스를 스캔하세요.">
              <button type="button" class="ic-scan"></button>
            </div>
          </div>
          <!--테이블-->
          
          <div class="table-lg table-nowrap p-t-30">
            <table>
              <thead>
                <tr>
                  <th>주문번호</th>
                  <th>주문자명</th>
                  <th>토트박스</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-if="getTotList.length>0">
                <tr v-for="(pick,index) in getTotList" :key="index">
                  <td>#{{getTotList[index].orderCode.substring(9)}}</td>
                  <td>{{getTotList[index].orderName}}</td>
                  <td><span class="text-blue">{{getTotList[index].cartCode}}</span></td>
                  <td v-if="getTotList[index].cartCode!='' && getTotList[index].cartCode!=null ">
                    <!-- <b-button type="is-danger" @click="deleteMasterTrDetail(getTotList[index].deliNo)">삭제</b-button> -->
                    <button type="button" class="btn btn-sm btn-primary" @click="deleteMasterTrDetail(getTotList[index].deliNo)">삭제</button>
                    </td>
                </tr>
              </tbody>
            </table>
            <div class="btn-area">
              <button type="button" class="btn btn-lg btn-primary ic-arrow-right arrow-wh" @click="movepicklist" >다음단계</button>
            </div>
          </div>
        </div>
        <!--토트박스-->
        <div class="content-right">
          <div class="open-modal cart-modal btn-cart" @click="openCart">
            <li><img src="../../assets/images/ic-cart.png" alt="카트방향"></li>
            <li>카트방향</li>
          </div>
          <div class="tote-box-area">
            <div class="tote-box-wrap tote-blue">
              <div class="row">
                <div>
                  <div class="tote-box" v-if="getTotList.length>0">
                    <div class="tote-box-header">
                      <div class="tote-title">{{Number(getTotList[0].toteArea)+1}}</div>
                      <!-- <div class="tote-order">주문번호 : <span class="text-yw" v-if="getTotList.length>0 && getTotList[0].cartCode!=''  && getTotList[0].cartCode!=null">#{{getTotList[0].orderCode.substring(9)}}</span></div> -->
                      <div class="tote-order">주문번호 : <span class="text-yw" v-if="getTotList.length>0 && getTotList[0].orderCode!=null">#{{getTotList[0].orderCode.substring(9)}}</span></div>
                    </div>
                    <div class="tote-box-body"> <span class="text-bk bold" >{{getTotList[0].pickQty}}</span>/{{getTotList[0].qty}} </div>
                    <div class="tote-box-footer">
                      <li>토트박스</li>
                      <li><span>{{getTotList[0].cartCode}}</span></li>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="tote-box" v-if="getTotList.length>1">
                    <div class="tote-box-header">
                      <div class="tote-title">{{Number(getTotList[1].toteArea)+1}}</div>
                      <div class="tote-order">주문번호 : <span class="text-yw" v-if="getTotList.length>0 && getTotList[1].orderCode!=null">#{{getTotList[1].orderCode.substring(9)}}</span></div>
                    </div>
                    <div class="tote-box-body"> <span class="text-bk bold" >{{getTotList[1].pickQty}}</span>/{{getTotList[1].qty}} </div>
                    <div class="tote-box-footer">
                      <li>토트박스</li>
                      <li><span>{{getTotList[1].cartCode}}</span></li>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tote-box-wrap tote-red">
              <div class="row">
                <div>
                  <div class="tote-box"  v-if="getTotList.length>2">
                    <div class="tote-box-header">
                      <div class="tote-title">{{Number(getTotList[2].toteArea)+1}}</div>
                      <div class="tote-order">주문번호 : <span class="text-yw" v-if="getTotList.length>0 && getTotList[2].orderCode!=null">#{{getTotList[2].orderCode.substring(9)}}</span></div>
                    </div>
                    <div class="tote-box-body"> <span class="text-bk bold">{{getTotList[2].pickQty}}</span>/{{getTotList[2].qty}} </div>
                    <div class="tote-box-footer">
                      <li>토트박스</li>
                      <li><span>{{getTotList[2].cartCode}}</span></li>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="tote-box" v-if="getTotList.length>3">
                    <div class="tote-box-header">
                      <div class="tote-title">{{Number(getTotList[3].toteArea)+1}}</div>
                      <div class="tote-order">주문번호 : <span class="text-yw" v-if="getTotList.length>0 && getTotList[3].orderCode!=null">#{{getTotList[0].orderCode.substring(9)}}</span></div>
                    </div>
                    <div class="tote-box-body"> <span class="text-bk bold" >{{getTotList[3].pickQty}}</span>/{{getTotList[3].qty}} </div>
                    <div class="tote-box-footer">
                      <li>토트박스</li>
                      <li><span>{{getTotList[3].cartCode}}</span></li>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tote-box-wrap tote-green">
              <div class="row">
                <div>
                  <div class="tote-box" v-if="getTotList.length>4">
                    <div class="tote-box-header">
                      <div class="tote-title">{{Number(getTotList[4].toteArea)+1}}</div>
                      <div class="tote-order">주문번호 : <span class="text-yw" v-if="getTotList.length>0 && getTotList[4].orderCode!=null">#{{getTotList[0].orderCode.substring(9)}}</span></div>
                    </div>
                    <div class="tote-box-body" v-if="getTotList.length>0"> <span class="text-bk bold" >{{getTotList[4].pickQty}}</span>/{{getTotList[4].qty}} </div>
                    <div class="tote-box-footer">
                      <li>토트박스</li>
                      <li><span>{{getTotList[4].cartCode}}</span></li>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="tote-box" v-if="getTotList.length>5">
                    <div class="tote-box-header">
                      <div class="tote-title">{{Number(getTotList[5].toteArea)+1}}</div>
                      <div class="tote-order">주문번호 : <span class="text-yw" v-if="getTotList.length>0 && getTotList[5].orderCode!=null">#{{getTotList[0].orderCode.substring(9)}}</span></div>
                    </div>
                    <div class="tote-box-body"> <span class="text-bk bold" >{{getTotList[5].pickQty}}</span>/{{getTotList[5].qty}} </div>
                    <div class="tote-box-footer">
                      <li>토트박스</li>
                      <li><span >{{getTotList[5].cartCode}}</span></li>
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

  <cart-box @modal-close='cartclose' />

</div>

</main-layout>
</template>
<script>
import _ from 'lodash';
import $ from 'jquery';
import VueBarcode from 'vue-barcode';
// import Vue from 'vue';
// import { Button } from 'buefy'
// import 'buefy/dist/buefy.css'
// import { v1 } from 'uuid';
import Swal from 'sweetalert2';
import MainLayout from '../../layouts/Main.vue';
import Loader from '../../views/Loader';
import CartBox from '@/views/CartBox';
import {mapGetters} from 'vuex';
import changeRouteMixin from '@/mixin/changeRoute';
// import {setGroupKey} from '../../utils/commService';

// Vue.use(Button);

export default {
    name: 'totAssign'
    ,
    components: {
     'barcode': VueBarcode,
      MainLayout,
     'Loader': Loader,
      CartBox,
  },
  mixins: [changeRouteMixin],
  data: () => ({
    barcodeValue: '',
    totList:[],
    /*totList : [
     {cartCnt:"1",cartCode:"",deliNo:"202101010201057",orderCode:"20210101083038522",orderName:"민귀란",pickQty:"0","qty":"3",status:"15",toteArea:"1"},
     {cartCnt:"1",cartCode:"",deliNo:"202101010201053",orderCode:"20210101082412604",orderName:"성사라",pickQty:"0","qty":"3",status:"15",toteArea:"2"},
     {cartCnt:"1",cartCode:"",deliNo:"202101010201043",orderCode:"20210101033703352",orderName:"안선애",pickQty:"0","qty":"7",status:"15",toteArea:"3"},
     {cartCnt:"1",cartCode:"",deliNo:"202101010201002",orderCode:"20201231221714260",orderName:"장덕호",pickQty:"0","qty":"6",status:"15",toteArea:"4"},
     {cartCnt:"1",cartCode:"",deliNo:"202101010201045",orderCode:"20210101043933582",orderName:"최고은",pickQty:"0","qty":"4",status:"15",toteArea:"5"},
     {cartCnt:"1",cartCode:"",deliNo:"202101010201001",orderCode:"20201231213312345",orderName:"변숙희",pickQty:"0","qty":"6",status:"15",toteArea:"6"},
    ],*/
  })
  ,
  methods: {
    // deltot(index){
    //   for(let i=0;i<this.totList.length;i++){
    //     if(i===index)this.totList[i].cartCode="";
    //   }
    //   console.log("After removing done",this.totList);
    //   this.$refs.barcodeinput.focus();
    // }
    // ,
    openCart(){
      $("#for-cart-modal").fadeIn(300);
      // $(".modal").addClass("is-active");
    }
    ,
    cartclose(){
        $(".modal").fadeOut(300);
        $("body").css("overflow", "visible");
        // $(".modal").removeClass("is-active");
    },

    movepicklist(){
      const totList = this.getTotList;
      for(let i=0;i<totList.length;i++){
        if(totList[i].cartCode==="" || totList[i].cartCode===null){
           let refs = this.$refs;
           Swal.fire({
              type: 'error',
              title: 'NG!',
              text: '토트박스 할당이 누락되었습니다!',
              onAfterClose: () => {
                refs.barcodeinput.focus();
              }
            });
      
          return;
          // break;
        }
      }

      const param = {
        'groupkey':this.groupkey,
        'pickArea':this.getTotList[0].pickArea,
        'pickerId':sessionStorage.getItem("userid"),
      }
      this.$store.dispatch('PickStore/putMoveStatusProductScan', param).then(() => {
        this.changeRoute('picking', this.groupkey);
        // setGroupKey(this.groupkey);
      });
      
    }
    ,
    barcodeaction(e){
      console.log(e.target.value);
      
      const totList = this.getTotList;

      let isequal = -1;
      _.findIndex(totList, function(o) { 
            //  console.log(o.cartCode);
            if(o.cartCode===e.target.value){
              isequal=0;
            }
       });

      console.log('scan code in list ',isequal);

      if (isequal !== -1) {
        this.barcodeValue="";  
        Swal.fire({
              type: 'error',
              title: 'NG!',
              text: '이미 할당된 토트박스입니다!',
               onAfterClose: () => {
                this.$refs.barcodeinput.focus();
              }
            });
        return;
        }

      const toteArea = this.findCartPosition();
      console.log('toteArea',toteArea);
      const deliNo = totList[toteArea-1].deliNo;
      let param = {
        "groupkey":this.groupkey,
        "cartcode":this.barcodeValue,
        'pickArea':this.pickArea,
        "deliNo":deliNo,
        "nextMasterToteArea":toteArea,
      }
      console.log(param);
      this.$store.dispatch('PickStore/putMasterTrDetail', param).then(() => {
        console.log('putMasterTrDetail invoking end');
      });
      console.log("Cart number has been assigned!");
      this.setBarcode(); 
      // this.getHasAssignInfoTot(param);
    }
    ,
    findCartPosition(){
      const totList = this.getTotList;
      for(let i=0;i<totList.length;i++){
        console.log(totList[i].cartCode);
        if(totList[i].cartCode===null||totList[i].cartCode===''){
          return (i+1);
        }
      }
    }
    ,
    getHasAssignInfoTot(param){
      console.log("Checking already to assign cart number on box");
      const alreadycartnumberindex =_.findIndex(this.totList, function(o) { return o.cartCode === param.cartcode; });
      console.log('alreadycartnumberindex',alreadycartnumberindex);
      if(alreadycartnumberindex!==-1){
        Swal.fire({
              type: 'error',
              title: 'NG!',
              text: '이미 할당된 토트박스입니다!',
               onAfterClose: () => {
                this.$refs.barcodeinput.focus();
              }
            });
            return;
      }
      console.log('Cart number assign param', param);
      this.$store.dispatch('PickStore/getHasassigntot', param).then(() => {
           console.log(this.$store.state.PickStore.data.hasAssigntot);
           if(Number(this.$store.state.PickStore.data.hasAssigntot)>0){
             let refs = this.$refs;
              Swal.fire({
              type: 'error',
              title: 'NG!',
              text: '이미 할당된 토트박스입니다!',
               onAfterClose: () => {
                this.$refs.barcodeinput.focus();
              }
            });
            return;
           }
           this.getAssignDelivelyInfo(param);
      });
      console.log("validation 1 end");
    }
    ,
    getAssignDelivelyInfo(param){
      console.log("validation 2");
       console.log('getAssignDeliveryinfo invoking start');
      this.$store.dispatch('PickStore/getAssignDeliveryinfo', param.groupkey).then(() => {
           console.log('getAssignDeliveryinfo invoking end');
           console.log(this.$store.state.PickStore.data.assignDeliveryinfo);
           if(this.$store.state.PickStore.data.assignDeliveryinfo.length<1){
             let refs = this.$refs;
              Swal.fire({
              type: 'error',
              title: 'NG!',
              text: '작업대상이 없습니다!',
               onAfterClose: () => {
                this.$refs.barcodeinput.focus();
              }
            });
            return;
           }
           this.putMasterTrDetail(param);
      });
      console.log("validation 2 end");
    }
    ,
    putMasterTrDetail(param){
      console.log("validation 3");
      console.log('putMasterTrDetail invoking start',this.$store.state.PickStore.data.assignDeliveryinfo);
      param.deliNo=this.$store.state.PickStore.data.assignDeliveryinfo[0].DELI_NO;
      param.nextMasterToteArea=this.$store.state.PickStore.data.assignDeliveryinfo[0].NEXT_MASTER_TOTE_AREA;
      param.groupkey=this.groupkey;
      this.$store.dispatch('PickStore/putMasterTrDetail', param).then(() => {
        console.log('putMasterTrDetail invoking end');
      });
      console.log("validation 3 end");
      this.setBarcode();
    }
  ,
  deleteMasterTrDetail(deliNo){
      console.log('deleteMasterTrDetail invoking start');
      let param={};
      param.deliNo=deliNo;
      param.groupkey=this.groupkey;
      console.log(param);
      this.$store.dispatch('PickStore/deleteMasterTrDetail', param).then(() => {
        console.log('deleteMasterTrDetail invoking end');
        // this.$store.dispatch('PickStore/getTots', this.groupkey);
        // this.totList = this.$store.state.PickStore.data.totList;
        // this.$refs.barcodeinput.focus();
         for(let i=0;i<this.$store.state.PickStore.data.totList.length;i++){
           if(this.$store.state.PickStore.data.totList[i].deliNo===deliNo){
              this.$store.state.PickStore.data.totList[i].cartCode="";
           }
         }
         this.$store.dispatch('PickStore/setTotList', this.$store.state.PickStore.data.totList);
      });
      console.log("deleteMasterTrDetail end");
      this.$refs.barcodeinput.focus();
  }
  ,  
  setBarcode(){
      const totList = this.getTotList;
      console.log(totList);
      for(let i=0;i<totList.length;i++){
        if(totList[i].cartCode==="" || totList[i].cartCode===null){
          //totList[i].cartCode=e.target.value;
          totList[i].cartCode=this.barcodeValue;
          break;
        }
      }
      console.log('After tote scan being done',totList);
      this.barcodeValue=""; 
      console.log("*** validation end ***");
   }
  }
  ,
  computed: {
     ...mapGetters('PickStore',[
       'getTotList',
    ])
    ,
    groupkey() {
      return this.$route.params.id.split(".")[0];
    },
    pickArea() {
      return this.$route.params.id.split(".")[1];
    }
  }
  ,
  mounted(){
    console.log('groupkey',this.$route.params.id.split(".")[0]);
    console.log('pickArea',this.$route.params.id.split(".")[1]);
    const param = {
      'groupkey':this.groupkey,
      'pickArea':this.pickArea
    }
    this.$store.dispatch('PickStore/getTots', param).then(() => {
            console.log(this.$store.state.PickStore.data.totList);
            //this.totList = this.$store.state.PickStore.data.totList;
            this.$refs.barcodeinput.focus();
    });

    // console.log('tot_assign has been started', v1());
    // console.log('tot_assign has been started', this.getPickList);
    // let delinos=[];
    // for(let i=0;i<this.getPickList.length;i++){
    //     if(this.getPickList[i].checked===true)
    //        delinos.push(this.getPickList[i].DELI_NO);
        
    // }

    // console.log('delinos', delinos);
    // const delino = delinos.join(",");
    // this.$store.dispatch('PickStore/getTots', delino).then(() => {
    //        console.log(this.$store.state.PickStore.data.totList);
    //        this.totList = this.$store.state.PickStore.data.totList;
    //     });
    
  }
  ,
  beforeCreate(){
    const codes = ['OMS_STATUS','OMS_DELI_DIV','OMS_DELI_ORDER','OMS_DELI_METHOD','OMS_PICK_AREA'];
    for(let i=0;i<codes.length;i++) {
      this.$store.dispatch('Authentication/getCode', codes[i]);
    }
    
  }
  
}
  
</script>
<style scoped>
/* @import '../../assets/bulma.min.css';
.modal {
    opacity:1.0 !important;
} */
</style>
