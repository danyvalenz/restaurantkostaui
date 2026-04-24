import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const useMenu = () => {
  const navigateTo = useNavigate();

const guardarPlatillo = async (nombre: string, precio: number, urlImagen: string, categoria: string) => {
    try {
      await addDoc(collection(db, "platillos"), {
        nombre,
        precio,
        imagen: urlImagen,
        categoria, 
        disponible: true,
        createdAt: serverTimestamp()
      });
      
      alert("¡Platillo guardado con éxito!");
      // navigateTo('/menu'); // Opcional: redirigir después de guardar
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
      alert("Hubo un error al guardar el platillo");
    }
  };

  return { guardarPlatillo };
};