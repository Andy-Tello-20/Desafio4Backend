import { Server } from 'socket.io';
import { product2 } from './manager/ProductManager.js';

let socketServer;
let socketClient; 

export const InitSocket = (httpServer) => {
  socketServer = new Server(httpServer);

  socketServer.on('connection', async (client) => {
    console.log(`Nuevo cliente socket conectado ${client.id}`);
    
    const products = await product2.getProducts()
    socketClient = client; 
    socketClient.emit('client-emit', products);
  });

  return socketServer;
};

export { socketClient }; 