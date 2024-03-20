import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, updateDoc, doc } from 'firebase/firestore';


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
  const patientDataWithSentiment = {
    ...patientData,
    sentimentScores: []
  };

  try {
    const docRef = await addDoc(collection(db, 'patients'), patientDataWithSentiment);
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

const updatePatientByPatientId = async (patientId, updatedData) => {
  const q = query(collection(db, 'patients'), where('patientId', '==', patientId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (document) => {
    const patientDocRef = doc(db, 'patients', document.id);
    await updateDoc(patientDocRef, updatedData);
  });
};

const fetchSentimentScores = async (patientId) => {
  const q = query(collection(db, 'patients'), where('patientId', '==', patientId));
  try {
    const querySnapshot = await getDocs(q);
    let sentimentScores = [];
    querySnapshot.forEach((doc) => {
      // Access sentimentScores from the document
      const data = doc.data();
      sentimentScores = data.sentimentScores;
    });

    return sentimentScores;

  } catch (e) {
    console.error('Error fetching sentiment scores: ', e);
    throw e;
  }
};

const fetchPatientName = async (patientId) => {
  const q = query(collection(db, 'patients'), where('patientId', '==', patientId));
  const querySnapshot = await getDocs(q);
  let patientName = ""; // default to an empty string if not found
  querySnapshot.forEach((doc) => {
    patientName = doc.data().name;
  });
  return patientName;
};

const updateSentimentScores = async (patientId, sentimentScores) => {
  const q = query(collection(db, 'patients'), where('patientId', '==', patientId));
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    querySnapshot.forEach(async (document) => {
      const patientDocRef = doc(db, 'patients', document.id);
      await updateDoc(patientDocRef, { sentimentScores });
    });
  } catch (e) {
    console.error('Error updating sentiment scores: ', e);
  }
};
export { db, addPatient, getPatientByPatientId, deletePatientByPatientId, updatePatientByPatientId, fetchSentimentScores, updateSentimentScores, fetchPatientName };