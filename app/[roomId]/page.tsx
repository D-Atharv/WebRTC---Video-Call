"use client"

import { useEffect } from "react";
import { usePeer } from "@/hooks/usePeer";
import { useSocket } from "@/context/useSocket";
import { useMedia } from "@/app/hooks/useMedia";
import { VideoPlayer } from "../components/VideoPlayer";


// const Room = ({ params: { roomId } }: { params: { roomId: string } }) => {
const Room = () => {
    const socket = useSocket();
    const { peer, myId } = usePeer();
    const { stream } = useMedia();

    useEffect(() => {

        if (!socket || !peer || !stream) return;

        const userConnected = (newUserId: any) => {
            console.log(`Received user-connected event with userId: ${newUserId}`);

            const call = peer.call(newUserId, stream); //sending my stream
            console.log('Calling user with stream');

            call.on("stream", (userVideoStream: any) => {
                console.log(`incoming streaming from other user ${newUserId}`);
            })


        }
        socket?.on('user-connected', userConnected);

        return () => {
            socket?.off(`user-connected`, userConnected);
            console.log('Cleaned up first useEffect');

        }
    }, [socket, peer, stream]);



    useEffect(() => {
        if (!peer || !stream) return;

        peer.on("call", (call: any) => {
            const { peer: callerId } = call;
            console.log('Incoming call from peer:', callerId);
            call.answer(stream);

            call.on("stream", (userVideoStream: any) => {
                console.log(`incoming streaming from other user ${callerId}`);
            })
        })

    }, [peer, stream]);

    if (!stream) {
        return <div>Loading stream, please wait...</div>;
    }


    return (
        <>
            <h1>Inside Room</h1>
            <VideoPlayer playerId={myId} url={stream} muted={false} playing={true} />
        </>
    )
}

export default Room;