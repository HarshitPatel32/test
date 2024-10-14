import React, { useEffect } from "react";
import { io } from "socket.io-client";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_ENDPOINT}`, {
      transports: ['websocket', 'polling'],
      secure: true,
      withCredentials: true,
    });

    fetch("/api/socket");

    return () => socket.disconnect();
  }, []);
  
  return <Component {...pageProps} />;
}
