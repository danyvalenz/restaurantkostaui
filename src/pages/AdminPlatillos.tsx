import React, { useState } from 'react';
import { Page, Navbar, List, ListInput, Button, Block, BlockTitle } from 'konsta/react';
import { useMenu } from '../viewModel/useMenu';

export const AdminPlatillos = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [urlImagen, setUrlImagen] = useState('');
  const [categoria, setCategoria] = useState('Entradas'); // Estado inicial
  const [cargando, setCargando] = useState(false);
  
  const { guardarPlatillo } = useMenu();

  const handleGuardar = async () => {
    if (!nombre || !precio || !urlImagen || !categoria) {
      alert("Por favor completa todos los campos");
      return;
    }

    setCargando(true);
    // Enviamos la categoría al ViewModel
    await guardarPlatillo(nombre, Number(precio), urlImagen, categoria);
    
    // Limpiar
    setNombre('');
    setPrecio('');
    setUrlImagen('');
    setCategoria('Entradas');
    setCargando(false);
  };

  return (
    <Page>
      <Navbar title="Nuevo Platillo" />
      <BlockTitle>Detalles del Menú (Cloudinary)</BlockTitle>
      <List strong inset>
        <ListInput
          label="Nombre"
          type="text"
          placeholder="Ej. Tacos al Pastor"
          value={nombre}
          onInput={(e: any) => setNombre(e.target.value)}
        />
        
        <ListInput
          label="Precio"
          type="number"
          placeholder="0.00"
          value={precio}
          onInput={(e: any) => setPrecio(e.target.value)}
        />

        {/* --- NUEO SELECTOR DE CATEGORÍA --- */}
        <ListInput
          label="Categoría"
          type="select"
          value={categoria}
          onChange={(e: any) => setCategoria(e.target.value)}
        >
          <option value="Entradas">Entradas</option>
          <option value="Platos Fuertes">Platos Fuertes</option>
          <option value="Bebidas">Bebidas</option>
        </ListInput>

        <ListInput
          label="URL de la Imagen"
          type="url"
          placeholder="Link de Cloudinary..."
          value={urlImagen}
          onInput={(e: any) => setUrlImagen(e.target.value)}
        />
      </List>
      
      <Block>
        <Button large rounded onClick={handleGuardar} disabled={cargando}>
          {cargando ? 'Guardando...' : 'Guardar Platillo'}
        </Button>
      </Block>
    </Page>
  );
};

export default AdminPlatillos;