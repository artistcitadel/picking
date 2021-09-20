<template>
    <div class="modal" id="for-replace-modal">
  <div class="layer">
    <div class="layer-content">
      <div class="modal-inner modal-md">
        <div class="replace-close" @click="alterclose"></div>
        <div class="modal-header p-b-10">
          <div class="header-title">대체상품</div>
        </div>
        <div class="scan-area">
          <div class="scan-input">
            <input type="text" ref="barcodeinput" v-model="barcodeValue" v-on:keyup.enter="barcodeaction" placeholder="바코드를 스캔하세요.">
            <button type="button" class="ic-scan"></button>
          </div>
        </div>
        <div class="modal-content p-t-10">
         <div class="replace-table box-table table-border">
          <table>
            <colgroup>
            <col width="20%">
              <col width="40%">
               <col width="40%">
            </colgroup>
             <thead>
              <tr>
                <th></th>
                 <th>품절상품</th>
                <th>대체상품</th>
               </tr>
            </thead>
            <tbody>
              <tr>
                <th></th>
                 <td><div class="pr-img"><img :src="imgurl" /></div></td>
                 <td><div class="pr-img"><img :src="getProduct.IMG_URL" /></div></td>
              </tr>
              <tr v-show="getProduct.PRODUCT_ID">
                <th>수량</th>
                 <td>{{qty}}</td>
                 <td><div class="number-area">
                <div class="number-wrap"> <span class="minus" @click="decrease"></span>
                  <div class="input-number-wrap">
                    <input class="input-number" type="text" v-model="pickQty" value="0" min="0"  readonly>
                   </div>
                  <span class="plus" @click="increase"></span> </div>
              </div></td>
              </tr>
              <tr>
                <th>단가</th>
                 <td></td>
                 <td></td>
              </tr>
              <tr>
                <th>행사할인</th>
                 <td>{{getProductTarget.HALIN_TOT_MONEY | currency}}</td>
                 <td>{{sn(getProduct.HALIN_TOT_MONEY) | currency}}</td>
              </tr>
              <tr>
                <th>최종금액</th>
                 <td>{{getProductTarget.SALE_PRICE | currency}}</td>
                 <td v-if="getProduct.PRICE_EDIT_ABLE_YN=='Y'" ><input type="text" v-model="getProduct.SALE_PRICE"/></td>
                 <td v-if="getProduct.PRICE_EDIT_ABLE_YN!='Y'" >{{sn(getProduct.SALE_PRICE) | currency}}</td>
                 
              </tr>
            </tbody>
           </table>
          </div>
          <div class="replace-select border-bk">
                <select v-model="replaceReasonCode">
                  <option value="0">없음</option>
                  <option value="1">상품품절</option>
                  <option value="2">가격차이</option>
                  <option value="3">수량부족</option>
                  <option value="4">고객변심</option>
                  <option value="5">선도불량</option>
                </select>
              </div>
          <div class="btn-area">
            <div class="btn-half">
              <div class="row">
                <div>
                  <button type="button" class="btn btn-big btn-primary-outline w-100" @click="dooutofstock">품절</button>
                </div>
                <div>
                  <button type="button" class="btn btn-big btn-primary w-100" @click="doReplacePick">대체</button>
                </div>
              </div>
            </div>
          </div>
          <div class="table-sm box-table table-border p-t-10">
          <table>
            <thead>
              <tr>
               <th>구분</th>
                 <th>2천원 이하</th>
                 <th>5천원 이하</th>
                 <th>3만원 이하</th>
                 <th>5만원 이하</th>
                 <th>5만원 초과</th>
              </tr>
             
            </thead>
            <tbody>
            <tr>
               <th>상품별 대체금액</th>
               <td>5백원 대체</td>
               <td>1천원 대체</td>
               <td>2천원 대체</td>
               <td>3천원 대체</td>
               <td>품절</td>
              </tr>
              <tr>
              <th>상품별 대체한도</th>
               <td>2천원</td>
               <td>3천원</td>
               <td>5천원</td>
               <td>1만원</td>
               <td>-</td>
              </tr>
            </tbody>
            </table>
          </div>
          <div class="info-text">
          <li>- 품목당 대체상품 차액 및 한도수량이 대체 기준을 넘을 경우 자동품절처리</li>
              <li>- 대체 상품이 고객 마음에 들지 않을 경우 무료반품</li>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Swal from 'sweetalert2';
