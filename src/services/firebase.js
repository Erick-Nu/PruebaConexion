import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

// Configuración de Firebase (reemplaza con tus valores específicos)
const firebaseConfig = {
  apiKey: "AIzaSyBaNtmsOOqnVo35JF24oD3Xo1ONe0q7V-w",  // Reemplaza con tu clave de API
  authDomain: "maquetas.firebaseapp.com",  // Usualmente es: <nombre-del-proyecto>.firebaseapp.com
  projectId: "maquetas-45b6a",  // Tu ID de proyecto
  storageBucket: "maquetas.appspot.com",  // Usualmente es: <nombre-del-proyecto>.appspot.com
  messagingSenderId: "591604837022",  // ID del proyecto
  appId: "1:591604837022:web:someappId",  // Reemplaza con tu appId (puedes encontrarlo en la consola de Firebase)
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar las funciones de Firestore
export { db, collection, addDoc, getDocs, updateDoc, doc, deleteDoc };

