<template>
<!--full-modal-->
<div class="modal full-modal" id="for-list-modal">
  <div class="layer">
    <div class="layer-content">
      <div class="modal-inner">
        <div class="modal-close"  @click="modalclose"></div>
        <div class="modal-header">
          <div class="list-data-area">
            <div class="list-data">
              <li class="list-data-title">주문번호</li>
              <li class="list-data-text">{{ordercode}}</li>
            </div>
            <div class="list-data">
              <li class="list-data-title">배송요청일</li>
              <li class="list-data-text">{{deliDate}} / {{deliOrder}}회차</li>
            </div>
          </div>
          <div class="state-area">
            <div v-if="deliMethod=='1'" class="state bg-red">일반</div>
            <div v-if="deliMethod=='2'" class="state bg-blue">픽업(DT)</div>
            <div v-if="deliMethod=='3'" class="state bg-yellow1">새벽배송</div>
          </div>
        </div>
        <div class="modal-content">
          <div class="list-content-area">
            <div class="list-top-area">
              <div class="list-left-area">
                <div class="table-sm pr-table box-table scroll ">
                  <table>
                    <colgroup>
                    <col width="10%"/>
                    <col/>
                    <col width="50px"/>
                    <col width="10%"/>
                    <col width="10%"/>
                    <col width="20%"/>
                    <col width="10%"/>
                    </colgroup>
                    <thead>
                      <tr>
                        <th>상품코드</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>픽업수량</th>
                        <th>구매가격</th>
                        <th>행사정보</th>
                        <th>피킹구역</th>
                      </tr>
                    </thead>
                    <tbody v-if="getProductList.length>0">
                      <tr v-for="(product,index) in getProductList" :key="index">
                        <td>{{getProductList[index].PRODUCT_CODE}}</td>
                        <td class="text-left text-bk md-bold"><div class="pr-content">
                            <!-- <div class="pr-img"><img src="images/img-test-01.jpg" alt="제품이미지"></div> -->
                            <div class="pr-text">{{getProductList[index].PRODUCT_NAME}}</div>
                          </div></td>
                        <td>{{getProductList[index].QTY}}</td>
                        <td>{{getProductList[index].PICKING_QTY}}</td>
                        <td>{{getProductList[index].SALE_MONEY  | currency}}</td>
                        <td>{{getProductList[index].PR_MP_DESC}}</td>
                        <td>{{getProductList[index].PICKING_ZONE}}</td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="list-right-area">
                <div class="memo-area">
                  <div class="memo-content-area scroll">
                    <div class="memo-list" v-for="(memo,index) in getMemo" :key="index">
                      <div class="memo-data">
                        <li>{{getMemo[index].CREATE_BY}}</li>
                        <li>{{getMemo[index].CREATE_DATE | moment('YYYY-MM-DD hh:mm') }}</li>
                      </div>
                      <div class="memo-text"> {{getMemo[index].MEMO}} </div>
                    </div>
                  </div>
                  <div class="memo-btn-area modal-open memo-modal" @click="memoopen(deliNo)"> 메모 등록하기 </div>
                </div>
              </div>
            </div>
            <div class="list-bottom-area">
              <div class="list-left-area">
                <div class="table-sm box-table text-left th-v scroll">
                  <table>
                    <colgroup>
                    <col width="20%"/>
                    <col width="15%"/>
                    <col width="20%"/>
                    <col/>
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>주문자 정보</th>
                        <td>{{getOwner.orderName}}</td>
                        <td>{{getOwner.orderHp}}</td>
                        <td>{{getOwner.orderEmail}}</td>
                      </tr>
                      <tr>
                        <th>배송정보</th>
                        <td>{{getOwner.receName}}</td>
                        <td>{{getOwner.receHp}}</td>
                        <td>{{getOwner.receAddr}}</td>
                      </tr>
                      <tr>
                        <th>결제/환불정보</th>
                        <td>{{getOwner.paymentTypeName}}</td>
                        <td colspan="2">품절 시 환불</td>
                      </tr>
                      <tr>
                        <th>배송 요청사항</th>
                        <td colspan="3">{{getOwner.orderMessage}}</td>
                      </tr>
                      <tr>
                        <th>기타 품절 요청사항</th>
                        <td colspan="3">{{getOwner.replaceMessage}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="list-right-area">
                <div class="list-total-area">
                  <div class="total-content">
                    <div class="total-title">결제금액</div>
                    <div class="total-text">
                      <ul>
                        <li>상품금액</li>
                        <li>{{getOwner.orderMoney | currency }}</li>
                      </ul>
                      <ul>
                        <li>상품할인금액</li>
                        <li>{{getOwner.couponMoney | currency }}</li>
                      </ul>
                      <ul>
                        <li>배송비</li>
                        <li>{{getOwner.orderDeliMoney | currency }}</li>
                      </ul>
                      <ul>
                        <li>쿠폰 및 기타 결제</li>
                        <li>{{getOwner.etcPayMoney | currency }}</li>
                      </ul>
                    </div>
                  </div>
                  <div class="total-price">
                    <li>총 결제금액</li>
                    <li><span class="bold">{{getOwner.orderTotMoney | currency }}</span>원</li>
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
import Vue from 'vue';
import {mapGetters} from 'vuex';
import vueMoment from 'vue-moment'

Vue.use(vueMoment);

//   import changeRouteMixin from '@/mixin/changeRoute';
  export default {
    name: 'OrderDetailBox',
    props: {
               ordercode: {
                   type: String,
                   require: true 
               },
               deliOrder: {
                   type: String,
                   require: true 
               },
               deliDate: {
                   type: String,
                   require: true 
               },
               deliMethod: {
                   type: String,
                   require: true 
               },
              //  memo: {
              //      type: String,
              //      require: true 
              //  },
               deliNo:{
                   type:String,
                   require: true
               },
               centerCode:{
                   type:String,
                   require: true
               }
          }
          ,
    // props: ['pickData'],
    // mixins: [changeRouteMixin],
  components: {
    
  },
    data: () => ({
      productList:[],
      product : {
        productCode : '',
        productName : '',
        qty : '',
        pickingQty : '',
        saleMoney : '',
        prMpDesc : '',
        prCardDesc : '',
        prFreeDesc : '',
        prMoreDesc : '',
        prTimeDesc : '',
        prSpotDesc : '',
        prCoupleDesc : '',
        prPartnerDesc : '',
        pickingZone : '',
      },
      owner : {
        orderName : '',
        orderHp : '',
        orderEmail : '',
        receName : '',
        receHp : '',
        receAddr : '',
        paymentType : '',
        paymentTypeName : '',
        replaceCode : '',
        replaceCodeName : '',
        orderMessage : '',
        replaceMessage : '',
        orderMoney : '',
        couponMoney : '',
        orderDeliMoney : '',
        etcPayMoney : '',
        orderTotMoney : '',
      }
  })
  ,
    methods: {
      modalclose() {
        this.$emit('modal-close');
      }
      ,
      memoopen() {
        this.$emit('memo-open');
      },
      
      //memoclose(){
        //$("#for-memo-modal").fadeOut(300);
        //$("#for-list-modal").fadeIn(300);
      //}
      // setOrderCode(eventparam){
      //   console.log('occur event in OrderDetailBox', eventparam);
      // }
      async getProducts(){
        await this.$store.dispatch('PickStore/getProducts',this.ordercode);
        // this.productList = this.$store.state.data.productList;
        console.log('getProductList',this.getProductList);
      }
      ,
      async fetchOwner(){
        await this.$store.dispatch('PickStore/getOwner',this.ordercode).then(() => {
        });
        // getOwner = this.$store.state.data.owner;
        console.log('getOwner',this.getOwner);
      }
      ,
      async fetchMemo(){
        console.log('fetchMemo')
        await this.$store.dispatch('PickStore/getMemo',this.deliNo).then(() => {
        });
        console.log('getMemo',this.getMemo);
        
      }
    }
    ,
    computed: {
      ...mapGetters('PickStore',[
       'getProductList',
       'getOwner',
       'getMemo',
    ])
    },
    mounted(){
      // console.log('OrderDtailBox mounted');
      //  this.$parent.$on('occurordercode', this.setOrderCode);
    }
    ,
    updated(){
      // console.log('OrderDetailBox mounted', this.getOrderCode());
      console.log('OrderDetailBox updated',this.ordercode);
      console.log('OrderDetailBox updated',this.deliOrder);
      // await this.getProducts();
    }
    ,
    created: function() {
  //    this.$on('orderCode', (args) => {
  //       alert('');
  // });
  }
  ,
  watch: {
      ordercode: async function() {
        console.log('OrderDetailBox watch');
        if (this.ordercode) {
          await this.getProducts();
          await this.fetchOwner();
          await this.fetchMemo();
        }
      }
      ,
      // memo: async function() {
      //   if (this.memo) {
      //     console.log("memo updated ", this.memo);
      //   }
      // }
    }
    ,
    filters: {
      currency : function (value) {
      return Number(value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
  }
}
</script>
