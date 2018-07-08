import firebase from 'firebase/app';

function checkAuth() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((result) => {
      if (result) {
        resolve(result);
      } else {
        //resolve([false, result]);
        reject(new Error('auth failed'));
      }
    });
  });
}

function execLogin() {
  return new Promise((resolve, reject) => {
    Promise.resolve().then(() => {
      return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }).then(() => {
      return firebase.auth().getRedirectResult()
    }).then((result) => {
      if (result.credential) {
        console.log(result.credential.accessToken);
      }
      if (result.user === null || result.user === void 0) {
        resolve([false]);
      } else {
        resolve([true, result.user, result.credential.accessToken]);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}
export { checkAuth, execLogin };