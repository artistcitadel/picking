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
                <select v-model="pickData.deliMethod">
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
              
              <div class="input-set" style="width: 18%">
                <div class="input-lable">구분</div>
                <select v-model="pickData.groupCode">
                  <option value="">전체</option>
                  <option value="713">농산</option>
                  <option value="714">수산</option>
                  <option value="715">축산</option>
                  <option value="610">베이커리</option>
                </select>
              </div>

            </div>
          </div>
          <div class="btn-search-area">
            <button type="button" @click="getOrderList" class="btn btn-search btn-bk"><span>검색</span></button>
          </div>
        </div>
        
        
      </ul>
    </div>

    <!--테이블-->
    <div class="main-table">
      <div class="table-title-area">
        <div class="table-total">총<span class="text-primary" v-if="orderlist.length>0">{{orderlist[0].CNT}}</span>건</div>
        <div class="table-btn-area">
          <button type="button" class="btn btn-ml btn-primary btn-ic ic-print-wh modal-open print-modal" @click="printJangman">장만출력</button>
        </div>
      </div>
      <div class="table-lg">
        <table>
          <colgroup>
          <col width="50px"/>
          <col width="50px"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="30%"/>
          <col/>
          <col/>
          <col width="10%"/>
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
              <!-- <th></th> -->
              <th>주문번호</th>
              <th>주문자ID</th>
              <th>주문자명</th>
              <th>상품명</th>
              <th>비고</th>
              <th>출력횟수</th>
            </tr>
          </thead>
          <tbody v-if="orderlist.length>0">
            <tr v-for="(order,index) in orderlist" :key="index">
              
              <td :rowspan="orderlist[index].ROWSPAN" v-if="orderlist[index].ROWSPAN!=='0' ? true:'' ">
                <div class="only-check">
                  <div class="checkbox">
                    <input :id="orderlist[index].ORDER_CODE" value="orderlist[index].ORDER_CODE" v-model="orderlist[index].checked"
                    @click="selectpick(index)" name="chk" type="checkbox">
                    <label :for="orderlist[index].ORDER_CODE" class="checkbox-label" ></label>
                  </div>
                </div>
              </td>

              <!-- <td><div class="ic-print-badge active"></div></td> -->
              <!-- <td><div v-bind:class="['ic-print-badge', (orderlist[index].active) ? 'active' : '' ]"></div></td> -->
              <!-- <td>{{!index}}</td> -->
              <td :rowspan="orderlist[index].ROWSPAN"
                  v-if="orderlist[index].ROWSPAN!=='0' ? true:'' "
              >
                 <span class="link modal-open list-modal">{{orderlist[index].ORDER_CODE}}</span>
              </td>
              
             
              <td :rowspan="orderlist[index].ROWSPAN" v-if="orderlist[index].ROWSPAN!=='0' ? true:'' ">
                {{orderlist[index].ORDER_ID}}</td>
              <td :rowspan="orderlist[index].ROWSPAN" v-if="orderlist[index].ROWSPAN!=='0' ? true:'' ">
                {{orderlist[index].ORDER_NAME}}</td>
              <td>{{orderlist[index].PRODUCT_NAME}}</td>
              <td>{{orderlist[index].PRO_OPTION_VALUE}}</td>
              <td>{{orderlist[index].JM_PRINT_CNT}}</td>
            </tr>
            
          </tbody>
        </table>
         <!-- <div v-if="this.pickDataList.length>10" class="pagenation"> -->
            <div class="pagenation" ref="pagenation">  
              <ul id="pageView" ref="pageView">
              </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="pos-fixed pos-center">
    <Loader v-show="isLoading" />
  </div>

</div>

</main-layout>
</template>
<script>
import Vue from 'vue';
import _ from 'lodash';
import $ from 'jquery';
import Metro from '../../js/metro.min.js';
import Swal from 'sweetalert2';
import vueMoment from 'vue-moment'
import MainLayout from '../../layouts/Main.vue';
import Loader from '../../views/Loader';
import {buildPage} from '../../utils/pageService';
import {mapGetters} from 'vuex';
Vue.use(vueMoment);

