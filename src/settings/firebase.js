import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseConfig.js'
import { getFirestore } from 'firebase/firestore'

// import { getDatabase, connectDatabaseEmulator } from "firebase/database";

const firebaseApp = initializeApp(firebaseConfig);
// const db = getDatabase(firebaseApp);
// if (location.hostname === "localhost") {
//   // Point to the RTDB emulator running on localhost.
//   connectDatabaseEmulator(db, "localhost", 9000);
// } 

const db = getFirestore()

export { firebaseApp, db }


