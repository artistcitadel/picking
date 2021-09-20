<template>
<main-layout>
  
<div class="section">
  <div class="section-wrap basic-section-wrap"> 
    <!--피킹리스트-->
    <div class="picking-list-wrap d-flex hidden">
      <div class="row"> 
        <!--제품정보-->
        <div class="content-left">
          <div class="btn-page-area">
            <div>
              <div class="page-btn-area">
                <button type="button" class="btn btn-md btn-grey-outline ic-arrow-left" @click="prevProduct" ><span>이전</span></button>
                <div class="page-num"><span class="text-primary bold">{{this.getCurrentProductCount}}</span>/<span v-if="this.getGoodDetailList.length>0">{{this.getGoodDetailList.length}}</span></div>
                <button type="button" class="btn btn-md btn-grey-outline ic-arrow-right" @click="nextProduct" ><span>다음</span></button>
              </div>
            </div>
            <div>
            <!-- <button type="button" class="btn btn-md btn-bk btn-show">목록 전체보기</button> -->
              
            
            <div class="right-btn-area">
              <div class="btn-half">
                <div class="row">
                  <div>
                    <button type="button" class="btn btn-ml btn-grey-outline btn-ic ic-check text-bk" @click="doallpick" >피킹</button>
                  </div>
                  <div>
                    <button type="button" class="btn btn-ml btn-grey-outline btn-ic ic-check text-bk" @click="doallcancelpick" >품절</button>
                </div>
              </div>
              </div>
            </div>

            
            </div>
          </div>
          <div class="scan-area">
            <div class="scan-input">
              <input type="text" ref="barcodeinput" v-model="barcodeValue" v-on:keyup.enter="barcodeaction" placeholder="상품바코드를 스캔하세요.">
              <button type="button" class="ic-scan"></button>
            </div>
          </div>
          <div class="pr-area">
            <div class="pr-img-area">
              <div class="pr-img-wrap"> 
                <img :src="this.getGood.IMG_URL" />
              </div>
            </div>
            <div class="pr-info-area">
              <div class="pr-info-title">{{this.getGood.PRODUCT_NAME}}<span v-if="getGood.ORG_PRODUCT_ID!=null" v-bind:style="{ 'color': 'blue' }"> <- ({{this.getGood.ORG_PRODUCT_NM}})</span></div>
              <div class="pr-info-list" v-if="this.getGoodDetailList.length>0">
                <ul>
                  <li>상품코드</li>
                  <li>{{this.getGood.PRODUCT_ID}}</li>
                </ul>
                <ul>
                  <li>판매가격</li>
                  <li>{{this.getGood.SALE_PRICE | currency}} 원</li>
                </ul>
                <ul>
                  <li>판매상태</li>
                  <li>{{this.getGood.STATUS}}</li>
                </ul>
                <ul>
                  <li>재고수량 </li>
                  <li>{{this.getGood.CURRENT_STOCK_QTY | currency}}</li>
                </ul>
                <ul>
                  <li>비고</li>
                  <!-- <li>1-3-5<span>1201(대용식품)_라면(번들)</span></li> -->
                  <li v-if="this.getGood.JM_PRODUCT_YN='Y'">{{this.getGood.JM_PRODUCT_MESSAGE}}</li>
                </ul>
                <ul>
                  <li>행사정보</li>
                  <li>{{this.getGood.PROMOTION}}</li>
                </ul>
                <!-- <ul v-if="getGood.ORG_PRODUCT_ID!=null">
                  <li>주문상품</li>
                  <li>{{this.getGood.ORG_PRODUCT_NM}}</li>
                </ul> -->
              </div>
              <div class="pr-info-total">
                <li>총 합계</li>
                <li><span class="text-primary bold">{{getUnitPickTotal}}</span>개</li>
              </div>
            </div>
          </div>
        </div>
        <!--토트박스-->
        <div class="content-right">
          <!-- <div class="right-btn-area">
            <div class="btn-half">
              <div class="row">
                <div>
                  <button type="button" class="btn btn-ml btn-grey-outline btn-ic ic-check text-bk" @click="doallpick" >피킹</button>
                </div>
                <div>
                  <button type="button" class="btn btn-ml btn-grey-outline btn-ic ic-check text-bk" @click="doallcancelpick" >취소</button>
                </div>
              </div>
            </div>
          </div> -->
          <div class="tote-box-area">
            <div class="tote-box-wrap tote-blue" v-if="getTotList.length>0">
              <div class="row">
                <div ref='cart0' @click="openTotBox(0, getTotList[0].DELI_NO, us(getTotList[0].MASTER_CART_CODE) ,us(getTotList[0].ORDER_NAME), us(getTotList[0].MASTER_TOTE_AREA), us(getTotList[0].DELI_DETAIL_SEQ), us(getTotList[0].ALLC_QTY), us(getTotList[0].PICK_QTY), us(getTotList[0].STATUS),us(getTotList[0].PICK_AREA),getTotList[0].ORDER_CODE, getTotList[0].CURRENT_CART_CODE,getTotList[0].QTY,getTotList[0].ORDER_CODE_SEQ ,getTotList[0].REPLACE_MESSAGE) ">
                   <div v-bind:class="['tote-box', (getTotList[0].PRODUCT_CNT<1) ? 'disable' : '' ]" > 
                    <!-- <div class="tote-box"> -->
                    <div class="tote-box-header">
                      <div class="tote-title" >{{getTotList[0].MASTER_TOTE_AREA}}</div>
                      <div class="tote-order">주문번호 : <span class="text-yw" >{{getTotList[0].DELI_NO.substring(9)}}</span></div>
                    </div>
                    <div class="tote-box-body" > <span class="text-bk bold" >{{getTotList[0].PICK_QTY}}</span>/{{getTotList[0].ALLC_QTY}} </div>
                    <div class="tote-box-footer">
                      <!-- <li>토트박스</li> -->
                       <li><span>토트번호 : {{getTotList[0].CURRENT_CART_CODE}}</span></li>
                    </div>
                  </div>
                </div>
                <div v-if="getTotList.length>1">
                  <div ref='cart1' @click="openTotBox(1, getTotList[1].DELI_NO, us(getTotList[1].MASTER_CART_CODE) ,us(getTotList[1].ORDER_NAME), us(getTotList[1].MASTER_TOTE_AREA), us(getTotList[1].DELI_DETAIL_SEQ), us(getTotList[1].ALLC_QTY), us(getTotList[1].PICK_QTY), us(getTotList[1].STATUS), us(getTotList[1].PICK_AREA),getTotList[1].ORDER_CODE, getTotList[1].CURRENT_CART_CODE,getTotList[1].QTY,getTotList[1].ORDER_CODE_SEQ,getTotList[1].REPLACE_MESSAGE )">
                    <div v-bind:class="['tote-box', (getTotList[1].PRODUCT_CNT<1) ? 'disable' : '' ]" > 
                    <div class="tote-box-header">
                      <div class="tote-title" >{{getTotList[1].MASTER_TOTE_AREA}}</div>
                      <div class="tote-order">주문번호 : <span class="text-yw" >{{getTotList[1].DELI_NO.substring(9)}}</span></div>
                    </div>
                    <div class="tote-box-body" > <span class="text-bk bold" >{{getTotList[1].PICK_QTY}}</span>/{{getTotList[1].ALLC_QTY}} </div>
                    <div class="tote-box-footer">
                      <!-- <li>토트박스</li> -->
                       <li><span>토트번호 : {{getTotList[1].CURRENT_CART_CODE}}</span></li>
                    </div>
                  </div>  
                 </div>
                </div>
              </div>
            </div>
            <div class="tote-box-wrap tote-red" v-if="getTotList.length>2">
              <div class="row">
                <div>
                  <div ref='cart2' @click="openTotBox(2, getTotList[2].DELI_NO, us(getTotList[2].MASTER_CART_CODE) ,us(getTotList[2].ORDER_NAME), us(getTotList[2].MASTER_TOTE_AREA), us(getTotList[2].DELI_DETAIL_SEQ), us(getTotList[2].ALLC_QTY), us(getTotList[2].PICK_QTY), us(getTotList[2].STATUS), us(getTotList[2].PICK_AREA),getTotList[2].ORDER_CODE, getTotList[2].CURRENT_CART_CODE,getTotList[2].QTY,getTotList[2].ORDER_CODE_SEQ,getTotList[2].REPLACE_MESSAGE )">
                   <div v-bind:class="['tote-box', (getTotList[2].PRODUCT_CNT<1) ? 'disable' : '' ]" > 
                    <div class="tote-box-header">
                      <div class="tote-title" >{{getTotList[2].MASTER_TOTE_AREA}}</div>
                      <div class="tote-order">주문번호 : <span class="text-yw" >{{getTotList[2].DELI_NO.substring(9)}}</span></div>
                    </div>
                    <div class="tote-box-body" > <span class="text-bk bold" >{{getTotList[2].PICK_QTY}}</span>/{{getTotList[2].ALLC_QTY}} </div>
                    <div class="tote-box-footer">
                      <!-- <li>토트박스</li> -->
                       <li><span>토트번호 : {{getTotList[2].CURRENT_CART_CODE}}</span></li>
                    </div>
                  </div>
                 </div> 
                </div>
            <div v-if="getTotList.length>3">
                  <div ref='cart3' @click="openTotBox(3, getTotList[3].DELI_NO, us(getTotList[3].MASTER_CART_CODE) ,us(getTotList[3].ORDER_NAME), us(getTotList[3].MASTER_TOTE_AREA), us(getTotList[3].DELI_DETAIL_SEQ), us(getTotList[3].ALLC_QTY), us(getTotList[3].PICK_QTY), us(getTotList[3].STATUS), us(getTotList[3].PICK_AREA),getTotList[3].ORDER_CODE, getTotList[3].CURRENT_CART_CODE,getTotList[3].QTY,getTotList[3].ORDER_CODE_SEQ,getTotList[3].REPLACE_MESSAGE)">
                    <div v-bind:class="['tote-box', (getTotList[3].PRODUCT_CNT<1) ? 'disable' : '' ]" > 
                    <div class="tote-box-header">
                      <div class="tote-title" >{{getTotList[3].MASTER_TOTE_AREA}}</div>
                      <div class="tote-order">주문번호 : <span class="text-yw" >{{getTotList[3].DELI_NO.substring(9)}}</span></div>
                    </div>
                    <div class="tote-box-body"> <span class="text-bk bold" >{{getTotList[3].PICK_QTY}}</span>/{{getTotList[3].ALLC_QTY}} </div>
                    <div class="tote-box-footer">
                      <!-- <li>토트번호</li> -->
                       <li><span>토트번호 : {{getTotList[3].CURRENT_CART_CODE}}</span></li>
                    </div>
                  </div>
                </div>
               </div> 
              </div>
            </div>
            <div class="tote-box-wrap tote-green" v-if="getTotList.length>4">
              <div class="row">
                <div>
                  <div ref='cart4' @click="openTotBox(4, getTotList[4].DELI_NO, us(getTotList[4].MASTER_CART_CODE) ,us(getTotList[4].ORDER_NAME),us(getTotList[4].MASTER_TOTE_AREA), us(getTotList[4].DELI_DETAIL_SEQ), us(getTotList[4].ALLC_QTY), us(getTotList[4].PICK_QTY), us(getTotList[4].STATUS),us(getTotList[4].PICK_AREA),getTotList[4].ORDER_CODE, getTotList[4].CURRENT_CART_CODE,getTotList[4].QTY,getTotList[4].ORDER_CODE_SEQ,getTotList[4].REPLACE_MESSAGE )">
                   <div v-bind:class="['tote-box', (getTotList[4].PRODUCT_CNT<1) ? 'disable' : '' ]" > 
                    <div class="tote-box-header">
                      <div class="tote-title">{{getTotList[4].MASTER_TOTE_AREA}}</div>
                      <div class="tote-order">주문번호 : <span class="text-yw">{{getTotList[4].DELI_NO.substring(9)}}</span></div>
                    </div>
                    <div class="tote-box-body"> <span class="text-bk bold" >{{getTotList[4].PICK_QTY}}</span>/{{getTotList[4].ALLC_QTY}} </div>
                    <div class="tote-box-footer">
                      <!-- <li>토트박스</li> -->
                       <li><span>토트번호 : {{getTotList[4].CURRENT_CART_CODE}}</span></li>
                    </div>
                  </div>
                </div>
                </div>
                <div v-if="getTotList.length>5">
                  <div ref='cart5' @click="openTotBox(5, getTotList[5].DELI_NO, us(getTotList[5].MASTER_CART_CODE) ,us(getTotList[5].ORDER_NAME), us(getTotList[5].MASTER_TOTE_AREA), us(getTotList[5].DELI_DETAIL_SEQ), us(getTotList[5].ALLC_QTY), us(getTotList[5].PICK_QTY), us(getTotList[5].STATUS,getTotList[5].PICK_AREA),getTotList[5].ORDER_CODE, getTotList[5].CURRENT_CART_CODE,getTotList[5].QTY,getTotList[5].ORDER_CODE_SEQ,getTotList[5].REPLACE_MESSAGE )">
                   <!-- <div v-bind:class="['tote-box', '{getTotList[5].PRODUCT_CNT!==0 }}' ? '' : 'disable']" > -->
                    <div v-bind:class="['tote-box', (getTotList[5].PRODUCT_CNT<1) ? 'disable' : '' ]" > 
                    <div class="tote-box-header">
                      <div class="tote-title">{{getTotList[5].MASTER_TOTE_AREA}}</div>
                      <div class="tote-order">주문번호 : <span class="text-yw" >{{getTotList[5].DELI_NO.substring(9)}}</span></div>
                    </div>
                    <div class="tote-box-body"> <span class="text-bk bold" >{{getTotList[5].PICK_QTY}}</span>/{{getTotList[5].ALLC_QTY}} </div>
                    <div class="tote-box-footer">
                      <!-- <li>토트박스</li> -->
                      <!-- <li><span>{{getTotList[5].MASTER_CART_CODE}}</span></li> -->
                      <li><span>토트번호 : {{getTotList[5].CURRENT_CART_CODE}}</span></li>
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

  <div class="pos-fixed pos-center">
    <Loader v-show="isLoading" />
  </div>

