import { db, auth, provider, storage } from "../../firebase"
import { signInWithPopup } from "firebase/auth"
import * as actions from "./actions"
import { getDownloadURL, ref, uploadBytesResumable, } from "firebase/storage"
import { addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore"

export function signInApi(){
    return (dispatch) => {
        signInWithPopup(auth, provider).then((payload) => {
            dispatch(actions.setUser(payload.user))
        }).catch((error) => alert(error.message))
    }
}

export function getUserAuth(){
    // to change user account which stored in Redux
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if(user){
                dispatch(actions.setUser(user))
            }
        })
    }
}

export function signOutApi(){
    return (dispatch) => {
        auth.signOut()
        .then(() => {
            dispatch(actions.setUser(null))
        }).catch((error) => alert(error.message))
    }
}

export function postArticleApi(payload){
    return (dispatch) => {
        dispatch(actions.setLoading(true))
        if(payload.image && payload.image.name){
            const storageRef = ref(storage, `image/${payload.image.name}`)
            const uploadRef = uploadBytesResumable(storageRef, payload.image)
            uploadRef.on("state_changed", (snapshot) => {
                const progress =
                  Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            }, 
            (error) => {
                alert(error);
                dispatch(actions.setLoading(false));
            },
            () => {
                getDownloadURL(uploadRef.snapshot.ref).then((downloadURl) => {
                    const collRef = collection(db, "articles");
                    addDoc(collRef, {
                        actor: {
                            description: payload.user.email,
                            title: payload.user.displayName,
                            date: payload.timestamp,
                            image: payload.user.photoURL,
                        },
                        comments: 0,
                        video: payload.video,
                        description: payload.description,
                        shareImg: downloadURl,
                    });
                })
                dispatch(actions.setLoading(false));
            }
        )
        }else if(payload.video){
            const collRef = collection(db, "articles");
            addDoc(collRef, {
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                comments: 0,
                video: payload.video,
                description: payload.description,
                shareImg: payload.image,
            });
            dispatch(actions.setLoading(false))
        }else{
            const collRef = collection(db, "articles");
            addDoc(collRef, {
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                comments: 0,
                video: payload.video,
                description: payload.description,
                shareImg: payload.image,
            });
            dispatch(actions.setLoading(false)) 
        }
    };
}

export function getArticlesApi() {
    return (dispatch) => {
        let payload;
        const collRef = collection(db, "articles");
        const orderedRef = query(collRef, orderBy("actor.date", "desc"));
        onSnapshot(orderedRef, (snapshot) => {
            payload = snapshot.docs.map((doc) => doc.data());
            dispatch(actions.getArticles(payload));
        })
    }
}