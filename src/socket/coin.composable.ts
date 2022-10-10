import { io } from "socket.io-client";

export const getCoin = () => {
  let socket = io("http://148.251.15.61:3800/", {
    path: "/price/",    
  });
  return {
    socket,
  };
};
