<template>
 <div class="login-area" style="padding-top: 70px;">
  <div class="login-wrap">
    <div class="login-box">
      <div class="logo-area">
        <div class="logo-img"> <img src="../../assets/images/logo.png" alt="메가마트"> </div>
        <div class="logo-title">풀필먼트 피킹시스템</div>
      </div>
      <form name="login" @submit="login">
        <div class="login-input-area">
          <div class="input-info-set">
            <input type="text" v-model="userData.userId" placeholder="아이디" required>
            <!-- <div class="info-ic">{{ fieldErrors.userId }}</div>  -->
          </div>
          <div class="input-info-set">
            <input type="password" v-model="userData.password" placeholder="비밀번호" required>
            <!-- <div class="info-ic">{{ fieldErrors.password }}</div> -->
          </div>
        </div>
        <div class="checkbox">
          <input id="id-save" v-model="toggle" name="" type="checkbox" checked>
          <label for="id-save" class="checkbox-label">아이디 저장</label>
        </div>
        <div class="btn-area">
          <button type="submit" class="btn btn-lg btn-primary w-100">로그인</button>
        </div>
      </form>
    </div>
  </div>
  <Loader v-show="isLoading" />
</div>
</template>

<script>
import {mapGetters} from 'vuex';
import changeRouteMixin from '@/mixin/changeRoute';
import Loader from '../../views/Loader';

export default {
  name: 'LoginBox',
  components: {
    'Loader': Loader
  }
  ,
  mixins: [changeRouteMixin],
  data: () => ({
      toggle:true,
	    userData: {
        userId: '',
        password:'',
      },
	  fieldErrors: {
	  userId: undefined,
	  password: undefined,
	  },
    }),
	methods: {
	saveid() {
    localStorage.removeItem('userId');
    localStorage.setItem('userId', this.userData.userId);
  },
	validateForm(fields) {
		const errors = {};
		if (!fields.userId) errors.userId = "아이디를 입력하세요";
		if (!fields.password) errors.password = "패스워드를 입력하세요";
		return errors;
		},
	  async login(e) {
    console.log("login start");
    e.preventDefault();
		console.log(this.userData.userId);
		this.saveid();
	    this.fieldErrors = this.validateForm(this.userData);
        if (Object.keys(this.fieldErrors).length) {console.log(Object.keys(this.fieldErrors).length); return;}
        await this.$store.dispatch('Authentication/login', this.userData);
        console.log(this.$store.state.Authentication.data.isAuthenticated);
        const token = sessionStorage.getItem("jwt");
        console.log("token",token);
        if(this.$store.state.Authentication.data.isAuthenticated)
          // this.changeRoute('order_list');
          this.$router.push({ name: 'order_list' });
      },

	}
  ,
    mounted() {
      // this.$refs.fullscreenbutton.click();
      // this.fullscreentoggle();

      console.log('LoginBox mounted');
      let userId = JSON.stringify(localStorage.getItem('userId'));
	    if(userId=='null')userId='';
	    userId = userId.replace(/"([^"]+(?="))"/g, '$1');
	    console.log(userId);
	    //if( typeof(userId) !== 'undefined' || userId !== null)
	    this.userData.userId=userId;
      //}
	}
  ,
 computed: {
    ...mapGetters('Authentication',[
       'isLoading',
      //  'getAuth',
    ])
  },
};
</script>

<style scoped>
</style>
