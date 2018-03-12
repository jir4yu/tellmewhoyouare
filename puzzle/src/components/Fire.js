import * as firebase from 'firebase'

const config = {
	apiKey: "AIzaSyDCFhlSKSJgDrmMVrr00BiuYwrwIDAa8xw",
  authDomain: "guesswho-6caed.firebaseapp.com",
  databaseURL: "https://guesswho-6caed.firebaseio.com",
  projectId: "guesswho-6caed",
  storageBucket: "guesswho-6caed.appspot.com",
  messagingSenderId: "701479728433"
};

const FB = firebase.initializeApp(config);

export default FB;