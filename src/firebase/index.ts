import App, { getApp, initializeApp } from 'firebase/app';
import * as Auth from 'firebase/auth';
import * as Firestore from 'firebase/firestore';

import fbconfig from '../../firebaseConfig';
let k;
try {
    k = getApp()
} catch (e) {
    k = initializeApp(fbconfig);
}
export const firebaseApp = k




export const app = App
export const auth = Auth
export const firestore = Firestore