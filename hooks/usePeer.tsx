"use client"

import { useEffect, useRef, useState } from "react"
import { Peer } from 'peerjs';
import { useSocket } from "@/context/useSocket";
import { useParams } from "next/navigation";


export const usePeer = () => {
    const socket = useSocket();
    const { roomId } = useParams();
    const [peer, setPeer] = useState<Peer | null>(null);
    const [myId, setMyId] = useState('');
    const isPeerSet = useRef(false);

    useEffect(() => {
        if (isPeerSet.current || !socket || !roomId) {// to stop double console log of peerid due to strict mode
            console.log("roomId, socketId already set")
            return;
        }
        isPeerSet.current = true;

        const peerFunction = async () => {
            const myPeer: any = new Peer();
            setPeer(myPeer);

            myPeer.on('open', (id: any) => {
                console.log('My peer ID is: ' + id);
                setMyId(id);
                console.log(isPeerSet.current);
                console.log('Emitting join-room with roomId:', roomId, 'and id:', id);
                socket?.emit("join-room", roomId, id);
            })

        };
        peerFunction();
        // }, []);

    }, [roomId, socket]);

    return { peer, myId };
}

