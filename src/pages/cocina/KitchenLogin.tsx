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
    <Page className="flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-md">
        <BlockTitle className="text-white text-center !text-2xl font-black">Acceso Cocina</BlockTitle>
        <List strong inset className="!bg-slate-800">
          <ListInput
            label={<span className="text-slate-400">Email</span>}
            type="email"
            placeholder="chef@atelier.com"
            value={email}
            onInput={(e: any) => setEmail(e.target.value)}
            className="!text-white"
          />
          <ListInput
            label={<span className="text-slate-400">Contraseña</span>}
            type="password"
            placeholder="****"
            value={password}
            onInput={(e: any) => setPassword(e.target.value)}
          />
        </List>
        <Block>
          <Button large rounded onClick={handleLogin} className="!bg-orange-600">
            Entrar a Panel
          </Button>
        </Block>
      </div>
    </Page>
  );
};