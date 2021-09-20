<template>
  <div class="lnb">

  <ul @click="changeRoute('order_list')">
    <li class="ic-lnb ic-picking" v-bind:class="isactive('A')">정상피킹</li>
  </ul>

  <ul @click="changeRoute('manual_picking')">
    <li class="ic-lnb ic-picking-other" v-bind:class="isactive('M')">이형피킹</li>
  </ul>

  <!-- <ul @click="changeRoute('book_list')" >
    <li class="ic-lnb ic-reserve" v-bind:class="isactive('B')">예약상품</li>
  </ul> -->

  <ul @click="changeRoute('inspection_list')">
    <li class="ic-lnb ic-check" v-bind:class="isactive('C')">취소검수</li>
  </ul>

  <!-- <ul @click="changeRoute('event_list')">
    <li class="ic-lnb ic-gift" v-bind:class="isactive('E')">사은품</li>
  </ul> -->

  <ul @click="changeRoute('jangman_list')">
    <li class="ic-lnb ic-print" v-bind:class="isactive('J')">장만출력</li>
  </ul>

</div>
</template>
<script>
import $ from 'jquery';
import changeRouteMixin from '@/mixin/changeRoute';
export default {
  name: 'Left',
  components: {
  },
  mixins: [changeRouteMixin],
  data: () => ({
    
  })
  ,
  computed: {
    
  },
   created() {
    //  console.log('left created ');
    //  console.log(this.$store.getters.getTopMenuId);
      // console.log(this.$store.getters.getMenuList.lstTopMenu);
    },
    mounted(){
      let url = document.location.href;
      console.log(url);

    }
    ,
    methods: {
      isactive(title){
      // console.log(title);
      let url = document.location.href;
      let suburl  = url.substring(url.lastIndexOf("/"));
      // console.log(suburl);
      let purl = this.parseString(url);
      // let pidx = purl.lastIndexOf("/");
      // let cname = purl.substring(pidx);
      console.log('parse url', purl);
      console.log('title=>', title, ' suburl=>',suburl, 'parseUrl=>',this.parseString(url));
      const rtn = ( (suburl==='/order_list' || suburl==='/tot_assign'|| purl==='/tot_assign' || purl==='/picking') && title==='A' ) ? 'active' :
                      ( (suburl==='/manual_picking') && title==='M') ? 'active' :
                      (suburl==='/book_list' && title==='B') ? 'active' :
                      (suburl==='/inspection_list' && title==='C') ? 'active' :
                      (suburl==='/event_list' && title==='E') ? 'active' :
                      (suburl==='/jangman_list' && title==='J') ? 'active' :
                      "";
      console.log('rtn',rtn);
      return rtn;
    }
    ,
    parseString(url){
      let len = url.length;
      let suburl  = url.substring(url.lastIndexOf("/"));
     // console.log(suburl.substring(1,9), isNaN(suburl.substring(1,9)));
      if(!isNaN(suburl.substring(1,9))){
        let sidx = url.substring(0,len-suburl.length).lastIndexOf("/");
        let str = url.substring(sidx,len-suburl.length);
        console.log(str);
        return str;
       // let str = url.split("/");
       // console.log(str[str.length-2]);
       // return str[str.length-1];

      }
      else return url;

    }
  }
};
</script>
<style scoped>
</style>
