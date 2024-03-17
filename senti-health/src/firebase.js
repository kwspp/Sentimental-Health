import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const addPatient = async (patientData) => {
  try {
    const docRef = await addDoc(collection(db, 'patients'), patientData);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const getPatientByPatientId = async (patientId) => {
  const q = query(collection(db, 'patients'), where('patientId', '==', patientId));
  const querySnapshot = await getDocs(q);
  let patientData = null;
  querySnapshot.forEach((doc) => {
    patientData = { id: doc.id, ...doc.data() };
  });
  return patientData;
};

const deletePatientByPatientId = async (patientId) => {
  const q = query(collection(db, 'patients'), where('patientId', '==', patientId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (document) => {
    await deleteDoc(doc(db, 'patients', document.id));
  });
};

export { db, addPatient, getPatientByPatientId, deletePatientByPatientId };