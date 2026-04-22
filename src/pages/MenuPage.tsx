// src/pages/MenuPage.tsx
import React, { useState } from 'react';
import {
  Page,
  Navbar,
  Block,
  Link,
  Segmented,
  SegmentedButton,
  Button,
  Card,
  Icon,
} from 'konsta/react';
import { MdReceiptLong } from 'react-icons/md';

// --- Tipos ---
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'Entradas' | 'Platos Fuertes' | 'Bebidas';
  imagePosition: 'left' | 'right';
}

// --- Datos ---
const menuItemsData: MenuItem[] = [
  {
    id: 'burrata',
    name: 'Burrata Heirloom',
    description: 'Creamy burrata, sun-dried tomatoes, and basil pesto over toasted sourdough.',
    price: '$18.50',
    image: 'https://placehold.co/100x100?text=Burrata',
    category: 'Entradas',
    imagePosition: 'left',
  },
  {
    id: 'scallops',
    name: 'Hokkaido Scallops',
    description: 'Pan-seared scallops with cauliflower silk, crispy prosciutto, and lemon air.',
    price: '$24.00',
    image: 'https://placehold.co/100x100?text=Scallops',
    category: 'Entradas',
    imagePosition: 'right',
  },
  {
    id: 'tartare',
    name: 'Salmon Tartare',
    description: 'Fresh Atlantic salmon with avocado mousse, yuzu dressing, and cucumber pearls.',
    price: '$21.00',
    image: 'https://placehold.co/100x100?text=Tartare',
    category: 'Entradas',
    imagePosition: 'left',
  },
  {
    id: 'arancini',
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls stuffed with wild mushrooms and taleggio cheese.',
    price: '$16.50',
    image: 'https://placehold.co/100x100?text=Arancini',
    category: 'Entradas',
    imagePosition: 'right',
  },
];

const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'Entradas' | 'Platos Fuertes' | 'Bebidas'>('Entradas');

  return (
    <Page className="!bg-gray-50">
      <Navbar
        title={
          <div className="flex items-center gap-3">
            <img src="https://placehold.co/36x36?text=U" alt="Avatar" className="w-9 h-9 rounded-full" />
            <span className="text-2xl font-black text-black">Atelier Cuisine</span>
          </div>
        }
        right={
          <Link iconOnly>
            <Icon material={<MdReceiptLong className="text-gray-600 text-2xl" />} />
          </Link>
        }
        className="!bg-gray-50 !shadow-none"
      />

      {/* Selector de Categorías */}
      <Block className="!my-4 px-4">
        <Segmented strong className="bg-gray-100 rounded-full !border-none">
          {(['Entradas', 'Platos Fuertes', 'Bebidas'] as const).map((cat) => (
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

      {/* Lista de Platos */}
      <Block className="!mt-0 px-4">
        {menuItemsData
          .filter((item) => item.category === selectedCategory)
          .map((item) => (
            <Card key={item.id} className="!m-0 !mb-4 !p-4 !shadow-none !border-none bg-white rounded-2xl">
              <div className={`flex items-start gap-4 ${item.imagePosition === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />
                <div className="flex-grow flex flex-col justify-between h-24">
                  <div>
                    <h3 className="text-lg font-black text-black !m-0 leading-tight">{item.name}</h3>
                    <p className="text-xs text-gray-500 !m-0 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-black">{item.price}</span>
                    <Button small inline className="!bg-orange-500 !rounded-full !px-4 !font-bold">ADD</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </Block>

      {/* Chef Selection - Banner */}
      <Block className="mt-8 px-4">
        <h2 className="text-2xl font-black text-black mb-4">Chef's Selection</h2>
        <Card 
          className="!m-0 !p-6 !border-none !shadow-xl rounded-3xl h-56 flex flex-col justify-end text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #b45309 0%, #f97316 100%)' }}
        >
          <div className="relative z-10">
            <span className="bg-white/20 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest">Limited Time</span>
            <h1 className="text-3xl font-black mt-2">Dry-Aged Wagyu</h1>
            <p className="text-sm opacity-90">Our signature cut, aged 45 days.</p>
          </div>
        </Card>
      </Block>

      {/* Grid Inferior */}
      <Block className="mt-4 px-4 grid grid-cols-2 gap-4 pb-24">
        <div className="bg-gray-100 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center text-xl">🍷</div>
          <div>
            <p className="font-bold text-sm !m-0">Wine Pairing</p>
            <p className="text-[10px] text-gray-500 !m-0">By Sommelier</p>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-2xl flex items-center gap-3 border border-blue-100">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">⭐</div>
          <div>
            <p className="font-bold text-sm text-blue-900 !m-0">Michelin Star</p>
            <p className="text-[10px] text-blue-700 !m-0">2023 Recommendation</p>
          </div>
        </div>
      </Block>
    </Page>
  );
};

export default MenuPage;