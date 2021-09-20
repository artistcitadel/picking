<template>
<!-- <main-layout ref="layoutcomponent"> -->
<main-layout>
<!--컨텐츠-->
<div class="section">
  <div class="section-wrap"> 
    <!--검색-->
    <div class="search-area">
      <ul class="accordion">
        <div class="main-search-area">
          <div class="input-area">
            <div class="row">
              <div class="input-set" style="width: 37%">
                <div class="input-lable"></div>
                <input type="text" style="text-align:center" id="deliDate" data-role="calendarpicker" data-dialog-mode="true" v-on:input="updatedelidate">
                <div class="calendar-btn-area">
                  <button type="button" @click="dateminus" class="btn btn-md btn-grey-outline ic-arrow-left"><span>이전</span></button>
                  <button type="button" @click="dateplus" class="btn btn-md btn-grey-outline ic-arrow-right"><span>다음</span></button>
                </div>
              </div>

              <div class="input-set" style="width:26%">
                <div class="input-lable"></div>
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
              <div class="input-set" style="width: 25%">
                <div class="input-lable"></div>
                <select id="pickArea" v-model="pickData.pickArea" @change="setTaskPickArea">
                  <option
                    v-for="o in this.getOMS_PICK_AREA"
                    :key="o.ETC_CODE" v-bind:value="o.ETC_CODE"
                    >
                    {{ o.ETC_NAME }}
                  </option>
                </select>
              </div>

              <div class="input-set" style="width: 18%">
                <select v-model="pickData.status">
                  <option value=""></option>
                  <option
                    v-for="o in this.getOMS_STATUS"
                    :key="o.ETC_CODE" v-bind:value="o.ETC_CODE"
                    >
                    {{ o.ETC_NAME }}
                  </option>
                </select>
              </div>

            </div>
          </div>
          <div class="btn-search-area">
            <button type="button" @click="getPicks" class="btn btn-search btn-bk"><span>검색</span></button>
          </div>
        </div>
        <div class="link"><span class="down-ic"> </span> </div>
        <div class="more">
          <div class="input-area">
            <div class="row">
              <div class="input-set" style="width:30%">
                <div class="input-lable">주문번호</div>
                <input type="text" v-model="pickData.deliNo">
              </div>
              <div class="input-set" style="width: 22%">
                <div class="input-lable">주문자</div>
                <input type="text" v-model="pickData.orderName">
              </div>
              <div class="input-set" style="width: 22%">
                <div class="input-lable">작업자</div>
                <input type="text" v-model="pickData.pickerName">
              </div>
              
            </div>
          </div>
        </div>
      </ul>
    </div>
    <!--테이블-->
    
    <div class="main-table">
      <div class="table-title-area">
        <div class="table-total">총 주문건<span class="text-primary" v-if="this.getPickList.length>0">{{this.getPickList[0].CNT}}</span></div>
        <div class="table-btn-area">
          <!-- <button v-show="hasjob" type="button" class="btn btn-ml btn-primary ic-picking" @click="rollbacktote" v-if="getPickStage>0">토트취소</button>
          <button v-show="hasjob" type="button" class="btn btn-ml btn-primary ic-picking" @click="rollbackpick" v-if="getPickStage>1">피킹취소</button> -->
          <button v-show="hasjob" type="button" class="btn btn-ml btn-primary ic-picking" @click="movetask" v-if="getPickStage>0">이어가기</button>
          <button type="button" class="btn btn-ml btn-primary ic-picking" @click="movepick" v-if="getPickStage<1">피킹시작</button>
        </div>
      </div>
      <div class="table-lg table-nowrap">
        <table>
          <colgroup>
          <col width="50px"/>
          <col width="15%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="15%"/>
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
              <th>주문번호</th>
              <th>주문자ID</th>
              <th>주문자명</th>
              <th>상품명</th>
              <th>상품수</th>
              <th>피킹수량</th>
              <th>작업자</th>
              <th>특이사항</th>
            </tr>
          </thead>
          <tbody v-if="this.getPickList.length>0">
              <!-- <pick-table-list :pickData="pickData"/> -->
              <tr v-for="(pick,index) in getPickList" :key="index">
              <td>
                <div class="only-check">
                  <div class="checkbox">
                    <input :id="getPickList[index].ORDER_CODE" value="getPickList[index].ORDER_CODE" v-model="getPickList[index].checked"
                    @click="selectpick(index)" name="chk" type="checkbox">
                    <label :for="getPickList[index].ORDER_CODE" class="checkbox-label" ></label>
                  </div>
                </div></td>
              <td><span class="link modal-open list-modal" style="font-size:medium;" 
              @click="openOrderDetail(getPickList[index].ORDER_CODE ,getPickList[index].DELI_ORDER , getPickList[index].DELI_DATE, getPickList[index].DELI_METHOD, getPickList[index].DELI_NO )">
              {{getPickList[index].ORDER_CODE.substring(8)}}</span></td>
              <td>{{getPickList[index].ORDER_ID}}</td>
              <td>{{getPickList[index].ORDER_NAME}}</td>
              <td>{{getPickList[index].TITLE_PRODUCT}}</td>
              <td class="bg-sky" style="text-align: center;"><span class="text-blue bold">{{getPickList[index].PRODUCT_CNT}}</span></td>
              <td class="bg-pink1" style="text-align: center;"><span class="text-primary bold">{{getPickList[index].PICK_QTY}}</span>/{{getPickList[index].QTY}}</td>
              <td>{{getPickList[index].PICKER_ID}}</td>
              <td><div class="state-area">
                  <div v-if="getPickList[index].DELI_METHOD=='1'" class="state bg-red">일반</div>
                  <div v-if="getPickList[index].DELI_METHOD=='2'" class="state bg-blue">픽업(DT)</div>
                  <div v-if="getPickList[index].DELI_METHOD=='3'" class="state bg-yellow1">새벽배송</div>
                </div>
              </td>
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

