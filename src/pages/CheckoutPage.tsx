import { Page, Navbar, List, ListItem, Block, Button, BlockTitle } from 'konsta/react';
import { useCart } from '../context/CartContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, obtenerTokenNotificacion } from '../firebaseConfig'; // Importamos la nueva función
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, totalPrecio, limpiarCarrito } = useCart();
  const navigate = useNavigate();

  const enviarPedido = async () => {
    if (cart.length === 0) return;

    try {
      // 1. Intentamos obtener el token del dispositivo (pide permiso al usuario)
      // Nota: Si el usuario rechaza, devolverá null, pero el pedido se enviará igual.
      const tokenPush = await obtenerTokenNotificacion();
      const mesaParaFirebase = localStorage.getItem('mesa_actual') || "Barra";

      // 2. Guardamos la comanda en Firestore
      await addDoc(collection(db, "comandas"), {
        platillos: cart,
        total: totalPrecio,
        estado: 'pendiente',
        mesa: mesaParaFirebase, 
        fecha: serverTimestamp(),
        clientToken: tokenPush, // <--- Aquí guardamos la "dirección" para la notificación
      });

      alert("¡Pedido enviado a cocina! Te avisaremos cuando esté listo.");
      limpiarCarrito();
      
      // Navegamos a la página de seguimiento de órdenes
      navigate('/orders');
    } catch (e) {
      console.error("Error al enviar el pedido:", e);
      alert("Hubo un problema al enviar tu pedido. Intenta de nuevo.");
    }
  };

  return (
    <Page>
      <Navbar title="Tu Pedido" backLink="Atrás" />

      <BlockTitle>Resumen del Pedido</BlockTitle>
      <List strong inset>
        {cart.map((item) => (
          <ListItem
            key={item.id}
            title={item.nombre}
            after={`$${(item.precio * item.cantidad).toFixed(2)}`}
            subtitle={`Cantidad: ${item.cantidad}`}
          />
        ))}
        <ListItem
          className="font-bold"
          title="TOTAL"
          after={`$${totalPrecio.toFixed(2)}`}
        />
      </List>

      <Block className="mt-10">
        <Button 
          large 
          rounded 
          className="!bg-orange-500" 
          onClick={enviarPedido}
          disabled={cart.length === 0}
        >
          {cart.length === 0 ? 'Agrega productos para continuar' : 'Enviar a Cocina'}
        </Button>
      </Block>
    </Page>
  );
};

export default CheckoutPage;