import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Adaptamos la interfaz a lo que tienes en Firestore
export interface MenuItem {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string; // 'Entradas' | 'Platos Fuertes' | 'Bebidas'
  disponible: boolean;
}

export const useFetchMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Consulta ordenada por fecha de creación
    const q = query(collection(db, "platillos"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuItem[];
      //console.log(items);
      setMenuItems(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { menuItems, loading };
};