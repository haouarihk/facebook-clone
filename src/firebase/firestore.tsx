import {
    doc,
    collection,
    onSnapshot,
    getDoc,
    getDocs,
    QuerySnapshot,
    DocumentData,
    addDoc,
    serverTimestamp,
    deleteDoc,
    CollectionReference
} from "firebase/firestore";
import { PostData } from "src/components/posts/post";

import {
    auth,
    firebaseApp,
    firestore
} from "."

const authed = auth.getAuth(firebaseApp)
const fs = firestore.getFirestore(firebaseApp);
export async function getUser(id: string) {
    // get user form firestore
    const docRef = doc(fs, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data()
    else return null
}

const kSnapShot = (collRef: CollectionReference<DocumentData>) => {
    return (cb: ((snapShot: QuerySnapshot<DocumentData>) => void)) => onSnapshot(collRef, cb)
}


export namespace FPosts {
    export async function getPost(uId: string, pId: string) {
        // get post form firestore
        const docRef = doc(fs, 'users', uId, 'posts', pId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) return docSnap.data() as PostData
        else return Promise.reject(null)
    }

    export async function getPostsWatcher(uId: string) {
        // get comments from post form firestore
        const collRef = collection(fs, 'users', uId, 'posts')
        return kSnapShot(collRef)
    }

    export function PutPost(uId: string, data: { content: string }) {
        // put post to firestore
        const collRef = collection(fs, 'users', uId, 'posts');
        return addDoc(collRef, {
            ...data, timestamp: serverTimestamp(),
            userId: "hello"//auth.currentUser?.uid
        })

    }

    export function RemovePost(uId: string, pId: string) {
        const docRef = doc(fs, 'users', uId, 'posts', pId)
        return deleteDoc(docRef)
    }
}

export namespace FComments {
    export function getComments(uId: string, pId: string, howMuch?: number): any {
        // get comments from post form firestore
        const collRef = collection(fs, 'users', uId, 'posts', pId, 'comments')
        return getDocs(collRef).then(k => k.docs.map(b => b.data()))
    }

    export function getCommentsWatcher(uId: string, pId: string) {
        // get comments from post form firestore
        const collRef = collection(fs, 'users', uId, 'posts', pId, 'comments')
        return kSnapShot(collRef)

    }


    export function PutComment(uId: string, pId: string, data: { content: string }) {
        // put comment to firestore
        const collRef = collection(fs, 'users', uId, 'posts', pId, 'comments');
        addDoc(collRef, {
            ...data, timestamp: serverTimestamp(),
            userId: "hello"//auth.currentUser?.uid
        })
    }
    export function RemoveComment(uId: string, pId: string, cId: string) {
        const docRef = doc(fs, 'users', uId, 'posts', pId, 'comments', cId)
        return deleteDoc(docRef)
    }

}



export async function getUserPosts(uId: string): Promise<any> {
    // get post form firestore
    const collRef = collection(fs, 'users', uId, 'posts');
    return getDocs(collRef).then(k => k.docs.map(b => b.data()))
}