<!-- <order-detail-box @modal-close='orderdetailclose' v-bind:ordercode="orderCode" v-bind:deliOrder="deliOrder" v-bind:deliDate="deliDate" v-bind:deliMethod="deliMethod" /> -->
<order-detail-box ref="orderdetailcomponent" @modal-close='orderdetailclose' @memo-open="memoopen" v-bind:ordercode="orderCode" v-bind:deliOrder="deliOrder" v-bind:deliDate="deliDate" v-bind:deliMethod="deliMethod" v-bind:memo="memo" v-bind:centerCode="centerCode" v-bind:deliNo="deliNo"/>
<!-- <order-memo-box @memo-close="memoclose" @add-task='addNewTask' v-bind:deliNo="deliNo"/> -->
<order-memo-box @memo-close="memoclose" v-bind:deliNo="deliNo"/>
  
</div>

</main-layout>
</template>
<script>
import Vue from 'vue';
import Swal from 'sweetalert2';
import {mapGetters} from 'vuex';
import MainLayout from '../layouts/Main.vue';
import changeRouteMixin from '@/mixin/changeRoute';
import _ from 'lodash';
import $ from 'jquery';
import Metro from '../js/metro.min.js';
import Loader from './Loader';
import vueMoment from 'vue-moment'
import OrderDetailBox from '@/components/order/OrderDetailBox';
import OrderMemoBox from '@/components/order/OrderMemoBox';
import {buildPage} from '../utils/pageService';

Vue.use(vueMoment);

