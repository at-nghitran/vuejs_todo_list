import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCpahgG6i3is2xLqOdltK51fyS0fwc-HLM',
  authDomain: 'todolist-5cbf0.firebaseapp.com',
  databaseURL: 'https://todolist-5cbf0.firebaseio.com',
  projectId: 'todolist-5cbf0',
  storageBucket: 'todolist-5cbf0.appspot.com',
  messagingSenderId: '1003891563359',
  appId: '1:1003891563359:web:083dba9300d0465bd5b4ea',
  measurementId: 'G-TZ9CJBTYZH'
}
firebase.initializeApp(firebaseConfig)
var db = firebase.firestore()

export default db