export default {
    name: 'jangmanList',
    components: {
     MainLayout,
     'Loader': Loader,
    },
  data: () => ({
      page:1,
      pickData : {
        groupCode:'',
        sPringOutLayer:'',
        deliDate:'',
        deliMethod:'1',
        deliDiv:'O01',
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
      jangmanList:[
        // {'CNT':'9','orderNumber':'111111','orderId':'ryan','orderName':'ryan','productName':'keyboard','etc':'empty','worker':'ryan','rowspan':'1'},
        // {'CNT':'9','orderNumber':'111111','orderId':'ryan','orderName':'ryan','productName':'mouse','etc':'empty','worker':'ryan','rowspan':'1'},
        // {'CNT':'9','orderNumber':'222222','orderId':'janet','orderName':'janet','productName':'monitor','etc':'empty','worker':'janet','rowspan':'1'},
        // {'CNT':'9','orderNumber':'222222','orderId':'janet','orderName':'janet','productName':'case','etc':'empty','worker':'janet','rowspan':'1'},
        // {'CNT':'9','orderNumber':'333333','orderId':'paul','orderName':'paul','productName':'ram','etc':'empty','worker':'paul','rowspan':'1'},
        // {'CNT':'9','orderNumber':'333333','orderId':'paul','orderName':'paul','productName':'graphic','etc':'empty','worker':'paul','rowspan':'1'},
        // {'CNT':'9','orderNumber':'333333','orderId':'paul','orderName':'paul','productName':'board','etc':'empty','worker':'paul','rowspan':'1'},
        // {'CNT':'9','orderNumber':'444444','orderId':'david','orderName':'david','productName':'ram','etc':'empty','worker':'david','rowspan':'1'},
        // {'CNT':'9','orderNumber':'555555','orderId':'david','orderName':'david','productName':'processor','etc':'empty','worker':'david','rowspan':'1'},
      ],
      pageGroup:1,
      limit:6,
      cnt:0,
  })
  ,
  methods : {
    async getOrderList() {
     
      $("#checkall").prop("checked",false);
        
      console.log('this.page',this.page);
      this.pickData.deliDate = ($("#deliDate").val().length>8) ? ($("#deliDate").val().replaceAll('-','')):'';
      // console.log('gitpicks method started',this.pickData);
      this.pickData.pageGroup= this.page>1 ? ((this.page-1)*6+1) : this.page;
      console.log('this.pageGroup',this.pickData.pageGroup);
      this.pickData.limit=this.pickData.pageGroup+5;
      this.pickData.limit=999;
      const senddata = Object.assign({}, this.pickData);
      console.log('senddata is ',senddata);
      await this.$store.dispatch('JangmanStore/getJangman',senddata);
      
      // console.log(this.getOrderspec);
      for(let i=0;i<this.getOrderspec.length;i++){
        this.getOrderspec[i] = Object.assign(this.getOrderspec[i],{checked:false});
        // this.getOrderspec[i] = Object.assign(this.getOrderspec[i],{active:false});
      }
      this.jangmanList = this.getOrderspec;  
      // if(this.getOrderspec.length>0){
      //   console.log('this.getOrderspec[0].CNT',this.getOrderspec[0].CNT);
      //   buildPage(this, this.page,this.getOrderspec[0].CNT, 6);
      // }else{
      //   buildPage(this, this.page,0, 6);
      // }
    }
    ,
    onClickApp(event) {
        if(event.target.name==='chk' || _.isUndefined(event.target.name))return;
        if(this.getOrderspec.length<1 || event.target.id.length===0 || isNaN(event.target.id))return;
        const maxpage = Math.ceil(this.getOrderspec[0].CNT/6);
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
        this.getOrderList();
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
        this.orderlist[index].checked=!this.orderlist[index].checked;
        console.log(this.orderlist[index].checked);
      }
      ,
      doallcheck(){
        for(let i=0;i<this.orderlist.length;i++){
          this.orderlist[i].checked=!this.orderlist[i].checked;
          //console.log(this.pickDataList[i].checked);
        }
        if ($("#checkall").prop("checked")) {
          $("input[name=chk]").prop("checked", true);
        } else {
          $("input[name=chk]").prop("checked", false);
        }
      }
      ,
      printJangman(){
        if(this.pickData.groupCode===''){
           Swal.fire({
             title: '구분이 전체일경우 출력 할 수 없습니다!',
             text: "",
             type: 'warning',
           });
           
           return;
        }
        // if(this.pickData.groupCode==="")return;
        let ischecked=false;
        let orderCodeArr=[];
        let orderCodes='';
        let orderDetailSeqArr=[];
        let orderDetailSeq='';

        let groupOrder = _.groupBy(this.orderlist, 'ORDER_CODE' );
        console.log(groupOrder);
        _.map(groupOrder,function(v,k){
          console.log("k ", k);
          console.log("v", v);
            for(let i=0;i<v.length;i++){
              if(v[0].checked){
                orderCodeArr.push(v[i].ORDER_CODE);
                orderDetailSeqArr.push(v[i].ORDER_DETAIL_SEQ);
              }
            }
        });
        console.log(orderCodeArr);
        
        // if(!ischecked){
        if(orderCodeArr.length<1) {
         Swal.fire({
             title: '항목을 선택하세요!',
             text: "",
             type: 'warning',
           });
           
           return;
      }

        orderCodes = orderCodeArr.join(',');
        orderDetailSeq = orderDetailSeqArr.join(',');
           let param = {
             'orderCodes':orderCodes,
             'orderDetailSeq':orderDetailSeq,
             'sPringOutLayer':this.pickData.sPringOutLayer,
             'groupCode':this.pickData.groupCode,
           }
           console.log(param);
            this.$store.dispatch('JangmanStore/printJangman', param).then((rtn) => {
                if(rtn===1){
                  this.getOrderList();
                  // for(let i=0;i<this.orderlist.length;i++){
                  //   if(this.orderlist[i].checked===true){
                  //     this.orderlist[i].JM_PRINT_CNT=Number(this.orderlist[i].JM_PRINT_CNT)+1;
                  //   }
                  // }         
                }
            });
      }  
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
    //  this.deliDiv='001';
  }
  ,
  computed: {
    ...mapGetters('JangmanStore',[
       'isLoading',
       'getOrderspec',
    ])
   ,
   orderlist() {
     let rowspancnt = 1;
     let currentrow=0;
       for(let i=0;i<this.jangmanList.length;i++){
          console.log('current key', this.jangmanList[i].ORDER_CODE);
           if(i<this.jangmanList.length-1 && this.jangmanList[i].ORDER_CODE === this.jangmanList[i+1].ORDER_CODE){
              console.log('loop', i, this.jangmanList[i].ORDER_CODE);
              currentrow=i;
             let key = this.jangmanList[currentrow].ORDER_CODE;
             for(let j=(i+1);j<this.jangmanList.length;j++){
               if(key === this.jangmanList[j].ORDER_CODE) {
                 this.jangmanList[j].ROWSPAN='0';
                  ++rowspancnt;
                  ++i;
                  console.log('same order number',key, rowspancnt);
               }
             }
             console.log('rowspan',this.jangmanList[currentrow].ORDER_CODE, rowspancnt);
             this.jangmanList[currentrow].ROWSPAN=rowspancnt;
          }
          rowspancnt=1;
       }
      //  console.log('orderlist', this.jangmanList);
       return this.jangmanList;
    }
   ,
   ...mapGetters('Authentication',[
       'getOMS_DELI_METHOD',
       'getOMS_DELI_ORDER',
      //  'getOMS_STATUS',
      //  'getOMS_PICK_AREA',
    ])
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

</style>
