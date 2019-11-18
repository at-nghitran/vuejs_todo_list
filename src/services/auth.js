import db from '../configs/firebase'
import firebase from 'firebase';

var authAPI = {
  registerNewUser: function (params) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await firebase.auth().createUserWithEmailAndPassword(params.email, params.password);
        await this.insertUserData(data.user.uid, params.displayName, params.email);
        const loginData = await firebase.auth().signInWithEmailAndPassword(params.email, params.password);
        await this.updateToken(loginData.user.uid, { token: loginData.user.refreshToken })
        localStorage.setItem('USER', JSON.stringify({ uid: loginData.user.uid, token: loginData.user.refreshToken, email: params.email }));
        resolve(params.email);
      } catch (error) {
        reject(error);
        alert(error.message);
      }
    })
  },
  login: function (params) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await firebase.auth().signInWithEmailAndPassword(params.email, params.password);
        await this.updateToken(data.user.uid, { token: data.user.refreshToken })
        localStorage.setItem('USER', JSON.stringify({ uid: data.user.uid, token: data.user.refreshToken, email: data.user.email }));
        resolve(data.user);
      } catch (error) {
        reject(error);
        alert(error.message);
      }
    })
  },
  async loginGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    try {
      const res = await firebase.auth().signInWithPopup(provider);
      await this.insertUserData(res.user.uid, res.user.displayName, res.user.email, res.credential.accessToken);
      localStorage.setItem('USER', JSON.stringify({ uid: res.user.uid, token: res.credential.accessToken, email: res.user.email }));
      return Promise.resolve(res.user.uid);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
  async loginFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    // provider.addScope('profile');
    // provider.addScope('email');
    try {
      const res = await firebase.auth().signInWithPopup(provider);
      await this.insertUserData(res.user.uid, res.user.displayName, res.user.email, res.credential.accessToken);
      localStorage.setItem('USER', JSON.stringify({ uid: res.user.uid, token: res.credential.accessToken, email: res.user.email }));
      return Promise.resolve(res.user.uid);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
  insertUserData(uid, displayName, email, token = '') {
    db.collection('users').doc(uid).set({
      uid,
      email,
      displayName,
      token
    });
  },
  updateToken(uid, token) {
    return db.collection('users').doc(uid).update(token);
  }
}

export default authAPI
