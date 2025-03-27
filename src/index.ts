import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
dotenv.config()

const app = express();
const server = createServer(app);

app.use(cors({ origin: '*' }));

app.get("/ping", (req, res) => {
  res.send("pong");
});

const io = new Server(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('🔌 Novo cliente conectado:', socket.id);

  socket.on('message', (msg) => { 
    console.log('💬 Mensagem recebida:', msg);
    io.emit('message', msg); // envia a todos os clientes conectados
  });

  socket.on('reaction', (reaction) => { 
    console.log('💬 Reação recebida:', reaction);
    io.emit('reaction', reaction); // envia a todos os clientes conectados
  });

  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado:', socket.id);
  });
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
