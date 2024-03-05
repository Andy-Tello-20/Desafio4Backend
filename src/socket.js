import { Server } from 'socket.io';
import { product2 } from './manager/ProductManager.js';

let socketServer;
let socketClient; // Nueva variable para almacenar la referencia al cliente activo

export const InitSocket = (httpServer) => {
  socketServer = new Server(httpServer);

  socketServer.on('connection', async (client) => {
    console.log(`Nuevo cliente socket conectado ${client.id}`);

    socketClient = client; // Almacena la referencia al cliente activo
    const products = await product2.getProducts();
    socketClient.emit('client-emit', products);
  });

  return socketServer;
};

export { socketClient }; // Exporta la referencia al cliente activo