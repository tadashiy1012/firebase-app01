import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';
import 'firebaseui';
import config from './config';
import Vue from 'vue';
import Vuex from 'vuex';
import { login, db } from './stores';
import { Container } from './components';

{
  console.log('ready!');
  firebase.initializeApp(config);
  firebase.app();
  Vue.use(Vuex);
  const store = new Vuex.Store({
    modules: { login, db }
  });
  const vapp = new Vue({
    el: '#root',
    store,
    components: { Container },
    template: '<Container />'
  });
  vapp.$store.dispatch('login/asyncSetLogin').then((resp) => {
    console.log(resp);
  });
}