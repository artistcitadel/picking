<template>
    <div class="show-area">
  <div class="overlay"></div>
  <div class="block-content">
    <div class="spinner-master">
      <div class="spinner"></div>
    </div>
    <div class="show-header">
      <div class="header-title">
        <li>전체 피킹목록</li>
      </div>
    </div>
    <div class="table-title-area">
      <div class="table-total">
        <li>총 주문 건<span class="text-primary" v-if="this.getGoods.length>0">{{this.getGoods[0].TOTAL_CNT}}</span></li>
        <li>피킹 완료 건<span class="text-blue" v-if="this.getGoods.length>0">{{this.pickcnt}}</span></li>
      </div>
    </div>
    <div class="table-sm pr-table scroll td-hover ">
      <table>
        <colgroup>
        <col width="8%"/>
        <col/>
        <col width="50px"/>
        <col width="10%"/>
        <col width="10%"/>
        <col width="10%"/>
        <col width="10%"/>
        </colgroup>
        <thead>
          <tr>
            <th>NO</th>
            <th>상품명</th>
            <th>상품코드</th>
            <th>주문수량</th>
            <th>재고</th>
            <th>위치</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody v-if="this.getGoods.length>0">
          <tr class="bg-sky" v-for="(good,index) in getGoods" :key="index">
            <td>{{index+1}}</td>
            <td class="text-left text-bk md-bold"><div class="pr-content">
                <div class="pr-img">
                  <img :src="getGoods[index].IMG_URL" />
                </div>
                <div class="pr-text">{{getGoods[index].PRODUCT_NAME}}</div>
              </div></td>
            <td>{{getGoods[index].PRODUCT_CODE}}</td>
            <td>{{getGoods[index].QTY}}</td>
            <td>{{getGoods[index].CURRENT_STOCK_QTY | comma}}</td>
            <td class="text-blue">{{getGoods[index].PRODUCT_AREA}}</td>
            <td class="text-blue">{{getNameByStatus(getGoods[index].STATUS)}}</td>
          </tr>
          
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>
<script>

// import {getGroupKey} from '../../utils/commService';
import {mapGetters} from 'vuex';
 export default {
    name: 'PickAll',
    //  props: {
    //         goodList: {
    //         type: Array,
    //         require: true 
    //         }
    // },
    components: {

    }
    ,
    props: {
    }
    ,
    components: {
    
    },
    data: () => ({
     pickcnt:0,
    })
    ,
    computed: {
      ...mapGetters('GoodStore',[
        //  'getGoodList',
         'getGoods'
      ])
      ,
    groupkey() {
      return this.$route.params.id;
    }
    }
   ,
    methods: {
      modalclose() {
        this.$emit('modal-close');
      }
      ,
      searchGoodList() {
      //   this.$store.dispatch('GoodStore/getGoods', this.groupkey).then(() => {
           
      //  });
        let param = {
          'groupkey':this.groupkey,
          'productid': 'x',
          'sortno':'x',
          'delino':'',
          'deliseq':'',
        }
        this.$store.dispatch('GoodStore/getGoodAll', param).then(() => {
          let pickcnt=0;
          var pickobj =  _.find(this.getGoods,function(o){
            // console.log('GOOD ',o.STATUS);
              if(o.STATUS==='15')++pickcnt;
            });
            this.pickcnt=pickcnt;
        });

      }
      ,
      getNameByStatus(stat){
        if(stat==='10')return '피킹지시';
        if(stat==='12')return '부분피킹';
        if(stat==='15')return '피킹완료';
      }
      ,
      
    }
    ,
    mounted(){
      console.log('groupkey', this.groupkey);
      this.searchGoodList();
    }
    ,
    filters:{
     comma(val){
  	  return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
   
 } 
</script>
<style scoped>

</style>
