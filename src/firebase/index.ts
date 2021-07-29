import firebase from 'firebase';
import fbconfig from '../../firebaseConfig';
if (!firebase.apps.length) firebase.initializeApp(fbconfig);



export default firebase;