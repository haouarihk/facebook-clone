import { getAuth } from 'firebase/auth';
import { auth, firebaseApp } from '.';
const authed = getAuth(firebaseApp);
const facebookProv = new auth.FacebookAuthProvider();
const googleProv = new auth.GoogleAuthProvider();
export namespace Login {
    export function facebook() {
        // facebook
        return auth.signInWithPopup(authed, facebookProv)
    }

    export async function login(email: string, password: string) {
        if (!email && !password) { Promise.reject({ message: "Username or password required" }); return }
        // email and password
        return auth.signInWithEmailAndPassword(authed, email, password);
    }

    export function google() {
        // google
        return auth.signInWithPopup(authed, googleProv);
    }
}


export function logout() { auth.signOut(authed); }

export function getUser() {
    return authed.currentUser;
}


export namespace register {

}
