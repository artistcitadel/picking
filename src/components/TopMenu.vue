<template>
<div class="header">
  <div class="header-title">
    <li>{{title}}</li>
    <li>{{subtitle}}</li>
  </div>
  <div class="header-user">
    <li class="user-name">{{username}}</li>
    <li>
      <button type="button" class="logout" @click=logOut>로그아웃</button>
    </li>
  </div>
</div>
  
</template>
<script>
import _ from 'lodash';
import {mapGetters} from 'vuex';
import {getTitle, getSubTitle} from '../utils/commService';
export default {
  name: 'TopMenu',
  data: () => ({
    username:'',
    title:'',
    subtitle:'',
  }),
  computed: {
        ...mapGetters('Authentication',[
       'getUserid',
       'getUserdata'
    ])
  },
  methods: {
    logOut(){
      this.$store.dispatch('Authentication/logOut');
    }
  }
  ,
  mounted() {
    console.log('TopMenu mounted');
    // console.log(this.$store.state.Authentication.data.userid);
    // if(this.username==='' || this.username==null){
    if(sessionStorage.getItem("username")==null || sessionStorage.getItem("username")=='null') {
    const userId = sessionStorage.getItem("userid");
    console.log('userId in topmenu', userId);
    this.$store.dispatch('Authentication/getUsername',userId).then(() => {
        console.log(this.getUserdata);
           this.username=sessionStorage.getItem("username");
        });
    }else{
           this.username=sessionStorage.getItem("username");
    }
    
    let url = document.location.href;
    // console.log(url.substring(url.lastIndexOf("/")));
    // console.log('header before mount',url.substring(url.lastIndexOf("/")));
    //this.title = getTitle(url.substring(url.lastIndexOf("/")));
    //this.subtitle = getSubTitle(url.substring(url.lastIndexOf("/")));
    this.title = getTitle(url);
    this.subtitle = getSubTitle(url);
    }
  ,
  updated(){
    // console.log('TopMenu updated');
    // let url = document.location.href;
    // this.title = getTitle(url.substring(url.lastIndexOf("/")));
  }
  ,
  beforeMount() {
   
  },
  beforeCreate(){
    // console.log(this.getUserid);
    // this.$store.dispatch('Authentication/getUsername',this.getUserid);
  }
};
</script>
