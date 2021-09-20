<template>
<div>
  <!-- <fullscreen ref="fullscreen" @change="fullscreenChange" background="#FFF"> -->
  <!-- <b-button class="menu" type="is-danger" @click="open=true">
    <span class="icon-text">
     <span class="icon">
      <i class="fa fa-list-alt"></i>
     </span>
    </span>
  </b-button> -->
    <top-menu />
      <slot/>

    <!-- <b-sidebar
      type="is-light"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      :reduce="reduce"
      v-model="open"
    > -->
      <left />
    <!-- </b-sidebar> -->
    
<!-- </fullscreen> -->
</div>
</template>
<script>

import Vue from 'vue';
// import fullscreen from 'vue-fullscreen';

import TopMenu from '../components/TopMenu.vue';
import Left from '../components/Left.vue';
// Vue.use(fullscreen);
export default {
  name: 'MainLayout',
  //  props: {
  //           resolution: {
  //           type: Boolean,
  //           require: true 
  //         },
  //  }
  //  ,
  components: {
    TopMenu,
    Left,
  },
  data() {
     return {
        // fullscreen: false,
  //     open: false,
  //     overlay: false,
  //     fullheight: true,
  //     fullwidth: false,
  //     right: false,
  //     reduce: true,
     };
   }
   ,
   methods: {
    //  fullscreentoggle () {
    //    console.log('fullscreentoggle clicked');
    //    if(this.fullscreen)return;
    //    this.$refs['fullscreen'].toggle(); // recommended
    //     // this.fullscreen = !this.fullscreen // deprecated
    //   },
    //  fullscreenChange (fullscreen) {
    //    this.fullscreen = fullscreen;
    //  }
   },
    mounted(){
      
   }
   
  };

</script>


<style scoped>
.p-1 {
  padding: 1em;
}
.menu {
  margin-top:10px;
}

</style>
