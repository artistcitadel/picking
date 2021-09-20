<template>
<main-layout>

<div class="section">
  <div class="section-wrap"> 
   <!--검색-->
    <div class="search-area">
      <ul class="accordion">
        <div class="main-search-area">
          <div class="input-area">
            <div class="row">
              <div class="input-set" style="width: 37%">
<div class="input-lable">배송일자</div>
                <input type="text" style="text-align:center" id="deliDate" data-role="calendarpicker" data-dialog-mode="true">
                <div class="calendar-btn-area">
                  <button type="button" @click="dateminus" class="btn btn-md btn-grey-outline ic-arrow-left"><span>이전</span></button>
                  <button type="button" @click="dateplus" class="btn btn-md btn-grey-outline ic-arrow-right"><span>다음</span></button>
                </div>
              </div>
              
              <div class="input-set" style="width: 18%">
                <select v-model="pickData.status">
                  <option value=""></option>
                  <option
                    v-for="o in this.getOMS_DELI_METHOD"
                    :key="o.ETC_CODE" v-bind:value="o.ETC_CODE"
                    >
                    {{ o.ETC_NAME }}
                  </option>
                </select>
              </div>
              <div class="input-set" style="width: 20%">
                <div class="input-lable"></div>
                <select v-model="pickData.deliOrder">
                  <option value=""></option>
                  <option
                    v-for="o in this.getOMS_DELI_ORDER"
                    :key="o.ETC_CODE" v-bind:value="o.ETC_CODE"
                    >
                    {{ o.ETC_NAME }}
                  </option>
                </select>
              </div>
              
            </div>
          </div>
          <div class="btn-search-area">
            <button type="button" @click="getManualPicks" class="btn btn-search btn-bk"><span>검색</span></button>
          </div>
        </div>
      </ul>
    </div>


<!--테이블-->
    <div class="main-table">
      <div class="table-title-area">
        <div class="table-total">총 주문건<span class="text-primary" v-if="getManualPickList.length>0">{{getManualPickList[0].cnt}}</span></div>
        <div class="table-btn-area">
          <button type="button" class="btn btn-ml btn-primary btn-ic ic-check-wh" @click="doPick('alterindex')">피킹</button>
          <button type="button" class="btn btn-ml btn-primary btn-ic ic-check-wh" @click="doPick('alterindexreject')">피킹 취소</button>
        </div>
      </div>
      <div class="table-lg">
        <table>
          <colgroup>
          <col width="50px"/>
          <col/>
          <col width="10%"/>
          <col width="8%"/>
          <col width="8%"/>
          <col width="10%"/>
          <col width="8%"/>
          <col width="8%"/>
          <col width="8%"/>
          </colgroup>
          <thead>
            <tr>
              <th> <div class="only-check">
                  <div class="checkbox">
                   <input id="checkall" type="checkbox" @click="doallcheck">
                    <label for="checkall" class="checkbox-label"></label>
                  </div>
                </div>
              </th>
              <th>상품명</th>
              <th>주문번호</th>
              <th>주문자</th>
              <th>피킹수량</th>
              <th>보관/상차</th>
              <th>상태</th>
              <th>출력</th>
              <th>담당자</th>
            </tr>
          </thead>
           <tbody v-if="this.getManualPickList.length>0">
            <tr v-for="(pick,index) in getManualPickList" :key="index">
              <td><div class="only-check">
                  <div class="checkbox">
                     <input :id="getManualPickList[index].rnum" value="getManualPickList[index].rnum" v-model="getManualPickList[index].checked"
                    @click="selectpick(index)" name="chk" type="checkbox">
                    <label :for="getManualPickList[index].rnum" class="checkbox-label" ></label>
                  </div>
                </div></td>
              <td class="text-left"><div class="pr-content link modal-open pr-modal">
                  <!-- <div class="pr-img"> <img src="images/img-test-02.jpg" alt="제품이미지"> </div> -->
                  <div class="pr-text" 
                  @click="openTotBox(0, getManualPickList[index].deliNo, '*', getManualPickList[index].orderName, 
                                      '1', getManualPickList[index].deliDetailSeq, getManualPickList[index].qty, getManualPickList[index].pickQty, 
                                      getManualPickList[index].status, 'E',getManualPickList[index].productId, getManualPickList[index].orderCode, getManualPickList[index].orderDetailSeq, getManualPickList[index].saleMoney)"
                  >{{getManualPickList[index].productName}}</div>
                </div></td>
              <td><span class="link modal-open list-modal" style="font-size:medium;" 
              @click="openOrderDetail(getManualPickList[index].orderCode ,getManualPickList[index].deliOrder , getManualPickList[index].deliDate, getManualPickList[index].deliMethod, getManualPickList[index].deliNo )">
              {{getManualPickList[index].orderCode}}</span></td>
              <td>{{getManualPickList[index].orderName}}</td>
              <td class="bg-pink"><span class="text-primary bold">{{getManualPickList[index].pickQty}}</span>/{{getManualPickList[index].qty}}</td>
              <td>{{getManualPickList[index].deliSaveCode}}/</td>
              <td class="text-primary">{{getManualPickList[index].statusName}}</td>
              <td class="text-blue">{{getManualPickList[index].variantPrintCnt}}</td>
              <td></td>
            </tr>
            
          </tbody>
        </table>
   
            <!-- <div v-if="this.pickDataList.length>10" class="pagenation"> -->
            <div class="pagenation" ref="pagenation">  
              <ul id="pageView" ref="pageView">
                <!-- <li class="prev-double"><a href="#"></a></li>
                <li class="prev"><a href="#"></a></li>
                <li class="active">1</li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li class="next"><a href="#"></a></li>
                <li class="next-double"><a href="#"></a></li> -->
              </ul>
            </div>
          </div>
        </div>

    <!--테이블-->

  </div>

  <div class="pos-fixed pos-center">
    <Loader v-show="isLoading" />
  </div>

