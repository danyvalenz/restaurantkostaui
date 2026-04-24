import React, { createContext, useContext, useState } from 'react';

interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: any) => void;
  totalItems: number;
  totalPrecio: number;
  limpiarCarrito: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (platillo: any) => {
    setCart((prev) => {
      const existe = prev.find((item) => item.id === platillo.id);
      if (existe) {
        return prev.map((item) =>
          item.id === platillo.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { id: platillo.id, nombre: platillo.nombre, precio: platillo.precio, cantidad: 1 }];
    });
  };

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const limpiarCarrito = () => setCart([]);
    console.log('cart',cart);

  console.log('totalItems',totalItems);
  console.log('totalPrecio',totalPrecio);


  return (
    <CartContext.Provider value={{ cart, addToCart, totalItems, totalPrecio, limpiarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};