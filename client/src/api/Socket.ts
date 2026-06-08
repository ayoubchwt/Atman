import { io } from "socket.io-client";
const apiUrl = import.meta.env.VITE_SOCKET_URL;
const socket = io(apiUrl, {
  autoConnect: true,
  withCredentials: true,
  transports: ["websocket"],
});
export default socket;