</div>

<!--전체피킹리스트-->
<pick-all ref="productlistcomponent" />

<!--토트박스-modal-->
<tot-box ref="productpickcomponent" @modal-close='closeModal' @limit-open="limitopen" @alter-open="alteropen" @alter-close="alterclose" v-bind:deliNo="deliNo" @pass-totetype="passtotetype" />
 

<!--대체상품-modal-->
<AlterProduct ref="altercomponent" @alter-close="alterclose" />

<!--대체상품한도초과-modal-->
<AlterLimit @limit-close="limitclose" />

</main-layout>
</template>
<script>
import {mapGetters} from 'vuex';
import _ from 'lodash';
import $ from 'jquery';
import Swal from 'sweetalert2';
import VueBarcode from 'vue-barcode';
import MainLayout from '../../layouts/Main.vue';
import changeRouteMixin from '@/mixin/changeRoute';
import Loader from '../../views/Loader';
import PickAll from '@/components/picking/PickAll';
import TotBox from '@/components/picking/TotBox';
import AlterProduct from '@/components/picking/AlterProduct';
import AlterLimit from '@/components/picking/AlterLimit';

export default {
    name: 'totAssign',
    components: {
     MainLayout,
     'Loader': Loader,
     'barcode': VueBarcode,
     PickAll,
     TotBox,
     AlterProduct,
     AlterLimit,
  },
  mixins: [changeRouteMixin],
  data: () => ({
    productidx:0,
    deliNo : '',
    deliDetailSeq:'',
    masterCartCode : '',
    orderName : '',
    masterToteArea : '',
    toteType:'M',
    cartCode:'',
    barcodeValue: '',
     goods:[
       
     ],
     productid:'x',
     orgProductId:'',
     sortno:'x',
     toteArea:'',
     pickArea:'',
     title:'피킹처리 하시겠습니까?',
     pbuttontitle:'피킹처리!',
     node:'sale',
    })
  ,
  methods: {
    nextProduct(){
      if(this.getCurrentProductCount===this.getGoodDetailList.length)return;
      this.$store.dispatch('GoodStore/setCurrentProductCount', this.getCurrentProductCount+1);
      this.$store.dispatch('GoodStore/setGood', this.getGoodDetailList[this.getCurrentProductCount-1]);
      this.getTotByProductCount();
    }
    ,
    prevProduct(){
      if(this.getCurrentProductCount===1)return;
      this.$store.dispatch('GoodStore/setCurrentProductCount', this.getCurrentProductCount-1);
      this.$store.dispatch('GoodStore/setGood', this.getGoodDetailList[this.getCurrentProductCount-1]);
      this.getTotByProductCount();
    }
    ,
    getTotByProductCount(){
      console.log(this.getGood);
      let param = {
        'groupkey':this.groupkey,
        'sortno':this.getGood.SORT_NO,
        'productid':this.getGood.PRODUCT_ID,
        'delino':_.isUndefined(this.getGood.DELI_NO)?'':this.getGood.DELI_NO,
        'deliseq':_.isUndefined(this.getGood.DELI_DETAIL_SEQ)?'':this.getGood.DELI_DETAIL_SEQ,
        'storeCode':sessionStorage.getItem("storeCode"),
      }
      this.$store.dispatch('GoodStore/getGoodTotList', param).then(() => {
        console.log("this.getTotList",this.getTotList);
        param = {
        'pickArea':'',
        'delinos':'',
      }
        this.$refs.barcodeinput.focus();
        });
    }
    ,
    openTotBox(idx, deliNo, masterCartCode, orderName, masterToteArea, deliDetailSeq, allcQty, pickQty, status, pickArea, orderCode, currentCartCode,qty, orderCodeSeq, replaceMessage){
      this.productidx = idx;

      let isreplace=false;
      if(!_.isUndefined(this.getTotList[idx].ORG_PRODUCT_ID)){
          isreplace=true;
      }
      this.orgProductId=this.us(this.getTotList[idx].ORG_PRODUCT_ID);
      console.log(this.getGood.PRODUCT_ID);
      console.log('pickArea',pickArea);
      // if(this.getGood.PRODUCT_ID!=this.getValidProduct){
      //    Swal.fire({
      //        title: '상품을 스캔하세요!',
      //        text: "",
      //        type: 'warning',
      //        onAfterClose: () => {
      //           this.$refs.barcodeinput.focus();
      //       }
      //      });
           
      //      return;
      // }
     
       console.log('masterToteArea',masterToteArea);
    
      if(this.getTotList[idx].PRODUCT_CNT<1)return;
        this.toteArea = String(idx);
        this.deliNo=deliNo;
        this.masterCartCode=masterCartCode
        this.orderName=orderName,
        this.masterToteArea=masterToteArea,
        this.deliDetailSeq=String(deliDetailSeq),
    
      this.$refs.productpickcomponent.setqty(allcQty,pickQty,this.getGood.PRODUCT_ID,status,this.groupkey,masterToteArea, pickArea,this.gettotelist[this.getTotList[idx].DELI_NO+''+this.us(this.getTotList[idx].MASTER_TOTE_AREA)], this.gettotelist, this.orderName, masterCartCode, deliDetailSeq, this.orgProductId, orderCode, currentCartCode, isreplace, qty, orderCodeSeq, replaceMessage);
      $("#for-tote-box-modal").fadeIn(300);
      this.$refs.productpickcomponent.setInputFocus();
    },
    closeModal(status, isrecovery, hasbeenreplace){
      if(isrecovery && hasbeenreplace)this.node='recovery';
      this.node = (isrecovery)?'recovery':(hasbeenreplace)?'replace':'sale';
      // alert(this.node);
      // alert(isrecovery+ ' '+hasbeenreplace+' '+this.node);
      $(".modal").fadeOut(300);
      $("body").css("overflow", "visible");
      this.$refs.productlistcomponent.searchGoodList();
      
      let reduce = 1;
      if(status==='40' && this.getIsMultifultot()===1){
        const idx = this.getCurrentProductCount-1;
        let goodlist = this.getGoodDetailList;
        let glist= _.remove(goodlist, function(o) {
          return o.PRODUCT_ID!==goodlist[idx].PRODUCT_ID;
        });
        const param = {
          'goodlist':glist,
          'idx':idx,
        }
        this.$store.dispatch('GoodStore/setGoodDetailList', param);        
      }
      if(this.node==='sale'){
        this.$store.dispatch('GoodStore/setGood', this.getGoodDetailList[this.getCurrentProductCount-reduce]);
        this.getTotByProductCount();
        this.$refs.barcodeinput.focus();
      }
      if(status==='40')this.node='alter';
      if(this.node==='replace' || this.node==='recovery' || this.node==='alter'){
        this.searchGoods();
      }
    }
    ,
    getIsMultifultot(){
      let totecount=0;
      for(let i=0;i<this.getTotList.length;i++){
        if(this.getTotList[i].ALLC_QTY>0){
          ++totecount;
        }
      }
      return totecount;
    }
    ,
    limitopen(){
      $("#for-replace-over-modal").fadeIn(300);
      $("#for-tote-box-modal").fadeOut(300);
    }
    ,
    limitclose(){
      $("#for-replace-over-modal").fadeOut(300);
      $("#for-tote-box-modal").fadeIn(300);
    }
    ,
    alteropen(orderCode, currentCartCode){
      console.log('Selected good',this.getGood);
      console.log(this.getTotList[this.productidx]);
      this.$refs.altercomponent.setValue(this.getGood,this.getTotList[this.productidx],this.groupkey,this.productidx,this.toteType,this.cartCode,orderCode,currentCartCode);
      $("#for-replace-modal").fadeIn(300);
      $("#for-tote-box-modal").fadeOut(300);
    }
    ,
    alterclose(ispick){
      $("#for-replace-modal").fadeOut(300);
      $("#for-tote-box-modal").fadeIn(300);
      // if(this.node==='replace'||this.node==='recovery')
      if(ispick){
        this.node='replace';
        this.$refs.productpickcomponent.setNode('replace');
        this.$refs.productpickcomponent.modalclose();
      }
          
    }
    ,
    passtotetype(totetype,totebox){
      console.log('parent totetype has passed',totetype, totebox);
      this.toteType=totetype;
      this.cartCode=totebox;
    }
    ,
    barcodeaction(e){
      console.log(e.target.value);
      const svalue = e.target.value;
      if(svalue.length===6){
        const idx = _.findIndex(this.getTotList, function(o) { return o.MASTER_CART_CODE == svalue; });
        console.log(this.$refs['cart'+idx]);
          this.$refs['cart'+idx].click();
          this.barcodeValue=""; 
          return;
      }

      // this.$store.dispatch('GoodStore/getProductByBarcode', e.target.value).then(() => {
      //     console.log('after validation product code',this.getValidProduct, svalue);
      //     // if(this.getValidProduct!=svalue){
      //        if(this.getValidProduct!=this.getGood.PRODUCT_ID){
      //       Swal.fire({
      //           title: '잘못된 바코드 해당하는 상품을 스캔하세요!',
      //           text: "",
      //           type: 'warning',
      //         })
      //         this.barcodeValue='';
      //         this.$refs.barcodeinput.focus();
      //         return;
      // }
      // });
      this.barcodeValue=""; 
      this.$refs.barcodeinput.focus();
    }
    ,
    doPick(status,url){
      let isreplace=false;
      let params=[];    
          for(let i=0;i<this.getTotList.length;i++){
            if(this.getTotList[i].ALLC_QTY>0 && (this.getTotList[i].ALLC_QTY!==this.getTotList.PICK_QTY) ){
              let pickQty = this.getTotList[i].ALLC_QTY+'';
              let picknode='standard';
              if(status==='10'){
                picknode='cancellation';
                pickQty='0';
              }
               if(status==='99'){
                picknode='outofstock';
                pickQty='0';
              }
              let param = {
                'groupkey': this.groupkey,
                'toteArea':this.getTotList[i].MASTER_TOTE_AREA+'',
                'qty':this.getTotList[i].QTY+'',
                'pickArea': this.pickArea,
                'picknode':picknode,
                'toteType':'M',
                'status':status,
                'orderCnclType':'0',
                'pickerId':sessionStorage.getItem("userid"),
                'storeCode':sessionStorage.getItem("storeCode"),
                'totalPickQty':this.getTotList[i].ALLC_QTY+'',
                'allcQty':this.getTotList[i].ALLC_QTY+'',
                'pickQty':pickQty,
                'masterCartCode':this.getTotList[i].MASTER_CART_CODE,
                'currentCartCode':this.getTotList[i].CURRENT_CART_CODE,
                'deliDetailSeq':this.getTotList[i].DELI_DETAIL_SEQ+'',
                'deliNo':this.getTotList[i].DELI_NO,
                'orgProductId':this.us(this.getTotList[i].ORG_PRODUCT_ID)+'',
              };
              param.subPickNode='';
              console.log('org_product_id',this.getTotList[i].ORG_PRODUCT_ID);
              if(!_.isUndefined(this.getTotList[i].ORG_PRODUCT_ID) && this.getTotList[i].ORG_PRODUCT_ID!==''){
                isreplace=true;
                 param.subPickNode='recovery';
                //  this.node='replace';
                this.node='recovery';
              }
              params.push(param);
            }
          }
          
          //  Swal.fire({
          //   title: '대체상품임으로 원래상품으로 대체되는 건이 있습니다!',
          //   text: "",
          //   type: 'warning',
          //   showCancelButton: true,
          //   confirmButtonColor: '#3085d6',
          //   cancelButtonColor: '#d33',
          //   confirmButtonText: this.pbuttontitle,
          //   cancelButtonText: '취소!'
          // }).then((result) => {
          //   if(result.dismiss==='cancel')return;
          //   if (result) {
                console.log('doallpick',params);  
                url='GoodStore/doallpick';
                this.$store.dispatch(url, params).then(() => {
                  // if(this.node==='replace'){
                  if(this.node==='recovery'){  
                    this.searchGoods();
                  }
                  if(this.node==='sale'){
                    // this.productid="x";
                    this.sortno="x";
                    // this.searchGoods();
                    this.getTotByProductCount();
                    this.$refs.productlistcomponent.searchGoodList();
                  }
                });
            // }
          // }
          // );

    }
    ,
    doallpick(){
      // console.log(this.getTotList);
      if(this.groupkey==='' || this.pickQty==='')return;
      this.title='피킹처리 하시겠습니까?',
      this.pbuttontitle='피킹!',
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

          this.doPick('15','GoodStore/doallpick');
         
        }
      });
    }
    ,
    doallcancelpick(){
      let pickcnt=0;
      for(let i=0;i<this.getTotList.length;i++){
        // console.log('pickQty',this.getTotList[i].PICK_QTY);
        pickcnt+=Number(this.getTotList[i].PICK_QTY);
      }
      // if(tpickcnt<1){
      //   Swal.fire({
      //           title: '피킹수량이 없습니다!',
      //           text: "",
      //           type: 'warning',
      //         })
              
      //         return;
      // }
      if(this.groupkey==='' || this.pickQty==='')return;
      // this.title='피킹취소 처리 하시겠습니까?',
      // this.pbuttontitle='피킹취소!',
      this.title='품절 처리 하시겠습니까?',
      this.pbuttontitle='품절!',
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
              // this.doPick('10','GoodStore/doallcancelpick');
              this.doPick('99','GoodStore/doallcancelpick');
            }
        });
    }
    ,
    searchGoods(){
      let param = {
      'groupkey':this.groupkey,
      'productid': this.productid,
      'sortno':this.sortno,
      'delino':'',
      'deliNos':'',
      'deliseq':'',
      'pickArea':'',
      'storeCode':sessionStorage.getItem("storeCode"),
    }
    
    if(this.node==='replace'|| this.node==='recovery'){param.productid='x';param.sortno='x';}
    this.$store.dispatch('GoodStore/getGoodDetailList', param).then(() => {
      if(this.node==='sale' && this.getGoodDetailList.length<1){
          Swal.fire({
                title: '피킹 대상 상품이 없습니다!',
                text: "",
                type: 'warning',
              })
        return;
      }
      console.log(this.getGoodDetailList);
      console.log(this.getGoodDetailList[this.getGoodDetailList.length-1].PRODUCT_NAME);
      this.productid = this.getGoodDetailList[0].PRODUCT_ID;
      console.log('productid is ', this.productid);
      param.productid=this.productid;
      param.delino=_.isUndefined(this.getGoodDetailList[0].DELI_NO)?'':this.getGoodDetailList[0].DELI_NO;
      param.deliseq=_.isUndefined(this.getGoodDetailList[0].DELI_DETAIL_SEQ)?'':this.getGoodDetailList[0].DELI_DETAIL_SEQ;
      console.log('this.getGoodDetailList',this.getGoodDetailList);
      
      const tempnode=this.node;
      if(this.node!=='replace' && this.node!=='recovery') {
        this.$store.dispatch('GoodStore/getGoodTotList', param).then(() => {
          console.log('totelist514',this.getTotList);
          if(this.getTotList.length>0){
          this.pickArea = this.getTotList[0].PICK_AREA;
          }

            console.log("getAssistant totlist end");
            $('.picking-list-wrap').removeClass('hidden');
            $(".spinner-master").show();
            this.$refs.barcodeinput.focus();
          
          this.$refs.productlistcomponent.searchGoodList();
          this.node='sale';
        });
      }


     if(tempnode === 'replace'){
          console.log("REPLACE");
          const len = this.getGoodDetailList.length-1;
          this.$store.dispatch('GoodStore/setCurrentProductCount', len+1);
          this.$store.dispatch('GoodStore/setGood', this.getGoodDetailList[len]);
          this.getTotByProductCount();
      }
      if(tempnode === 'recovery' || tempnode === 'alter'){
          console.log("RECOVERY");
          this.$store.dispatch('GoodStore/setCurrentProductCount', 1);
          this.$store.dispatch('GoodStore/setGood', this.getGoodDetailList[0]);
          this.$store.dispatch('GoodStore/getGoodTotList', param).then(() => {
          console.log('totelist after recovery',this.getTotList);
          this.$refs.barcodeinput.focus();
           this.$refs.productlistcomponent.searchGoodList();
         });
         this.$forceUpdate();
          // this.getTotByProductCount();
          // this.changeRoute('picking', this.groupkey);
          // this.$router.go();
      }

      
    });
    this.$refs.barcodeinput.focus();
    }

    ,
    us(str){
      return (_.isUndefined(str)?"":str);
    }
    ,

  }
  ,
   computed: {
      ...mapGetters('GoodStore', [
         'getGoodDetailList',
         'getCurrentProductCount',
         'getGood',
         'getTotList',
         'isLoading',
         'getValidProduct',
         'getassigntotList',
         'gettotelist',
      ])
      ,
      groupkey() {
        return this.$route.params.id;
      }
      ,
      getUnitPickTotal(){
        return _.sumBy(this.getTotList, function(o) { return o.ALLC_QTY; });
      }
      ,
    }
  ,
  mounted(){
    $(".spinner-master").hide();
     this.$store.dispatch('GoodStore/setLoading', true);
      $(".spinner-master").off("click").on("click", function () {
        if ($(".overlay").hasClass("active")) {
          $(".overlay").removeClass("active");
          $(".block-content").removeClass("active");
          $(".spinner").removeClass("active");
          $("body").css("overflow", "visible");
        } else {
          $(".overlay").addClass("active");
          $(".block-content").addClass("active");
          $(".spinner").addClass("active");
          $("body").css("overflow", "hidden");
      }
    });

    $(".btn-show").off("click").on("click", function () {
      if ($(".overlay").hasClass("active")) {
        $(".overlay").removeClass("active");
        $(".block-content").removeClass("active");
        $(".spinner").removeClass("active");
        $("body").css("overflow", "visible");
      } else {
        $(".overlay").addClass("active");
        $(".block-content").addClass("active");
        $(".spinner").addClass("active");
        $("body").css("overflow", "hidden");
      }
    });

    console.log('this.getGoodDetailList[0]',this.getGoodDetailList);
    this.searchGoods();
    this.$refs.barcodeinput.focus();
 }
 ,
 filters: {
   currency : function (value) {
     return Number(value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   }
 }
 ,
 watch: {
  // totelist(){
  //   console.log('totelist Changed!');
  // }
 },
} 
</script>
<style scoped>
.hidden{
  display:none;
}
.modal{
  z-index: 99;
}
</style>
