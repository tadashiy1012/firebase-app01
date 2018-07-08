import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';
import 'firebaseui';
import { checkAuth, execLogin } from './funcs'
import config from './config';

{
  console.log('ready!');
  firebase.initializeApp(config);
  firebase.app();
  checkAuth().then((result) => {
    console.log(result);
    return execLogin();
  }).then((result) => {
    console.log(result);
    if (result[0]) {
      document.querySelector('#loginResult').textContent = 'login OK!';
    } else {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  }).catch((err) => {
    console.error(err);
    document.querySelector('#loginResult').textContent = 'login failed!';
  });
}