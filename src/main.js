// import './server/server';
import Vue from 'vue';
import App from './App.vue';
// import LoginBox from './components/login/LoginBox.vue';
import Vuesax from 'vuesax';

// import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'

// import './style.css';

import router from './router'
import store from './store'

Vue.use(Vuesax);

// Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
