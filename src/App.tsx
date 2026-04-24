import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { App as AppKonstaUI, Toolbar, Link, Icon } from 'konsta/react';
import { MdRestaurantMenu, MdSearch, MdReceiptLong } from 'react-icons/md';
import OrdersPage from './pages/OrdersPage';
import MenuPage from './pages/MenuPage';
import AdminPlatillos from './pages/AdminPlatillos';
import { CartProvider } from './context/CartContext';
import CheckoutPage from './pages/CheckoutPage';

const NavigationWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppKonstaUI theme="ios" safeAreas>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/adminPlatillos" element={<AdminPlatillos/>} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>

      {/* El Toolbar se queda fijo abajo y maneja el cambio de ruta */}
      <Toolbar tabbar labels bottom className="!bg-white fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200">
        <Link
          tabLink
          tabLinkActive={location.pathname === '/'}
          onClick={() => navigate('/')}
          // Eliminamos la prop 'label' interna y la pasamos como texto hijo para tener más control
          icon={<Icon material={<MdRestaurantMenu className={location.pathname === '/' ? 'text-orange-500' : 'text-gray-400'} />} />}
          className={location.pathname === '/' ? '!text-orange-500' : '!text-gray-400'}
        >
          <span className="text-[10px] mt-1">Menu</span>
        </Link>

        <Link
          tabLink
          icon={<Icon material={<MdSearch className="text-gray-400" />} />}
          className="!text-gray-400"
        >
          <span className="text-[10px] mt-1">Search</span>
        </Link>

        <Link
          tabLink
          tabLinkActive={location.pathname === '/orders'}
          onClick={() => navigate('/orders')}
          icon={<Icon material={<MdReceiptLong className={location.pathname === '/orders' ? 'text-orange-500' : 'text-gray-400'} />} />}
          className={location.pathname === '/orders' ? '!text-orange-500' : '!text-gray-400'}
        >
          <span className="text-[10px] mt-1">Orders</span>
        </Link>

        <Link
          tabLink
          tabLinkActive={location.pathname === '/adminPlatillos'}
          onClick={() => navigate('/adminPlatillos')}
          icon={<Icon material={<MdReceiptLong className={location.pathname === '/adminPlatillos' ? 'text-orange-500' : 'text-gray-400'} />} />}
          className={location.pathname === '/orders' ? '!text-orange-500' : '!text-gray-400'}
        >
          <span className="text-[10px] mt-1">Admin</span>
        </Link>
      </Toolbar>
    </AppKonstaUI>
  );
};
function App() {
  
  

  return (
    <>
      <Router>
        <CartProvider>
          <NavigationWrapper />
        </CartProvider>
      </Router>
    </>
  )
}

export default App