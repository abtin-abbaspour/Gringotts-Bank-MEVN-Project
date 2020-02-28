import Vue from 'vue';
import App from './App.vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
Vue.use(Buefy);


import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

import Login from './components/Login.vue';
import HomePage from './components/HomePage.vue';
import CreateAccount from './components/CreateAccount.vue';
import EditAccount from './components/EditAccount.vue';
import Deposit from './components/Deposit.vue';
import Withdraw from './components/Withdraw.vue';
import ETransfer from './components/ETransfer.vue';


// import HomeComponent from './components/HomeComponent.vue';
// import CreateComponent from './components/CreateComponent.vue';
// import IndexComponent from './components/IndexComponent.vue';
// import EditComponent from './components/EditComponent.vue';

const routes = [
  {
      name: 'login',
      path: '/',
      component: Login
  },
  {
      name: 'homePage',
      path: '/homePage/:id',
      component: HomePage
  },
  {
      name: 'createAccount',
      path: '/createAccount',
      component: CreateAccount
  },
  {
    name: 'editAccount',
    path: '/editAccount/:id',
    component: EditAccount
  },
  {
      name: 'deposit',
      path: '/deposit/:id',
      component: Deposit
  },
  {
    name: 'withdraw',
    path: '/withdraw/:id',
    component: Withdraw
  },
  {
      name: 'eTransfer',
      path: '/eTransfer/:id',
      component: ETransfer
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');