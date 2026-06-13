import { io } from "socket.io-client";
import { useAuthStore } from "../store/useAuthStore";
const apiUrl = import.meta.env.VITE_SOCKET_URL;
const socket = io(apiUrl, {
  autoConnect: false,
  auth: (callback) => {
    const accessToken = useAuthStore.getState().user?.accessToken;
    callback({
      token: accessToken ? `Bearer ${accessToken}` : null,
    });
  },
});
export default socket;
