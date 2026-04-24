import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const useFetchOrders = () => {
  const [ultimaOrden, setUltimaOrden] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Consultamos la colección "comandas", ordenamos por fecha y traemos solo la última
    const q = query(
      collection(db, "comandas"),
      orderBy("fecha", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        setUltimaOrden({
          id: snapshot.docs[0].id.slice(-4), // Usamos los últimos 4 digitos como ID visual
          ...data,
          // Convertimos el timestamp de Firebase a algo legible
          hora: data.fecha ? data.fecha.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
console.log('ultimaOrden',ultimaOrden);
  return { ultimaOrden, loading };
};