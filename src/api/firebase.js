// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where
} from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyXv0nKuCgy7kEfw69olbZRD_5d3j0erk",
  authDomain: "vanslife-26c00.firebaseapp.com",
  projectId: "vanslife-26c00",
  storageBucket: "vanslife-26c00.appspot.com",
  messagingSenderId: "1029045974342",
  appId: "1:1029045974342:web:f858278e8effa40da16147",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans");

export async function getAllVans() {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  console.log(dataArr);
  return dataArr;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const vanSnapshot = await getDoc(docRef);
  // console.log(vanSnapshot.data())
  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id,
  };
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))
    return dataArr
  }