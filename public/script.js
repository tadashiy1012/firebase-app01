{
  const config = {
    apiKey: "AIzaSyCGyH8E4JZRdlFzpaV2ArouDGP6AMfItFk",
    authDomain: "test-pj01-72bea.firebaseapp.com",
    databaseURL: "https://test-pj01-72bea.firebaseio.com",
    projectId: "test-pj01-72bea",
    storageBucket: "test-pj01-72bea.appspot.com",
    messagingSenderId: "478620108057"
  };
  function login() {
    return new Promise((resolve, reject) => {
      Promise.resolve().then(() => {
        return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      }).then(() => {
        return firebase.auth().getRedirectResult()
      }).then((result) => {
        if (result.credential) {
          console.log(result.credential.accessToken);
        }
        let user = result.user;
        if (user === null || user === void 0) {
          resolve([false, user]);
        } else {
          resolve([true, user]);
        }
      }).catch((err) => {
        console.error(err);
        reject(err);
      });
    });
  }
  function authCheck() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((result) => {
        if (result) {
          resolve([true, result]);
        } else {
          resolve([false, result]);
        }
      });
    });
  }
  function init() {
    firebase.initializeApp(config);
    firebase.app();
    Promise.resolve().then(() => {
      return authCheck();
    }).then((result) => {
      console.log(result);
      if (!result[0]) {
        login().then((result) => {
          console.log(result);
          if (result[0]) {
            console.log(result[1]);
            document.getElementById("loginResult").innerText = "login ok!";
          } else {
            document.getElementById("loginResult").innerText = "login ng!";
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
          }
        }).catch((err) => {
          console.error(err);
        });
      } else {
        document.getElementById("loginResult").innerText = "login ok!";
      }
    });
    
  }
  
  init();
}