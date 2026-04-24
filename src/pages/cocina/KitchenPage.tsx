import React, { useState, useEffect } from 'react';
import { Page, Navbar, Card, Button, Badge, Preloader } from 'konsta/react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth'; // <--- IMPORTANTE
import { db, auth } from '../../firebaseConfig';
import { MdTimer, MdPlayArrow, MdCheck, MdDoneAll } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

// 1. COMPONENTE TIMER (Solo para el tiempo)
const OrderTimer = ({ startTime }: { startTime: any }) => {
  const [timeElapsed, setTimeElapsed] = useState('0:00');
  const navigate = useNavigate();

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const start = startTime.toDate().getTime();
      const now = new Date().getTime();
      const diff = now - start;

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeElapsed(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return <span>{timeElapsed}</span>;
};

const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/kitchen-login'); // Redirigir al login
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

// 2. COMPONENTE PRINCIPAL
export const KitchenPage = () => {
  const [comandas, setComandas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // GUARDIA DE SEGURIDAD AQUÍ (Solo una vez al montar la página)
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/kitchen-login');
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  // ESCUCHA DE COMANDAS
  useEffect(() => {
    const q = query(collection(db, "comandas"), orderBy("fecha", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Filtramos para no mostrar lo entregado
      setComandas(docs.filter(c => c.estado !== 'entregado'));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const cambiarEstado = async (id: string, nuevoEstado: string) => {
    try {
      await updateDoc(doc(db, "comandas", id), { estado: nuevoEstado });
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  if (loading) return (
    <Page className="flex justify-center items-center bg-slate-900">
      <Preloader />
    </Page>
  );

  return (
    <Page className="!bg-slate-950 text-white pb-10">
        <Navbar 
                title="DASHBOARD COCINA" 
                className="!bg-slate-900" 
                // 3. Agregar el botón a la derecha
                right={
                <Button 
                    clear 
                    className="!text-red-500 !font-bold" 
                    onClick={handleLogout}
                >
                    SALIR
                </Button>
                }
            />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {comandas.map((orden) => (
          <Card 
            key={orden.id} 
            className={`!m-0 !p-0 border-t-8 bg-slate-900 shadow-2xl ${
              orden.estado === 'pendiente' ? 'border-blue-500' : 
              orden.estado === 'cocinando' ? 'border-orange-500' : 'border-green-500'
            }`}
          >
            <div className="p-3 bg-slate-800/50 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-black text-2xl text-white">{orden.mesa}</span>
                <div className="flex items-center gap-1 text-orange-400 font-mono text-sm">
                  <MdTimer /> <OrderTimer startTime={orden.fecha} />
                </div>
              </div>
              <Badge className={orden.estado === 'pendiente' ? '!bg-blue-600' : '!bg-orange-600'}>
                {orden.estado.toUpperCase()}
              </Badge>
            </div>

            <div className="p-4 space-y-4 min-h-[150px]">
              {orden.platillos.map((p: any, i: number) => (
                <div key={i} className="flex justify-between items-start border-b border-slate-800 pb-2">
                  <span className="text-xl font-bold text-white">
                    <span className="text-orange-500">{p.cantidad}x</span> {p.nombre}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-2 flex gap-2">
              {orden.estado === 'pendiente' && (
                <Button large className="flex-grow !bg-blue-600 font-black" onClick={() => cambiarEstado(orden.id, 'cocinando')}>
                  <MdPlayArrow className="text-2xl" /> EMPEZAR
                </Button>
              )}

              {orden.estado === 'cocinando' && (
                <Button large className="flex-grow !bg-orange-600 font-black" onClick={() => cambiarEstado(orden.id, 'listo')}>
                  <MdCheck className="text-2xl" /> TERMINAR
                </Button>
              )}

              {orden.estado === 'listo' && (
                <Button large className="flex-grow !bg-green-600 font-black" onClick={() => cambiarEstado(orden.id, 'entregado')}>
                  <MdDoneAll className="text-2xl" /> ENTREGAR
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
};