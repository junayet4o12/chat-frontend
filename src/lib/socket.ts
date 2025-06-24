import { io, Socket } from "socket.io-client";

let initialSocket: Socket | null;
export const connectSocket = (): Socket => {
    if (!initialSocket) {
        initialSocket = io('http://localhost:5000')
    };
    return initialSocket
}

export const socket = connectSocket()

export const registerSocket = (userId: string) => {
  socket.emit('register', userId);
};