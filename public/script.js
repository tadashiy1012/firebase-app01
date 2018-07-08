{
  console.log("ready!");
  document.addEventListener('DOMContentLoaded', function() {
    try {
      const app = firebase.app();
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().getRedirectResult().then(function(result) {
        let token = null;
        if (result.credential) {
          token = result.credential.accessToken;
        }
        let user = result.user;
        if (user === null || user === void 0) {
          firebase.auth().signInWithRedirect(provider);
        } else {
          console.log("login success!");
          console.log(user, token);
          document.getElementById("loginResult").innerText = "login success!";
        }
      }).catch(function(err) {
        console.error(err);
        firebase.auth().signInWithRedirect(provider);
      })
    } catch (e) {
      console.error(e);
    }
  });
}