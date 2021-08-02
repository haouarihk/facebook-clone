import firebase from "."

const firestore = firebase.firestore();
const auth = firebase.auth();
export function getUser(id: string): any {
    // get user form firestore
    return firestore.collection('users').doc(id).get().then((k: any) => k.data())
}


export namespace FPosts {
    export function getPost(uId: string, pId: string): any {
        // get post form firestore
        return firestore.collection('users').doc(uId).collection("posts").doc(pId).get().then((k: any) => k.data())
    }

    export function getPostsWatcher(uId: string) {
        // get comments from post form firestore
        return firestore.collection('users').doc(uId).collection("posts");
    }

    export function PutPost(uId: string, data: { content: string }) {
        return firestore.collection('users').doc(uId).collection("posts").add({
            ...data, timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            userId: "hello"//auth.currentUser?.uid
        })
    }

    export function RemovePost(uId: string, pId: string) {
        return firestore.collection('users').doc(uId).collection("posts").doc(pId).delete()
    }
}

export namespace Comments {
    export function getComments(uId: string, pId: string, howMuch?: number): any {
        // get comments from post form firestore
        return firestore.collection('users').doc(uId).collection("posts").doc(pId).collection("comments").get().then((k) =>
            k.docs.map((e) => ({ ...e.data(), cId: e.id }))
        )
    }

    export function getCommentsWatcher(uId: string, pId: string) {
        // get comments from post form firestore
        return firestore.collection('users').doc(uId).collection("posts").doc(pId).collection("comments");
    }


    export function PutComment(uId: string, pId: string, data: { content: string }) {
        return firestore.collection('users').doc(uId).collection("posts").doc(pId).collection("comments").add({
            ...data, timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            userId: "hello"//auth.currentUser?.uid
        })
    }
    export function RemoveComment(uId: string, pId: string, cId: string) {
        return firestore.collection('users').doc(uId).collection("posts").doc(pId).collection("comments").doc(cId).delete()
    }

}

export function getPost(uId: string, pId: string): any {
    // get post form firestore
    return firestore.collection('users').doc(uId).collection("posts").doc(pId).get().then((k: any) => k.data())
}

export function getComments(uId: string, pId: string, howMuch?: number): any {
    // get comments from post form firestore
    return firestore.collection('users').doc(uId).collection("posts").doc(pId).collection("comments").get().then((k) =>
        k.docs.map((e) => ({ ...e.data(), cId: e.id }))
    )
}

export function getCommentsWatcher(uId: string, pId: string) {
    // get comments from post form firestore
    return firestore.collection('users').doc(uId).collection("posts").doc(pId).collection("comments");
}



export function PutComment(uId: string, pId: string, data: { content: string }) {
    return firestore.collection('users').doc(uId).collection("posts").doc(pId).collection("comments").add({
        ...data, timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: "hello"//auth.currentUser?.uid
    })
}


export function PutPost(uId: string, data: { content: string }) {
    return firestore.collection('users').doc(uId).collection("posts").add({
        ...data, timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: "hello"//auth.currentUser?.uid
    })
}

export function RemoveComment(uId: string, pId: string, cId: string) {
    return firestore.collection('users').doc(uId).collection("posts").doc(pId).collection("comments").doc(cId).delete()
}
export function RemovePost(uId: string, pId: string) {
    return firestore.collection('users').doc(uId).collection("posts").doc(pId).delete()
}




export async function getUserPosts(uId: string): Promise<any> {
    // get post form firestore
    return firestore.collection('users').doc(uId).collection("posts").get().then((k) =>
        k.docs.map((e) => ({ ...e.data(), pId: e.id }))
    )
}