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
                <input type="text" id="deliDate" data-role="calendarpicker" data-dialog-mode="true">
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
              
            </div>
          </div>
          <div class="btn-search-area">
            <button type="button" @click="getEvents" class="btn btn-search btn-bk"><span>검색</span></button>
          </div>
        </div>
      </ul>
    </div>


<!--테이블-->
   <div class="main-table">
      <div class="table-title-area">
        <div class="table-total">총<span class="text-primary">30</span>건</div>
        <div class="table-btn-area">
          <button type="button" class="btn btn-ml btn-primary btn-ic ic-gift-wh">사은품 출력</button>
        </div>
      </div>
      <div class="table-lg table-nowrap">
        <table>
          <colgroup>
          <col width="50px"/>
          <col width="50px"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          </colgroup>
          <thead>
            <tr>
              <th> <div class="only-check">
                  <div class="checkbox">
                    <input id="checkall" type="checkbox">
                    <label for="checkall" class="checkbox-label"></label>
                  </div>
                </div>
              </th>
              <th></th>
              <th>보관/상차</th>
              <th>주문번호</th>
              <th>주문자ID</th>
              <th>주문자</th>
              <th>상품</th>
              <th>상품수</th>
              <th>상태</th>
              <th>처리</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><div class="only-check">
                  <div class="checkbox">
                    <input id="chk01" name="chk" type="checkbox">
                    <label for="chk01" class="checkbox-label"></label>
                  </div>
                </div></td>
              <td><div class="ic-print-badge active"></div></td>
              <td>01/05</td>
              <td><span class="link modal-open list-modal">123456789</span></td>
              <td>sunny</td>
              <td>이선희</td>
              <td>신라면 외</td>
              <td class="bg-sky"><span class="text-blue bold">3</span></td>
              <td class="text-blue">검수완료</td>
              <td class="text-blue">전송</td>
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
import OrderDetailBox from '@/components/order/OrderDetailBox';
import OrderMemoBox from '@/components/order/OrderMemoBox';
import {buildPage} from '../../utils/pageService';
import {mapGetters} from 'vuex';
Vue.use(vueMoment);

export default {
    name: 'EventList',
    components: {
     MainLayout,
     'Loader': Loader,
      OrderDetailBox,
     OrderMemoBox
    },
  data: () => ({
      title:'',
      buttontitle:'',
      page:1,
      orderCode:'',
      deliOrder:'',
      deliDate:'',
      deliMethod: '',
      deliNo:'',
      memo:'',
      centerCode:'',
      status:'',
      pickData : {
        groupCode:'',
        sPringOutLayer:'',
        deliDate:'',
        deliDiv:'',
        deliOrder:'',
        pickArea:'',
        status:'',
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
    async getEvents() {
     
      $("#checkall").prop("checked",false);
        
      console.log('this.page',this.page);
      this.pickData.deliDate = ($("#deliDate").val().length>8) ? ($("#deliDate").val().replaceAll('-','')):'';
      // console.log('gitpicks method started',this.pickData);
      this.pickData.pageGroup= this.page>1 ? ((this.page-1)*6+1) : this.page;
      console.log('this.pageGroup',this.pickData.pageGroup);
      this.pickData.limit=this.pickData.pageGroup+5;
      const senddata = Object.assign({}, this.pickData);
      console.log('senddata is ',senddata);
      await this.$store.dispatch('ManualStore/getEventList',senddata);
      
      console.log(this.getEventList);
      for(let i=0;i<this.getEventList.length;i++){
        this.getEventList[i] = Object.assign(this.getEventList[i],{checked:false});
      }
      
      if(this.getEventList.length>0){
        console.log('this.getEventList[0].cnt',this.getEventList[0].cnt);
        buildPage(this, this.page,this.getEventList[0].cnt, 6);
      }else{
        buildPage(this, this.page,0, 6);
      }
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
      // this.getInspections();
    }
    ,
    onClickApp(event) {
        if(this.getEventList==null)return;
        if(event.target.name==='chk' || _.isUndefined(event.target.name))return;
        if(this.getEventList.length<1 || event.target.id.length===0 || isNaN(event.target.id))return;
        const maxpage = Math.ceil(this.getEventList[0].CNT/6);
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
        this.getEvents();
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
        this.getInspectionList[index].checked=!this.getInspectionList[index].checked;
        console.log(this.getInspectionList[index].checked);
      }
      ,
      doallcheck(){
        for(let i=0;i<this.getInspectionList.length;i++){
          this.getInspectionList[i].checked=!this.getInspectionList[i].checked;
          //console.log(this.pickDataList[i].checked);
        }
        if ($("#checkall").prop("checked")) {
          $("input[name=chk]").prop("checked", true);
        } else {
          $("input[name=chk]").prop("checked", false);
        }
      }
     ,
     doInspect(){
       this.status="40";
       this.title='확정처리하시겠습니까!';
       this.buttontitle="확정";
       this.doPick();
     }
     ,
     doReverseInspect(){
       this.status="01";
       this.title='확정취소하시겠습니까!',
       this.buttontitle="확정취소";
       this.doPick();
     }
     ,
     doPick(){
        Swal.fire({
            title: this.title,
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this.buttontitle,
            cancelButtonText: '취소!'
          }).then((result) => {
            if(result.dismiss==='cancel')return;
            if (result) {
              let param = {
                'status':this.status,
                'picknode':'alterandinspection',
                'groupkey': '',
                'pickArea' : 'E',
                'toteType': 'M',
                'pickerId': sessionStorage.getItem("userid"),
                'storeCode': sessionStorage.getItem("storeCode"),
                'masterCartCode': '*',
              };
              let payload = [];
              let ischecked=false;
              for(let i=0;i<this.getInspectionList.length;i++){
                if(this.getInspectionList[i].checked===true){
                      ischecked=true;
                      param.deliNo = this.getInspectionList[i].deliNo;
                      param.deliDetailSeq = this.getInspectionList[i].deliDetailSeq;
                      param.qty = this.getInspectionList[i].qty;
                      param.pickQty = this.getInspectionList[i].qty;
                      param.totalPickQty = this.getInspectionList[i].qty;
                      payload.push(param);
                }
              }
              if(!ischecked){
                 Swal.fire({
                type: 'error',
                title: 'NG!',
                text: '선택된 항목이 없습니다!',
              });
              this.barcodeValue='';
              return;
              }
              console.log(payload);
              this.$store.dispatch('ManualStore/doPick', payload).then(() => {
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
  }
  ,
computed: {
    ...mapGetters('ManualStore',[
       'isLoading',
       'getEventList',
    ])
    ,
    ...mapGetters('Authentication',[
       'getOMS_DELI_METHOD',
    ])
    ,
  }
   ,
   beforeCreate(){
    const codes = ['OMS_DELI_METHOD'];
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
