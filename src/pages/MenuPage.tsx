import React, { useState, useEffect } from 'react'; // Añadimos useEffect
import {
  Page, Navbar, Block, Link, Segmented, SegmentedButton,
  Button, Card, Icon, Preloader, Badge
} from 'konsta/react';
import { useFetchMenu } from '../viewModel/useFetchMenu';
import { useCart } from '../context/CartContext';
import { MdOutlineShoppingCart, MdPlace } from 'react-icons/md'; // Añadimos icono de ubicación
import { useNavigate, useLocation } from 'react-router-dom'; // Añadimos useLocation

const MenuPage: React.FC = () => {
  const { menuItems, loading } = useFetchMenu();
  const [selectedCategory, setSelectedCategory] = useState('Entradas');
  const { addToCart, totalItems } = useCart();
  const navigate = useNavigate();
  
  // Lógica para detectar la mesa
  const location = useLocation();
  const [mesa, setMesa] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mesaURL = params.get('mesa');
    if (mesaURL) {
      setMesa(mesaURL);
      // Lo guardamos en el storage para que el Checkout sepa qué mesa es
      localStorage.setItem('mesa_actual', mesaURL);
    }
  }, [location]);

  return (
    <Page className="!bg-gray-50">
      <Navbar
        title={
          <div className="flex flex-col items-center">
            <span className="leading-tight">Atelier Cuisine</span>
            {mesa && (
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest flex items-center gap-1">
                <MdPlace /> Mesa {mesa}
              </span>
            )}
          </div>
        }
        right={
          <Link iconOnly onClick={() => navigate('/checkout')}> 
            <div className="relative">
              <Icon material={<MdOutlineShoppingCart className="text-2xl" />} />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 !bg-orange-600 !text-[10px]">
                  {totalItems}
                </Badge>
              )}
            </div>
          </Link>
        }
      />

      {/* Si no hay mesa detectada, podríamos mostrar un aviso o dejarlo pasar */}
      {!mesa && (
        <Block className="!my-2 text-center text-[10px] text-gray-400 italic">
          Ordenando para llevar / Barra
        </Block>
      )}

      {/* Selector de Categorías */}
      <Block className="!my-4 px-4">
        <Segmented strong className="bg-gray-100 rounded-full !border-none">
          {['Entradas', 'Platos Fuertes', 'Bebidas'].map((cat) => (
            <SegmentedButton
              key={cat}
              strong
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full ${selectedCategory === cat ? '!bg-white !text-black' : '!text-gray-500'}`}
            >
              {cat}
            </SegmentedButton>
          ))}
        </Segmented>
      </Block>

      <Block className="!mt-0 px-4">
        {loading ? (
          <div className="flex justify-center p-10"><Preloader /></div>
        ) : (
          menuItems
            .filter((item) => item.categoria === selectedCategory)
            .map((item, index) => (
              <Card key={item.id} className="!m-0 !mb-4 !p-4 !shadow-none !border-none bg-white rounded-2xl">
                <div className={`flex items-start gap-4 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <img src={item.imagen} alt={item.nombre} className="w-24 h-24 rounded-2xl object-cover" />
                  <div className="flex-grow flex flex-col justify-between h-24">
                    <div>
                      <h3 className="text-lg font-black text-black !m-0 leading-tight">{item.nombre}</h3>
                      <p className="text-xs text-gray-500 !m-0 line-clamp-2">
                        {item.disponible ? 'Disponible ahora' : 'Agotado'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-black">${item.precio}</span>
                      <Button 
                        small 
                        inline 
                        onClick={() => addToCart(item)}
                        className="!bg-orange-500 !rounded-full"
                      >
                        ADD
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
        )}
      </Block>
    </Page>
  );
};

export default MenuPage;