export default {
    name: 'Index',
    components: {
      MainLayout,
     'Loader': Loader,
     OrderDetailBox,
     OrderMemoBox
  },
  mixins: [changeRouteMixin],
  data: () => ({
    orderCode:'',
    deliOrder:'',
    deliDate:'',
    deliMethod: '',
    deliNo:'',
    centerCode:'',
    memo:'',
    page:1,
    pickDataList:[],
    pickData : { 
      deliDate:'',
      deliMethod: '1',
      deliDiv:'05',
      deliOrder:'1',
      pickArea:'A',
      status:'',
      deliNo:'',
      orderName:'',
      pickerName:'',
      deliNo:'',
      pageGroup:1,
      limit:6,
      cnt:0,
    },
    OMS_STATUS:[],
    OMS_DELI_DIV:[],
    OMS_DELI_ORDER:[],
    OMS_DELI_METHOD:[],
    OMS_PICK_AREA:[]
    ,
    hasjob:false,
    stage:0,
  })
  // ,
  // emits: ['order-code']
  ,
    methods: {
      async getPicks(){
        // this.$refs.layoutcomponent.fullscreentoggle();
        $("#checkall").prop("checked",false);
        
        console.log('this.page',this.page);
        this.pickData.deliDate= ($("#deliDate").val().length>8) ? ($("#deliDate").val().replaceAll('-','')):'';
        console.log('gitpicks method started',this.pickData);
        this.pickData.deliNo = this.pickData.deliNo.trim();
        this.pickData.orderName = this.pickData.orderName.trim();
        this.pickData.pickerName = this.pickData.pickerName.trim();
        this.pickData.pageGroup= this.page>1 ? ((this.page-1)*6+1) : this.page;
        console.log('this.pageGroup',this.pickData.pageGroup);
        this.pickData.limit=this.pickData.pageGroup+5;
        const senddata = Object.assign({}, this.pickData);
        console.log('senddata is ',senddata);
        await this.$store.dispatch('PickStore/getpicks',senddata);
        // console.log(this.$store.state.data.pickList);
        // this.pickDataList = this.$store.state.data.pickList;
        console.log("getpickList");
        console.log(this.getPickList.lengh);
        for(let i=0;i<this.getPickList.length;i++){
          this.getPickList[i] = Object.assign(this.getPickList[i],{checked:false});
        }
        
        // console.log('gitpicks method end',this.pickDataList[0].DELI_NO);
        if(this.getPickList.length>0){
          console.log('this.getPickList[0].CNT',this.getPickList[0].CNT);
          buildPage(this, this.page,this.getPickList[0].CNT, 6);
        }else{
          buildPage(this, this.page,0, 6);
        }
      //  this.$refs.scrollInto.scrollIntoView()
      }
      ,
      onClickApp(event) {
        if(event.target.name==='chk' || _.isUndefined(event.target.name))return;
        if(this.getPickList.length<1 || event.target.id.length===0 || isNaN(event.target.id))return;
        const maxpage = Math.ceil(this.getPickList[0].CNT/6);
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
        this.getPicks();
      }
      ,
      dateminus(){
        let curdate = $("#deliDate").val();
        if(curdate.length<1){return;}
        $("#deliDate").val(this.$moment(curdate).subtract(1,'days').format('YYYY-MM-DD'));
        //  console.log(this.pickData.deliDate);
        //  console.log($("#deliDate").val());
        //  let curdate = this.$moment($("#deliDate").val());
        //  console.log(this.$moment(curdate).add(1,'days').format('YYYY-MM-DD'));
        //  console.log(this.$moment(curdate).subtract(1,'days').format('YYYY-MM-DD'));
        //  console.log(this.pickData.deliNo)
      }
      ,
      dateplus(){
        let curdate = $("#deliDate").val();
        if(curdate.length<1){return;}
        $("#deliDate").val(this.$moment(curdate).add(1,'days').format('YYYY-MM-DD'));
      }
      ,
      updatedelidate(event){
        console.log('date updated',event.target.value);
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
      addNewTask(task){
        // alert(`New task added: ${task}`);
        this.memo = task;
      },
      unchecked(){
        return false;
      }
      ,
      selectpick(index) {
        console.log('checkbox',index);
        this.getPickList[index].checked=!this.getPickList[index].checked;
        console.log(this.getPickList[index].checked);
      }
      ,
      doallcheck(){
        for(let i=0;i<this.getPickList.length;i++){
          this.getPickList[i].checked=!this.getPickList[i].checked;
          //console.log(this.pickDataList[i].checked);
        }
        if ($("#checkall").prop("checked")) {
          $("input[name=chk]").prop("checked", true);
        } else {
          $("input[name=chk]").prop("checked", false);
        }
      }
      ,
      movepick(){
        console.log("move picking",this.hasjob);
        if(this.hasjob){
          Swal.fire({
              type: 'error',
              title: 'NG!',
              text: '진행중인 작업이 있습니다! 이어가기 하세요',
            });
          return;
        }
        // this.$store.dispatch('setPickItem',this.pickDataList).then(() => {
        //    this.changeRoute('tot');
        // });

        let delino=[];
        let qty =[];
        let deliDate="";
        // let pickArea = this.pickData.pickArea;
        let ischecked=false;

        for(let i=0;i<this.getPickList.length;i++){
         if(this.getPickList[i].checked===true){
            delino.push(this.getPickList[i].DELI_NO);
            console.log('...qty', this.getPickList[i].QTY);
            qty.push(this.getPickList[i].QTY);
            deliDate = this.getPickList[i].DELI_DATE;
            ischecked=true;
         }
        }
        if(!ischecked){
            Swal.fire({
              type: 'error',
              title: 'NG!',
              text: '주문번호를 선택하세요!',
            });
          return;
        }
        console.log('userid',sessionStorage.getItem("userid"));
        // delino.push(this.$store.state.Authentication.data.userid);
        // delino.push(deliDate);
        // delino.push(pickArea);
        // delino.push(sessionStorage.getItem("userid"));
        let delinostr = delino.join(",");

        let param = {
                    "pickArea" : this.pickData.pickArea,
                    "delinos":delino,
                    "delinostr":delinostr,
                    "deliDate":deliDate,
                    "qtys":qty,
                    "pickerId":sessionStorage.getItem("userid"),
                    "storeCode":sessionStorage.getItem("storeCode"),
        }


        console.log('start picking in param',param);
        this.$store.dispatch('PickStore/instructpick',param).then(() => {
            console.log('result groupkey',this.$store.state.PickStore.groupkey);
            this.changeRoute('tot',this.$store.state.PickStore.groupkey+'.'+this.pickData.pickArea);
         });
     
        // this.$store.dispatch('setPickItem',this.pickDataList).then(() => {
        //    this.changeRoute('tot');
        // });
      

      }
      ,
      movetask(){
        if(this.getPickStage==1)
              this.changeRoute('tot',this.getGroupkey+'.'+this.pickData.pickArea);
        if(this.getPickStage==2)
              this.changeRoute('picking',this.getGroupkey);
      }
      ,
      setPickerTaskByPickArea(){
        console.log('setPickerTaskByPickerArea');
        console.log('user job list', this.getJobList);
        this.$store.dispatch('PickStore/setStage', 0);

        if(this.getJobList.length>0){
          if(this.getJobList[0].STATUS==='12'){
          this.hasjob=true;
          this.stage=2;
          this.$store.dispatch('PickStore/setStage', 2);
          }
          if(this.getJobList[0].STATUS==='10'){
            this.hasjob=true;
            this.stage=1;
            this.$store.dispatch('PickStore/setStage', 1);
          }
          this.$store.dispatch('PickStore/setGroupKey', this.getJobList[0].GROUPKEY)
        }
        
        // if(this.getJobList.length>0){
        //   this.hasjob=true;

        //   // this.stage=1;
        //   this.$store.dispatch('PickStore/setStage', 1);

        //   let pa = this.pickData.pickArea;
        //   const jobList = _.filter(this.getJobList, function(o) { return o.PICK_AREA===pa; });
        //   console.log(jobList);
        //   for(let i=0;i< jobList.length;i++){
        //     if(jobList[i].STATUS==='12'||jobList[i].STATUS==='15')
        //       this.$store.dispatch('PickStore/setStage', 2);
        //   }
        // this.$store.dispatch('PickStore/setGroupKey', jobList[0].GROUPKEY)
        // console.log('is this user has job', this.hasjob);
        // console.log('what on this picker stage',this.getPickStage);
        // }
        //  this.$forceUpdate();
        buildPage(this, this.page,0, 6);
      }
      ,
       setTaskPickArea(){
       this.hasjob=false;
       this.$store.dispatch('PickStore/setStage', "0");
       this.getCurrentJob();  
        // this.setPickerTaskByPickArea();
      }
     	
      ,
      rollbacktote(){
        if(this.getPickStage>1){
           Swal.fire({
              type: 'error',
              title: 'NG!',
              text: '피킹작업중입니다.!',
            });
            return;
        }
         Swal.fire({
            title: '토트취소',
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '토트취소하시겠습니까!',
            cancelButtonText: '취소!'
          }).then((result) => {
            if(result.dismiss==='cancel')return;
           
         
        let delinos=[];
        for(let i=0;i<this.getJobList.length;i++){
          delinos.push("'"+this.getJobList[i].DELI_NO+"'");
        }
        const param = {
          'groupkey':this.getJobList[0].GROUPKEY,
          'delinostr':delinos.join(","),
          'status':'05',
          'pickerId': sessionStorage.getItem("userid"),
        }
        this.$store.dispatch('PickStore/rollbacktote', param).then(() => {
          this.$store.dispatch('PickStore/setStage', "0");
          this.hasjob=false;
          console.log('getPickStage=>',this.getPickStage);
        });
          // this.$store.dispatch('PickStore/getJob', param).then(() => {
          //   console.log("After tote rollback getjob started");
          //   this.setPickerTaskByPickArea();
          // });
        });
      }
      ,
      rollbackpick(){
        Swal.fire({
            title: '피킹취소',
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '피킹취소하시겠습니까!',
            cancelButtonText: '취소!'
          }).then((result) => {
            if(result.dismiss==='cancel')return;

        let delinos=[];
        for(let i=0;i<this.getJobList.length;i++){
          delinos.push("'"+this.getJobList[i].DELI_NO+"'");
        }
        const param = {
          'groupkey':this.getJobList[0].GROUPKEY,
          'delinostr':delinos.join(","),
          'pickerId':sessionStorage.getItem("userid"),
          'pickArea':this.pickData.pickArea,
          'status':'10'
        }
        this.$store.dispatch('PickStore/rollbackpick', param).then(() => {
          this.$store.dispatch('PickStore/setStage', "1");
          console.log('getPickStage=>',this.getPickStage);
        });
          // this.$store.dispatch('PickStore/getJob', param).then(() => {
          //   console.log("After pick rollback getjob started");
          //   this.setPickerTaskByPickArea();
          //   this.$store.dispatch('PickStore/setStage', "1");
          // });

        });
      }

      ,
      getCurrentJob(){
        if(sessionStorage.getItem("username")==null || sessionStorage.getItem("username")=='null') {
            const userId = sessionStorage.getItem("userid");
            console.log('userId in topmenu', userId);
            this.$store.dispatch('Authentication/getUsername',userId).then(() => {
                console.log(this.getUserdata);
                this.username=sessionStorage.getItem("username");
                this.setJob();
                });
        }else{
              this.username=sessionStorage.getItem("username");
              this.setJob();
        }

      }
      ,
      setJob(){
        let pickerId = sessionStorage.getItem("userid");
        console.log('pickArea',this.pickData.pickArea);
        console.log('pickerId',pickerId);
        const storeCode = sessionStorage.getItem("storeCode");
        const param = {
          'pickerId':pickerId,
          'pickArea':this.pickData.pickArea,
          'storeCode':storeCode,
        }
        console.log('getJob param',param);
        this.$store.dispatch('PickStore/getJob', param).then(() => {
            console.log("getjob started");
            this.setPickerTaskByPickArea();
          });
      }
      ,

  }
  ,
  computed: {
    ...mapGetters('PickStore',[
       'isLoading',
       'getPickList',
       'getJobList' ,
       'getGroupkey' ,
       'getPickStage',
    ])
    ,
    ...mapGetters('Authentication',[
       'getOMS_STATUS',
       'getOMS_DELI_DIV',
       'getOMS_DELI_ORDER',
       'getOMS_DELI_METHOD',
       'getOMS_PICK_AREA',
       'getStoreCode',
    ])
    ,
    // page() {
    //     return this.$route.params.id;
    // },
  }
  ,
  mounted(){
    this.$store.dispatch('PickStore/initpicks');
    // console.log('getUserid',sessionStorage.getItem("userid"));
    console.log("PICKING LIST STARTED",this.getOMS_STATUS);
    this.OMS_STATUS = this.$store.state.OMS_STATUS;

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
  
  // $("#pickArea > option[@value=A]").attr("selected","true");
    $("#deliDate").val(this.$moment().format('YYYY-MM-DD'));
  

  this.getCurrentJob();
  
  }

  ,
  beforeCreate(){
    const codes = ['OMS_STATUS','OMS_DELI_DIV','OMS_DELI_ORDER','OMS_DELI_METHOD','OMS_PICK_AREA'];
    for(let i=0;i<codes.length;i++) {
      this.$store.dispatch('Authentication/getCode', codes[i]);
    }
    
  }
  ,
  updated() {
     
  }
  ,  
//  watch: {
//       value: {
//         handler(value) {
//           this.pickData = value;
//         },
//         deep: true,
//         immediate: true,
//       }
//     },

  }
  
</script>
<style scoped>
 .bg-yellow1 {
    background: #ff9600;
}
.modal{
  z-index: 99;
}
</style>
