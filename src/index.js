"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app.use((0, cors_1.default)({ origin: '*' }));
const io = new socket_io_1.Server(server, {
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
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
