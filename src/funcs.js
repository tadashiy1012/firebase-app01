import firebase from 'firebase/app';

function checkAuth() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((result) => {
      console.log(result);
      resolve(result);
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

function execLoginProcA() {
  const session = firebase.auth.Auth.Persistence.SESSION;
  return firebase.auth().setPersistence(session).then(() => {
    return firebase.auth().getRedirectResult();
  });
}

function execLoginProcB() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithRedirect(provider);
}

function execLogout() {
  return firebase.auth().signOut();
}

export { checkAuth, execLogin, execLoginProcA, execLoginProcB, execLogout };