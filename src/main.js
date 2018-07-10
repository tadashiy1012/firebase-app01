import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';
import 'firebaseui';
import config from './config';
import Vue from 'vue';
import Vuex from 'vuex';
import myStore from './store';
import { Container } from './components';
import { checkAuth, execLogin } from './funcs'

{
  console.log('ready!');
  firebase.initializeApp(config);
  firebase.app();
  Vue.use(Vuex);
  const vapp = new Vue({
    el: '#root',
    store: new Vuex.Store(myStore),
    components: { Container },
    template: '<Container />'
  });
  vapp.$store.dispatch('asyncSetLogin').then((resp) => {
    console.log(resp);
  });
}