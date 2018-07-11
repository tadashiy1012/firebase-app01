import firebase from 'firebase/app';

function checkAuth() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((result) => {
      console.log(result);
      resolve(result);
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

// viewで使うべからず
function execFetchDb() {
  const db = firebase.database();
  const msgRef = db.ref('/messages');
  return msgRef.once('value');
}

function execPushDb(tgtData) {
  const db = firebase.database();
  const msgRef = db.ref('/messages');
  const key = msgRef.push().key;
  let updates = {};
  updates['/' + key] = tgtData;
  console.log(updates);
  return msgRef.update(updates);
}

export {
  checkAuth, 
  execLoginProcA, execLoginProcB,
  execLogout,
  execFetchDb, execPushDb
};