import VueBarcode from 'vue-barcode';
import {mapGetters} from 'vuex';
 export default {
    name: 'AlterProduct',
    props: {
    }
    ,
    components: {
      'barcode': VueBarcode,
    },
    data: () => ({
      replaceReasonCode:'3',
      imgurl:'',
      salePrice:0,
      qty:0,
      orderCode:'',
      orderDetailSeq:'',
      barcodeValue: '',
      pickQty:1,
      orderCnclType:'2',
      deliNo:'',
      deliDetailSeq:'0',
      status:'',
      masterCartCode:'',
      toteArea:'',
      toteType:'M',
      groupkey:'',
      picknode:'replace',
      errmsg:'',
      currentCartCode:'',
      ispick:false,
      allcQty:'0',
      subPickNode:'',
    })
    ,
     computed: {
       ...mapGetters('GoodStore', [
         'getProduct',
         'getProductTarget',
         'isLoading',
      ])
      ,
      // groupkey() {
      //   return this.$route.params.id;
      // }
    }
    ,
    methods: {
      inspectwoone(oprice, price){
        console.log('intersepter 1', oprice, price-oprice);
        return (oprice<=2000 && price-oprice>500);
        // return (price<=2000)?true:(price-saleprice>500)?true:false;
      }
      ,
      inspectfivethousand(oprice, price){
        console.log('intersepter 2', oprice, price-oprice);
        return ((oprice>2000 && oprice<=5000) && price-oprice > 1000);
        // return (price>2000 && price<=5000)?true:(price-saleprice>1000)?true:false;
      }
      ,
      inspectthreetenthousand(oprice, price){
        console.log('intersepter 3', oprice, price-oprice);
         return (oprice>5000 && oprice<=30000) && (price-oprice>2000);
        // return (price>5000 && price<=30000)?true:(price-saleprice>2000)?true:false;
      }
      ,
      inspectfivetenthousand(oprice, price){
        console.log('intersepter 4', oprice, price-oprice);
        return ((oprice>30000 && oprice<=50000) && price-oprice>10000);
        // return (price>30000 && price<=50000)?true:(price-saleprice>10000)?true:false;
      }
      
      // inspectfivetenthousand(saleprice, price){
      //   return (price>50000)?true:(price-saleprice>3000)?true:false;
      // }
      ,

      alterclose() {
        this.$emit('alter-close',this.ispick);
      }
      ,
      sn(value){
        if(isNaN(value))return '';
        else return value;
      }
      ,
      showValidationMsg(intersepter){
        Swal.fire({
              type: 'error',
              title: 'NG!',
              text: this.errmsg,
            });
            return intersepter;
      }
      ,
      instersepect(price){
        const oprice = this.getProductTarget.SALE_PRICE;
        console.log('oprice',oprice);
        console.log('price',price);
        let intersepter=0;
        if(this.inspectwoone(oprice, price)){
          intersepter=1;
          this.errmsg=`${this.currency(price)}입니다 2천원 이하 대체한도에 위배됩니다 차이가 5배원한도까지 대체가능합니다!`;
             return this.showValidationMsg(intersepter);
        }

        if(this.inspectfivethousand(oprice, price)){
          intersepter=1;this.errmsg=`${this.currency(price)}입니다 5천원 이하 대체한도에 위배됩니다 차이가 천원한도까지 대체가능합니다!`
          return this.showValidationMsg(intersepter);
        }
        if(this.inspectthreetenthousand(oprice, price)){
          intersepter=3;this.errmsg=`${this.currency(price)}입니다 3만원 이하 대체한도에 위배됩니다 차이가 이천원 한도까지 대체가능합니다!`
          return this.showValidationMsg(intersepter);
        }
        if(this.inspectfivetenthousand(oprice, price)){
            intersepter=4;this.errmsg=`${this.currency(price)}입니다 5만원 이하 대체한도에 위배됩니다 차이가 삼천원 한도까지 대체가능합니다!`
            return this.showValidationMsg(intersepter);
        }
        
        
        
        if(price>50000){intersepter=5;this.errmsg=`${this.currency(price)}입니다 5만원을 초과할 수 없습니다!`
             return this.showValidationMsg(intersepter);
        }
        
        // if(intersepter!==0){
        //   Swal.fire({
        //       type: 'error',
        //       title: 'NG!',
        //       text: this.errmsg,
        //     });
        // }
        return intersepter;
      }
      ,
      increase(){
        console.log(this.pickQty);
        // let product = this.getProduct;
        // let price = product.salePrice*2;
        
        // if(this.instersepect(price)!==0)return;
        
        ++this.pickQty;
        // product.salePrice=price;
        // this.$store.dispatch('GoodStore/setProductInfo',product);
        //this.$forceUpdate();
      }
      ,
      decrease(){
        if(this.pickQty===0){
          return;
        }
        --this.pickQty;
        // let product = this.getProduct;
        // product.salePrice=product.salePrice/2;
        // this.$store.dispatch('GoodStore/setProductInfo',product);
      }
      ,
      setValue(currentgood,toteinfo,groupkey,toteArea,toteType,cartCode,orderCode,currentCartCode){
        console.log("totebox",toteinfo);
        this.$store.dispatch('GoodStore/setProductInfo',{});
        this.ispick=false;
        // console.log(cartCode);
        // console.log('Current good',currentgood);
        console.log(toteinfo);
        this.orgProductId=currentgood.PRODUCT_ID;
        this.imgurl = currentgood.IMG_URL;
        // this.qty = currentgood.QTY;
        this.qty = toteinfo.QTY;
        this.salePrice = currentgood.SALE_PRICE;
        this.allcQty = currentgood.ALLC_QTY;
        this.orderDetailSeq = toteinfo.ORDER_CODE_SEQ;
        console.log('orderDetailSeq',this.orderDetailSeq);
        this.deliNo = toteinfo.DELI_NO;
        this.deliDetailSeq = toteinfo.DELI_DETAIL_SEQ;
        this.groupkey=groupkey;
        this.pickArea = toteinfo.PICK_AREA;
        this.toteArea = Number(toteArea)+1;
        this.toteType=toteType;
        this.pickQty=0;
        this.barcodeValue='';
        this.orderCnclType='2';
        this.picknode='replace';
        this.replaceReasonCode='3';
        this.orderCode = orderCode;
        this.masterCartCode=toteinfo.MASTER_CART_CODE;
        this.currentCartCode=currentCartCode;
        // if(toteType==='C')this.masterCartCode=cartCode;
        // this.$store.dispatch('GoodStore/setProductInfo',{});
        console.log('orderCode',this.orderCode);
        console.log('orderDetailSeq',this.orderDetailSeq);
        const param = {
          storeCode : sessionStorage.getItem("storeCode"),
          orderCode : this.orderCode,
          orderDetailSeq : this.orderDetailSeq,
        }
        this.$store.dispatch('GoodStore/getProductInfoTarget',param).then(() => {
        console.log('getProductTarget',this.getProductTarget);
        });
        
        if(currentCartCode==='*')this.subPickNode='alterlation';
      }
      ,
      barcodeaction(e){
      console.log(e.target.value, e.target.value.length);
      const svalue = e.target.value;
      // if(svalue.length!==8){
        
      //      Swal.fire({
      //         type: 'error',
      //         title: 'NG!',
      //         text: '상품을 스캔하세요!',
      //       });
      //       this.barcodeValue='';
      //       this.$refs.barcodeinput.focus();
      //       return;
      // }
         
      const param = {
        'orderCode':this.orderCode,
        'orderDetailSeq':this.orderCodeSeq,
        'storeCode': sessionStorage.getItem("storeCode"),
        'productId': this.barcodeValue,
      }   
      
      this.$store.dispatch('GoodStore/getProductInfo', param).then(() => {
          console.log('getProduct',this.getProduct);
          // this.altergood=data;
          
          if(this.instersepect(this.getProduct.SALE_PRICE)!==0){
            this.$store.dispatch('GoodStore/setProductInfo',{});
            return;
          }

          this.barcodeValue='';
          this.pickQty=1;
          this.$forceUpdate();
          this.$refs.barcodeinput.focus();
      });
      this.barcodeValue='';
      this.$refs.barcodeinput.focus();
    }
    ,
    setToteType(toteType){
      this.toteType=toteType;
    }
    ,
    dooutofstock(){
      this.picknode="outofstock";
      this.status="99";
      this.doPick();
    },
    doReplacePick(){
      this.status="99";
      this.orderCnclType="2";
      this.picknode="replace";
      this.doPick();
    }
    ,
    doPick(){
      console.log(_.isUndefined(this.getProduct.PRODUCT_ID));
      console.log(this.pickQty);
      if(_.isUndefined(this.getProduct.PRODUCT_ID) && this.picknode!=='outofstock'){
           Swal.fire({
              type: 'error',
              title: 'NG!',
              text: '대체상품을 스캔하세요!',
            });
            this.barcodeValue='';
            this.$refs.barcodeinput.focus();
            return;
      }
      if(this.pickQty===0 && this.picknode!=='outofstock'){
           Swal.fire({
              type: 'error',
              title: 'NG!',
              text: '수량을 입력하세요!',
            });
            this.barcodeValue='';
            this.$refs.barcodeinput.focus();
            return;
      }
       const title = (this.picknode==="outofstock")?'품절처리하시겠습니까?':'대체하시겠습니까?';
       Swal.fire({
            title: title,
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '피킹!',
            cancelButtonText: '취소!'
          }).then((result) => {
            if(result.dismiss==='cancel')return;
            if (result) {

      let param = {
                  orderCode:this.ordercode,
                  deliNo: this.deliNo,
                  status: this.status,
                  deliDetailSeq: this.deliDetailSeq,
                  masterCartCode: this.masterCartCode,
                  currentCartCode:this.currentCartCode,
                  pickQty: this.pickQty,
                  totalPickQty:this.qty,
                  allcQty:this.allcQty,
                  pickArea:this.pickArea,
                  toteType:this.toteType,
                  toteArea:this.toteArea,
                  pickerId:sessionStorage.getItem("userid"),
                  groupkey:this.groupkey,
                  orderCnclType:this.orderCnclType,
                  picknode:this.picknode,
                  replaceReasonCode:this.replaceReasonCode,
                  salePrice: this.salePrice,
                  productId:this.getProduct.PRODUCT_ID,
                  orgProductId:this.orgProductId,
                  jmProductYn:'Y',
                  subPickNode:this.subPickNode,
                  priceEditAbleYn : this.getProduct.PRICE_EDIT_ABLE_YN,
                  orderPrice : this.getProduct.SALE_PRICE,
                }
                console.log('do picking',param);
                this.$store.dispatch('GoodStore/dopick', param).then(() => {
                  this.ispick=true;
                  this.alterclose();
                  this.ispick=false;
                });
             }
          });
        }

        ,
      currency(value){
         return Number(value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
       }
    }

    ,
    filters: {
      currency : function (value) {
       return Number(value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    }
 } 
</script>
<style scoped>
.modal{
  z-index: 10;
}
</style>
