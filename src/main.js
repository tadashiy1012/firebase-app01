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
import { Login, Database, DBInput, DBDelete } from './components';

{
  console.log('ready!');
  firebase.initializeApp(config);
  firebase.app();
  Vue.use(Vuex);
  const store = new Vuex.Store({
    modules: { login, db }
  });
  const Container = {
    components: {Login, Database, DBInput, DBDelete},
    template: `
      <div>
        <h1>My Fb Hosted Page</h1>
        <Login />
        <Database />
        <DBInput />
        <DBDelete />
      </div>
    `
  };
  const vapp = new Vue({
    el: '#root',
    store,
    components: { Container },
    template: '<Container />'
  });
  vapp.$store.dispatch('login/asyncSetLogin').then((resp) => {
    console.log(resp);
    return vapp.$store.dispatch('db/fetchSnapshot');
  }).then((resp) => {
    console.log(resp);
    firebase.database().ref('/messages').on('value', function(ss) {
      console.log('fire on.value!');
      vapp.$store.dispatch('db/setSnapshot', ss.val()).then((resp) => {
        console.log(resp);
      });
    });
  });
}