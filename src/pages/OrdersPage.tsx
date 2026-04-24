import { Page, Navbar, Block, Card,  Button, Preloader,BlockTitle,Notification } from 'konsta/react';
import {  MdAccessTime, MdCheckCircle, MdRestaurant, MdNotificationsNone, MdLocalBar, MdConfirmationNumber, MdHelpOutline } from 'react-icons/md';
import { useFetchOrders } from '../viewModel/useFetchOrders';
import React from 'react';

const OrdersPage = () => {
  const { ultimaOrden, loading } = useFetchOrders();
const [notifCerradaManualmente, setNotifCerradaManualmente] = React.useState(false);

  // En lugar de un useEffect para abrirla, 
  // calculamos si debe mostrarse basándonos en los datos que ya tenemos.
  const debeMostrarNotif = ultimaOrden?.estado === 'listo' && !notifCerradaManualmente;

  // Este useEffect se queda, pero solo para CERRARLA automáticamente si quieres
  React.useEffect(() => {
    let timer;
    if (debeMostrarNotif) {
      timer = setTimeout(() => setNotifCerradaManualmente(true), 5000);
    }
    return () => clearTimeout(timer);
  }, [debeMostrarNotif]);

  if (loading) return <Page className="flex justify-center items-center"><Preloader /></Page>;
  if (!ultimaOrden) return (
    <Page>
      <Navbar title="Mis Pedidos" />
      <Block className="text-center mt-20 text-gray-400">Aún no has realizado pedidos.</Block>
    </Page>
  );

  return (
    <Page className="!bg-gray-50 pb-24">
    <Notification
      opened={debeMostrarNotif} // Usamos nuestra nueva constante
      icon={<MdRestaurant className="text-orange-500" />}
      title="Atelier Cuisine"
      titleRightText="Ahora"
      subtitle="¡Tu pedido está listo!"
      text="Puedes pasar por tu orden a la barra. ¡Buen provecho!"
      button
      onClick={() => setNotifCerradaManualmente(true)} // Marcamos como cerrada
    />
      <Navbar
        title={
          <div className="flex items-center gap-3">
            <img src="https://placehold.co/36x36?text=U" alt="Avatar" className="w-9 h-9 rounded-full" />
            <span className="text-2xl font-black text-black">Atelier Cuisine</span>
          </div>
        }
        className="!bg-gray-50 !shadow-none"
      />

      {/* Cabecera dinámica basada en Firestore */}
      <Block className="!mt-4 px-4">
        <Card className="!m-0 !p-6 !shadow-none !border-none bg-white rounded-3xl">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-500 font-medium text-sm">Pedido #{ultimaOrden.id}</span>
            <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
              {ultimaOrden.mesa || 'Mesa 1'}
            </span>
          </div>
          
          <h1 className="text-4xl font-black text-black leading-tight mb-6">
            {ultimaOrden.estado === 'pendiente' && 'Pedido recibido'}
            {ultimaOrden.estado === 'cocinando' && 'Cocinando tu pedido...'}
            {ultimaOrden.estado === 'listo' && '¡Tu pedido está listo!'}
          </h1>
          
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
            <div className="bg-orange-900/10 p-2 rounded-full">
              <MdAccessTime className="text-orange-900 text-2xl" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest !m-0">Estado</p>
              <p className="text-2xl font-black text-orange-900 !m-0 capitalize">{ultimaOrden.estado}</p>
            </div>
          </div>
        </Card>
      </Block>

      {/* Timeline Dinámico */}
      <Block className="!mt-4 px-4">
        <Card className="!m-0 !p-6 !shadow-none !border-none bg-white rounded-3xl">
          <div className="space-y-8 relative">
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-100" />

            {/* Enviado */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-orange-900 flex items-center justify-center">
                <MdCheckCircle className="text-white text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-black !m-0">Pedido Enviado</h4>
                <p className="text-sm text-gray-500 !m-0">Recibido a las {ultimaOrden.hora}</p>
              </div>
            </div>

            {/* Cocina */}
            <div className={`flex items-center gap-4 relative z-10 ${ultimaOrden.estado === 'pendiente' ? 'opacity-30' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ultimaOrden.estado !== 'pendiente' ? 'bg-orange-500' : 'bg-gray-200'}`}>
                <MdRestaurant className="text-white text-xl" />
              </div>
              <div>
                <h4 className={`text-lg font-bold !m-0 ${ultimaOrden.estado !== 'pendiente' ? 'text-orange-600' : 'text-gray-500'}`}>En Cocina</h4>
                <p className="text-sm text-gray-500 !m-0">El Chef está preparando tu selección</p>
              </div>
            </div>

            {/* Listo */}
            <div className={`flex items-center gap-4 relative z-10 ${ultimaOrden.estado !== 'listo' ? 'opacity-30' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ultimaOrden.estado === 'listo' ? 'bg-green-500' : 'bg-gray-200'}`}>
                <MdNotificationsNone className={`${ultimaOrden.estado === 'listo' ? 'text-white' : 'text-gray-500'} text-xl`} />
              </div>
              <div>
                <h4 className={`text-lg font-bold !m-0 ${ultimaOrden.estado === 'listo' ? 'text-green-600' : 'text-gray-500'}`}>Listo para Recoger</h4>
                <p className="text-sm text-gray-400 !m-0">¡Buen provecho!</p>
              </div>
            </div>
          </div>
        </Card>
      </Block>

      {/* Lista de productos del pedido */}
      <BlockTitle>Tu consumo</BlockTitle>
      <Block className="!mt-0 px-4">
        {ultimaOrden.platillos?.map((item: any) => (
          <Card key={item.id} className="!m-0 !mb-3 !p-4 !shadow-none !border-none bg-gray-100 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-orange-600">
                {item.cantidad}x
              </div>
              <h4 className="font-bold text-black !m-0">{item.nombre}</h4>
            </div>
            <span className="font-black text-black">${(item.precio * item.cantidad).toFixed(2)}</span>
          </Card>
        ))}
      </Block>

      <Block className="!mt-4 px-4 grid grid-cols-2 gap-4">
        <Card className="!m-0 !p-5 !shadow-none bg-gray-200 rounded-3xl flex flex-col justify-between h-32">
          <MdLocalBar className="text-orange-900 text-3xl" />
          <h4 className="font-bold text-black !m-0 text-sm">Pedir Bebida</h4>
        </Card>
        <Card className="!m-0 !p-5 !shadow-none bg-orange-900 text-white rounded-3xl flex flex-col justify-between h-32">
          <MdConfirmationNumber className="text-white text-3xl" />
          <h4 className="font-bold !m-0 text-sm">Pagar Cuenta</h4>
        </Card>
      </Block>

      <Block className="!my-6 px-4">
        <Button className="!bg-white !text-black !rounded-2xl !h-14 !shadow-sm !normal-case text-base font-bold border border-gray-100">
          <MdHelpOutline className="mr-2 text-xl" /> ¿Necesitas ayuda?
        </Button>
      </Block>
    </Page>
  );
};

export default OrdersPage;