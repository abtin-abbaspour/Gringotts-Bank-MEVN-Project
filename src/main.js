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
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');