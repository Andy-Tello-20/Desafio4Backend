import http from 'http';
import app from './app.js';
import { InitSocket } from './socket.js';



const HTTPserver = http.createServer(app);
InitSocket(HTTPserver)
const PORT = 8080;

HTTPserver.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT} 🚀`);
});





