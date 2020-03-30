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

import Welcome from './components/Welcome.vue';
import CreateComponent from './components/CreateComponent.vue';
import HomePage from './components/homePage.vue';
import EditComponent from './components/EditComponent.vue';
import Viewer from './components/viewTransaction.vue';
import Deposit from './components/deposit.vue';
import Withdraw from './components/withdraw.vue';
import ETransfer from './components/etransfer.vue';

const routes = [
  {
      name: 'welcome',
      path: '/',
      component: Welcome
  },
  {
      name: 'create',
      path: '/create',
      component: CreateComponent
  },
  {
      name: 'homePage',
      path: '/homePage',
      component: HomePage
  },
  {
      name: 'edit',
      path: '/edit/:id',
      component: EditComponent
  },
  {
    name: 'viewer',
    path: '/view/:id',
    component: Viewer
  },
  {
    name: 'deposit',
    path: '/deposit',
    component: Deposit
  },
  {
    name: 'withdraw',
    path: '/withdraw',
    component: Withdraw
  },
  {
    name: 'eTransfer',
    path: '/eTransfer',
    component: ETransfer
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');