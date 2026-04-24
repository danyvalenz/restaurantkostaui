import React, { useState } from 'react';
import {
  Page, Navbar, Block, Link, Segmented, SegmentedButton,
  Button, Card, Icon, Preloader,Badge
} from 'konsta/react';
import { useFetchMenu } from '../viewModel/useFetchMenu';
import { useCart } from '../context/CartContext';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const MenuPage: React.FC = () => {
  const { menuItems, loading } = useFetchMenu();
  const [selectedCategory, setSelectedCategory] = useState('Entradas');
  const { addToCart, totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <Page className="!bg-gray-50">
    <Navbar
        title="Atelier Cuisine"
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

      {/* Lista de Platos desde Firebase */}
      <Block className="!mt-0 px-4">
        {loading ? (
          <div className="flex justify-center p-10"><Preloader /></div>
        ) : (
          menuItems
            .filter((item) => item.categoria === selectedCategory)
            .map((item, index) => (
              <Card key={item.id} className="!m-0 !mb-4 !p-4 !shadow-none !border-none bg-white rounded-2xl">
                {/* Alternamos la posición de la imagen según el índice (par/impar) */}
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

      {/* ... Resto de tu código (Chef's Selection, etc.) ... */}
    </Page>
  );
};

export default MenuPage;