</div>

<!--토트박스-modal-->
<tot-box ref="productpickcomponent" @modal-close='closeModal' @limit-open="limitopen" @alter-open="alteropen" @alter-close="alterclose" v-bind:deliNo="deliNo" @pass-totetype="passtotetype" />
<!--대체상품-modal-->
<AlterProduct ref="altercomponent" @alter-close="alterclose" />

<order-detail-box ref="orderdetailcomponent" @modal-close='orderdetailclose' @memo-open="memoopen" v-bind:ordercode="orderCode" v-bind:deliOrder="deliOrder" v-bind:deliDate="deliDate" v-bind:deliMethod="deliMethod" v-bind:memo="memo" v-bind:centerCode="centerCode" v-bind:deliNo="deliNo"/>
<order-memo-box @memo-close="memoclose" v-bind:deliNo="deliNo"/>

</main-layout>
</template>
<script>
import Swal from 'sweetalert2';
import Vue from 'vue';
import _ from 'lodash';
import $ from 'jquery';
import Metro from '../../js/metro.min.js';
// import Swal from 'sweetalert2';
import vueMoment from 'vue-moment'
import MainLayout from '../../layouts/Main.vue';
import Loader from '../../views/Loader';
import {buildPage} from '../../utils/pageService';
import {mapGetters} from 'vuex';
import TotBox from '@/components/picking/TotBox';
import AlterProduct from '@/components/picking/AlterProduct';
import OrderDetailBox from '@/components/order/OrderDetailBox';
import OrderMemoBox from '@/components/order/OrderMemoBox';
Vue.use(vueMoment);

