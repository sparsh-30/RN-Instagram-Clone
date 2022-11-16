import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcDFsKFKT1vyaxTq1_c1Cl48UULAidk7s",
  authDomain: "rn-instagram-clone-d781b.firebaseapp.com",
  projectId: "rn-instagram-clone-d781b",
  storageBucket: "rn-instagram-clone-d781b.appspot.com",
  messagingSenderId: "718337001549",
  appId: "1:718337001549:web:17377427a893214ff6b404"
};

const app=getApps().length===0 ? initializeApp(firebaseConfig) : getApp();
const auth=getAuth(app);
const db = getFirestore(app);
const storage=getStorage(app);

export {app,auth,db,storage}