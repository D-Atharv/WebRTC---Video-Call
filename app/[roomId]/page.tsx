"use client"

import { useEffect } from "react";
import { usePeer } from "@/hooks/usePeer";
import { useSocket } from "@/context/useSocket";
import { useMedia } from "@/app/hooks/useMedia";
import { VideoPlayer } from "../components/VideoPlayer";


const Room = () => {
    const socket = useSocket();
    const { peer, myId } = usePeer();
    const { stream } = useMedia();

    return (
        <>
            <h1>Inside Room</h1>
            <VideoPlayer playerId={myId} url={stream} muted={false} playing={true} />
        </>
    )
}

export default Room;