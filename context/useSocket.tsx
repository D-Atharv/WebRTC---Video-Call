"use client"

import { io, Socket } from "socket.io-client"
import { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
}

export const SocketProvider = ({ children }: any) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const connection = io("http://localhost:8000");
        console.log("socket connection", connection);
        setSocket(connection);

        return () => {
            connection.disconnect();
        };

    }, [socket]);


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}