export default {
    name: 'ManualPick',
    components: {
     MainLayout,
     'Loader': Loader,
      TotBox,
      AlterProduct,
      OrderDetailBox,
      OrderMemoBox,
    },
  data: () => ({
      deliNo:'',
      page:1,
      
      productId:'',
      imgUrl:'',
      qty:0,
      salePrice:0,
      orderCode:'',
      pickQty:0,

      centerCode:'',
      memo:'',
      orderCode:'',
      deliOrder:'',
      deliDate:'',
      deliMethod: '',
      deliNo:'',

      pickData : {
        groupCode:'',
        sPringOutLayer:'',
        deliDate:'',
        deliDiv:'',
        deliOrder:'1',
        pickArea:'A',
        status:'1',
        deliNo:'',
        orderName:'',
        pickerName:'',
        deliNo:'',
        pageGroup:1,
        limit:6,
        cnt:0,
      },
      pageGroup:1,
      limit:6,
      cnt:0,
  })
  ,
  methods : {
    async getManualPicks() {
     
      $("#checkall").prop("checked",false);
        
      console.log('this.page',this.page);
      this.pickData.deliDate = ($("#deliDate").val().length>8) ? ($("#deliDate").val().replaceAll('-','')):'';
      // console.log('gitpicks method started',this.pickData);
      this.pickData.pageGroup= this.page>1 ? ((this.page-1)*6+1) : this.page;
      console.log('this.pageGroup',this.pickData.pageGroup);
      this.pickData.limit=this.pickData.pageGroup+5;
      const senddata = Object.assign({}, this.pickData);
      console.log('senddata is ',senddata);
      await this.$store.dispatch('ManualStore/getManualPickList',senddata);
      
      console.log(this.getManualPickList);
      for(let i=0;i<this.getManualPickList.length;i++){
        this.getManualPickList[i] = Object.assign(this.getManualPickList[i],{checked:false});
      }
      
      if(this.getManualPickList.length>0){
        console.log('this.getManualPickList[0].cnt',this.getManualPickList[0].cnt);
        buildPage(this, this.page,this.getManualPickList[0].cnt, 6);
      }else{
        buildPage(this, this.page,0, 6);
      }
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
     alteropen(){
      console.log('Selected good',this.getGood);
      // console.log('totlist in alteropen', this.getTotList);

      const good = {
        'IMG_URL':this.imgUrl,
        'QTY': this.qty,
        'SALE_PRICE':this.salePrice,
        'ORDER_CODE':this.orderCode
      }

      const toteInfo={
        'DELI_NO':this.deliNo,
        'DELI_DETAIL_SEQ':this.deliDetailSeq,
        'PICK_AREA':'E',
        'MASTER_CART_CODE':'*',
        'orderCode':this.orderCode,
        // 'orderDetailCode':this.orderdetailCode,
        'ORDER_CODE_SEQ':this.orderDetailSeq,

      }
      console.log('toteinfo',toteInfo);
      this.$refs.altercomponent.setValue(good,toteInfo,"",'0','M','*',this.orderCode,'*');
      $("#for-replace-modal").fadeIn(300);
      $("#for-tote-box-modal").fadeOut(300);
    }
    ,
    alterclose(ispick){
      $("#for-replace-modal").fadeOut(300);
      $("#for-tote-box-modal").fadeIn(300);
      if(ispick){
        // this.node='replace';
        this.$refs.productpickcomponent.setNode('replace');
        this.$refs.productpickcomponent.modalclose();
      }
    }
    ,
    openTotBox(){
    
    }
    ,
    openOrderDetail(orderCode, deliOrder, deliDate, deliMethod,deliNo){
        // this.$store.dispatch('setOrderCode',orderCode);
        // this.$emit('order-code', orderCode);
        this.orderCode = orderCode;
        this.deliOrder = deliOrder;
        this.deliDate = this.$moment(deliDate).format('YYYY-MM-DD');
        this.deliMethod = deliMethod;
        this.deliNo=deliNo;
        $("#for-list-modal").fadeIn(300);
      }
      ,
      orderdetailclose(){
        $(".modal").fadeOut(300);
        $("body").css("overflow", "visible");
      }
      ,
      memoopen(deliNo){
          $("#for-memo-modal").fadeIn(300);
          $("#for-list-modal").fadeOut(300);
      }
      ,
      memoclose(){
        $("#for-memo-modal").fadeOut(300);
        $("#for-list-modal").fadeIn(300);
        this.$refs.orderdetailcomponent.fetchMemo();
      }
      ,
    closeModal(){
      $(".modal").fadeOut(300);
      $("body").css("overflow", "visible");
      this.getManualPicks();
    }
    ,
     openTotBox(idx, deliNo, masterCartCode, orderName, masterToteArea, deliDetailSeq, allcQty, pickQty, status, pickArea, productId, orderCode, orderDetailSeq, saleMoney){
      console.log(deliNo);
      console.log(deliDetailSeq);
      console.log(orderCode);
      console.log(orderDetailSeq);
      this.deliNo=deliNo;
      this.deliDetailSeq=deliDetailSeq;
      this.productId=productId;
      this.imgUrl='';
      this.qty=allcQty,
      this.salePrice=saleMoney,
      this.orderCode=orderCode,
      this.orderDetailSeq=orderDetailSeq,
      this.pickQty=pickQty;
      

      this.$refs.productpickcomponent.setqty(Number(allcQty),Number(pickQty),productId,status,'',masterToteArea, pickArea,deliNo+''+deliDetailSeq, [], orderName, masterCartCode, deliDetailSeq);
      $("#for-tote-box-modal").fadeIn(300);
      this.$refs.productpickcomponent.setInputFocus();
    }
    ,
    passtotetype(totetype,totebox){
      console.log('parent totetype has passed',totetype, totebox);
      this.toteType=totetype;
      this.cartCode=totebox;
      // this.$refs.altercomponent.setToteType(totetype, totebox);
    }
    ,
    onClickApp(event) {
        if(this.getManualPickList==null)return;
        if(event.target.name==='chk' || _.isUndefined(event.target.name))return;
        if(this.getManualPickList.length<1 || event.target.id.length===0 || isNaN(event.target.id))return;
        const maxpage = Math.ceil(this.getManualPickList[0].CNT/6);
        const currentpage = this.page;
        let index = Number(event.target.id);

        console.log('currentpage is ', currentpage);
        console.log('target page',event.target.id);
        console.log('max page is',maxpage);
        if(maxpage===currentpage && (index===9999 || index===999) )return;
        if(currentpage===1 && (index===8888 || index===888) )return;
        
        let page=index;

        if(index===888) { page = currentpage-1; }
        if(index===999) { page = currentpage+1; }
        if(index===8888){ page = 1; }
        if(index===9999){ page = maxpage; }
        
        if(currentpage===page){
          return;
        }
        
        console.log("caculation page is ",page);
        this.page = page;
        this.getManualPicks();
      }
      ,
      dateminus(){
        let curdate = $("#deliDate").val();
        if(curdate.length<1){return;}
        $("#deliDate").val(this.$moment(curdate).subtract(1,'days').format('YYYY-MM-DD'));
      }
      ,
      dateplus(){
        let curdate = $("#deliDate").val();
        if(curdate.length<1){return;}
        $("#deliDate").val(this.$moment(curdate).add(1,'days').format('YYYY-MM-DD'));
      }
      ,
      selectpick(index) {
        console.log('checkbox',index);
        this.getManualPickList[index].checked=!this.getManualPickList[index].checked;
        console.log(this.getManualPickList[index].checked);
      }
      ,
      doallcheck(){
        for(let i=0;i<this.getManualPickList.length;i++){
          this.getManualPickList[i].checked=!this.getManualPickList[i].checked;
          //console.log(this.pickDataList[i].checked);
        }
        if ($("#checkall").prop("checked")) {
          $("input[name=chk]").prop("checked", true);
        } else {
          $("input[name=chk]").prop("checked", false);
        }
      }
     ,
     doPick(picknode){
       const title = picknode==='alterindex'?'피킹처리하시겠습니까!':'피킹취소하시겠습니까!';
        Swal.fire({
            title: title,
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '실행',
            cancelButtonText: '취소!'
          }).then((result) => {
            if(result.dismiss==='cancel')return;
            if (result) {
              
              let payload = [];
              let ischecked=false;
              for(let i=0;i<this.getManualPickList.length;i++){
                if(this.getManualPickList[i].checked===true){
                  let param = {
                'status':'15',
                // 'picknode':'alterindex',
                'picknode':picknode,
                'groupkey': '',
                'pickArea' : 'E',
                'toteType': 'M',
                'pickerId': sessionStorage.getItem("userid"),
                'storeCode': sessionStorage.getItem("storeCode"),
                'masterCartCode': '*',
              };
                  console.log(this.getManualPickList[i].deliNo);
                      ischecked=true;
                      param.deliNo = this.getManualPickList[i].deliNo;
                      param.deliDetailSeq = this.getManualPickList[i].deliDetailSeq;
                      param.qty = this.getManualPickList[i].qty;
                      param.pickQty = this.getManualPickList[i].qty;
                      param.totalPickQty = this.getManualPickList[i].qty;
                      // param.orgProductId = this.getManualPickList[i].orgProductId || '*';
                      payload.push(param);
                }
              }
              if(!ischecked){
                 Swal.fire({
                type: 'error',
                title: 'NG!',
                text: '선택된 항목이 없습니다!',
              });
              return;
              }
              console.log('pickdata',payload);
              this.$store.dispatch('ManualStore/doPick', payload).then(() => {
                this.getManualPicks();
              });
        
      }
     })
     
   }
   ,
  
  }
  ,
  mounted(){
    Metro.init();
    var Accordion = function (el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find('.link');
    // Evento
    links.on('click', {
      el: this.el,
      multiple: this.multiple
    }, this.dropdown)
  }

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el;
    var $this = $(this),
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      $el.find('.more').not($next).slideUp().parent().removeClass('open');
    };
  }
  var accordion = new Accordion($('.accordion'), true);
    window.document.addEventListener('click', this.onClickApp);
    // buildPage(this, this.page,this.orderlist[0].CNT, 6);
    $("#deliDate").val(this.$moment().format('YYYY-MM-DD'));
  }
  ,
computed: {
    ...mapGetters('ManualStore',[
       'isLoading',
       'getManualPickList',
    ])
    ,
    ...mapGetters('Authentication',[
       'getOMS_DELI_ORDER',
       'getOMS_DELI_METHOD',
    ])
    ,
    // page() {
    //     return this.$route.params.id;
    // },
  }

  ,
   beforeCreate(){
    const codes = ['OMS_DELI_ORDER','OMS_DELI_METHOD'];
    for(let i=0;i<codes.length;i++) {
      this.$store.dispatch('Authentication/getCode', codes[i]);
    }
    
  }

}

</script>
<style scoped>
.modal{
  z-index: 99;
}
</style>
