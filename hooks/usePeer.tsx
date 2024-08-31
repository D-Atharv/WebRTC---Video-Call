"use client"

import { useEffect, useRef, useState } from "react"
import peer, { Peer } from 'peerjs';

export const usePeer = () => {
    const [peer, setPeer] = useState<Peer | null>(null);
    const [myId, setMyId] = useState('');
    const isPeerSet = useRef(false);

    useEffect(() => {
        if (isPeerSet.current) {    // to stop double console log of peerid
            return;                 // due to strict mode
        }
        isPeerSet.current = true;

        const myPeer: any = new Peer();
        setPeer(myPeer);

        myPeer.on('open', (id: any) => {
            console.log('My peer ID is: ' + id);
            setMyId(id);
            console.log(isPeerSet);
        })
    }, []);

    return { peer, myId };
}

