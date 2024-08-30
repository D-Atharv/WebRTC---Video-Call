"use client"
import { useEffect } from 'react';
import { useSocket } from '@/context/useSocket';

const TestComponent = () => {
    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('message', (data: any) => {
                console.log('Received message:', data);
            });
        }
        return () => {
            socket?.off('message');
        };
    }, [socket]);

    return (
        <div>
            <h1>Socket.IO Integration</h1>
        </div>
    );
};

export default TestComponent;
