"use client"

import { useEffect } from "react";
import { usePeer } from "@/hooks/usePeer";
import { useSocket } from "@/context/useSocket";


const Room = () => {
    const socket = useSocket();
    const { peer, myId } = usePeer();
}

export default Room;