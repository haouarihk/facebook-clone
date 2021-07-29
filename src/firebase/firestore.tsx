import firebase from "."

const firestore = firebase.firestore()
export function getUser(id: string): any {
    // get user form firestore
    return firestore.collection('users').doc(id).get().then((k: any) => k.data())
}