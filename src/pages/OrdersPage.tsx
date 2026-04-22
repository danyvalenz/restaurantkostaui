// src/pages/OrdersPage.tsx
import React from 'react';
import {
  Page,
  Navbar,
  Block,
  Card,
  Icon,
  Button,
} from 'konsta/react';
import { MdReceiptLong, MdAccessTime, MdCheckCircle, MdRestaurant, MdNotificationsNone, MdLocalBar, MdConfirmationNumber, MdHelpOutline } from 'react-icons/md';

const OrdersPage = () => {
  return (
    <Page className="!bg-gray-50">
      <Navbar
        title={
          <div className="flex items-center gap-3">
            <img src="https://placehold.co/36x36?text=U" alt="Avatar" className="w-9 h-9 rounded-full" />
            <span className="text-2xl font-black text-black">Atelier Cuisine</span>
          </div>
        }
        right={<Icon material={<MdReceiptLong className="text-gray-600 text-2xl" />} />}
        className="!bg-gray-50 !shadow-none"
      />

      {/* Estado del Pedido - Cabecera */}
      <Block className="!mt-4 px-4">
        <Card className="!m-0 !p-6 !shadow-none !border-none bg-white rounded-3xl relative">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-500 font-medium text-sm">Estado del Pedido #8821</span>
            <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Mesa 12</span>
          </div>
          <h1 className="text-4xl font-black text-black leading-tight mb-6">Cocinando tu pedido...</h1>
          
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
            <div className="bg-orange-900/10 p-2 rounded-full">
              <MdAccessTime className="text-orange-900 text-2xl" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest !m-0">Listo en aprox.</p>
              <p className="text-2xl font-black text-orange-900 !m-0">12:45 min</p>
            </div>
          </div>
        </Card>
      </Block>

      {/* Timeline de Seguimiento */}
      <Block className="!mt-4 px-4">
        <Card className="!m-0 !p-6 !shadow-none !border-none bg-white rounded-3xl">
          <div className="space-y-8 relative">
            {/* Línea vertical conectora */}
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-100 -z-0" />

            {/* Paso 1: Enviado */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-orange-900 flex items-center justify-center">
                <MdCheckCircle className="text-white text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-black !m-0">Pedido Enviado</h4>
                <p className="text-sm text-gray-500 !m-0">Recibido a las 14:20</p>
              </div>
            </div>

            {/* Paso 2: En Cocina */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                <MdRestaurant className="text-white text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-orange-600 !m-0 text-orange-500">En Cocina</h4>
                <p className="text-sm text-gray-700 !m-0">El Chef está preparando tu selección</p>
              </div>
            </div>

            {/* Paso 3: Listo */}
            <div className="flex items-center gap-4 relative z-10 opacity-30">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <MdNotificationsNone className="text-gray-500 text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-500 !m-0">Listo para Recoger</h4>
                <p className="text-sm text-gray-400 !m-0">Te avisaremos cuando esté listo</p>
              </div>
            </div>
          </div>
        </Card>
      </Block>

      {/* Detalles del Producto */}
      <Block className="!mt-4 px-4">
        <Card className="!m-0 !p-4 !shadow-none !border-none bg-gray-100 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://placehold.co/50x50?text=Poke" className="w-12 h-12 rounded-full object-cover border-2 border-white" />
            <div>
              <h4 className="font-bold text-black !m-0">Salmon Poke Bowl</h4>
              <p className="text-xs text-gray-500 !m-0">Sin cebolla, extra sésamo</p>
            </div>
          </div>
          <span className="font-black text-black">€14.50</span>
        </Card>
      </Block>

      {/* Grid de acciones rápidas */}
      <Block className="!mt-4 px-4 grid grid-cols-2 gap-4">
        <Card className="!m-0 !p-5 !shadow-none !border-none bg-gray-200 rounded-3xl flex flex-col justify-between h-40">
          <MdLocalBar className="text-orange-900 text-3xl" />
          <div>
            <h4 className="font-bold text-black !m-0">Agua Mineral</h4>
            <p className="text-xs text-gray-600 !m-0">Con gas y limón</p>
          </div>
        </Card>
        
        <Card className="!m-0 !p-5 !shadow-none !border-none bg-gray-200 rounded-3xl flex flex-col justify-between h-40">
          <MdConfirmationNumber className="text-orange-900 text-3xl" />
          <div>
            <h4 className="font-bold text-black !m-0">Ticket Digital</h4>
            <p className="text-xs text-gray-600 !m-0">Escanea al pagar</p>
          </div>
        </Card>
      </Block>

      {/* Ayuda */}
      <Block className="!mt-4 !mb-20 px-4">
        <Button className="!bg-gray-100 !text-black !rounded-2xl !h-14 !shadow-none !normal-case text-base font-bold">
          <div className="flex items-center gap-2">
            <MdHelpOutline className="text-xl" />
            ¿Necesitas ayuda con tu pedido?
          </div>
        </Button>
      </Block>
    </Page>
  );
};

export default OrdersPage;