import React, { useState } from 'react';
import { Page, List, ListInput, Button, Block, BlockTitle } from 'konsta/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';

export const KitchenLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/kitchen');
    } catch (error) {
      alert("Acceso denegado: Credenciales incorrectas");
    }
  };

  return (
    <Page className="flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md p-4 flex flex-col items-center">
        
        <div className="w-full pt-8 pb-12 text-center">
            <h1 className="!text-white !text-4xl font-black tracking-tighter uppercase">
                Atelier Kitchen
            </h1>
            <div className="h-1 w-12 bg-orange-500 mx-auto mt-2 rounded-full"></div> {/* Una línea estética opcional */}
        </div>

        <List strong inset className="!bg-slate-900 !m-0 border border-slate-800 w-full rounded-2xl shadow-2xl">
        <ListInput
            label={<span className="text-orange-500 font-bold uppercase text-xs tracking-widest">Email del Chef</span>}
            type="email"
            placeholder="chef@atelier.com"
            value={email}
            onInput={(e: any) => setEmail(e.target.value)}
            // placeholder:text-slate-500 le da ese gris claro que no llega a ser el blanco puro de la letra final
            inputClassName="!text-white !text-xl !font-bold h-14 pt-4 !pb-0 align-middle placeholder:text-slate-500" 
            className="mb-4"
        />
        
        <ListInput
            label={<span className="text-orange-500 font-bold uppercase text-xs tracking-widest">Contraseña</span>}
            type="password"
            placeholder="••••••••"
            value={password}
            onInput={(e: any) => setPassword(e.target.value)}
            // Usamos el mismo tono de gris para los puntos de la contraseña
            inputClassName="!text-white !text-2xl !font-bold h-14 pt-4 !pb-0 align-middle placeholder:text-slate-500"
        />
        </List>

        <Block className="mt-10 w-full">
          <Button 
            large 
            rounded 
            onClick={handleLogin} 
            className="!bg-orange-600 !h-16 !text-xl font-black shadow-lg active:scale-95 transition-transform"
          >
            ENTRAR AL PANEL
          </Button>
        </Block>

        <p className="text-center text-slate-600 text-xs mt-6">
          Sistema de Gestión de Comandas v1.0
        </p>
      </div>
    </Page>
  );
};