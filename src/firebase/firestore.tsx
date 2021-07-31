import firebase from "."

const firestore = firebase.firestore()
export function getUser(id: string): any {
    // get user form firestore
    return firestore.collection('users').doc(id).get().then((k: any) => k.data())
}

export function getPost(uId: string, pId: string): any {
    // get post form firestore
    return firestore.collection('users').doc(uId).collection("posts").doc(pId).get().then((k: any) => k.data())
}

export async function getUserPosts(uId: string): Promise<any> {
    // get post form firestore
    return firestore.collection('users').doc(uId).collection("posts").get().then((k) =>
        k.docs.map((e) => ({ ...e.data(), pId: e.id }))
    )
}