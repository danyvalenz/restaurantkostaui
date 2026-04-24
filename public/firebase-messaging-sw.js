// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD6r4KM1kihNQrBzWDRpFJSnvereeqc3Rk",
  projectId: "restaurantapp-439e6",
  messagingSenderId: "1097700602669",
  appId: "1:1097700602669:web:792c29c05505a966ea59a4",
});

const messaging = firebase.messaging();

// Este evento se dispara cuando llega una notificación de fondo
messaging.onBackgroundMessage((payload) => {
  console.log('Notificación recibida en segundo plano:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.svg' // Asegúrate de tener un icono en public
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});