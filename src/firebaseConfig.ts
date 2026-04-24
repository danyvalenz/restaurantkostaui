import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6r4KM1kihNQrBzWDRpFJSnvereeqc3Rk",
  authDomain: "restaurantapp-439e6.firebaseapp.com",
  projectId: "restaurantapp-439e6",
  storageBucket: "restaurantapp-439e6.firebasestorage.app",
  messagingSenderId: "1097700602669",
  appId: "1:1097700602669:web:792c29c05505a966ea59a4",
  measurementId: "G-SPWBES8Z7P"
};

// 1. Inicializamos App y Servicios PRIMERO
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const messaging = getMessaging(app);
export const VAPID_KEY = "BDFG5LC0X9ziWIabis37n_rVDz6NjhFlq9ftg4bJhWW5KmXFxnfOuVsddQ7tsoI7eEHya_QHe0_BMzDXBgEYyWc";

// 2. Ahora las funciones pueden usar 'messaging' y 'VAPID_KEY' sin problemas
export const obtenerTokenNotificacion = async () => {
  try {
    // Verificamos si el navegador soporta notificaciones
    if (!("Notification" in window)) {
      console.log("Este navegador no soporta notificaciones de escritorio");
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY 
      });
      console.log("Token obtenido:", token);
      return token;
    }
  } catch (error) {
    console.error("Error al obtener el token:", error);
  }
  return null;
};

// Nota: Puedes borrar 'solicitarPermisos' ya que 'obtenerTokenNotificacion' hace lo mismo y está más completa.