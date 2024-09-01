"use client"

import { useEffect, useState } from "react";
import { usePeer } from "@/hooks/usePeer";
import { useSocket } from "@/context/useSocket";
import { useMedia } from "@/app/hooks/useMedia";
import { VideoPlayer } from "../../components/VideoPlayer";

type VideoStreamType = {
    [key: string]: {
        url: MediaStream | null;
        muted: boolean;
        playing: boolean;
    };
};
const Room = () => {
    const socket = useSocket();
    const { peer, myPeerId } = usePeer();
    const { stream } = useMedia();
    const [videoStream, setVideoStream] = useState<VideoStreamType>({});

    useEffect(() => {

        if (!socket || !peer || !stream) return;

        const userConnected = (newUserId: any) => {
            console.log(`Received user-connected event with userId: ${newUserId}`);

            const call = peer.call(newUserId, stream); //sending my stream
            console.log('Calling user with stream');

            call.on("stream", (userVideoStream: any) => {
                console.log(`incoming streaming from other user peerId ${newUserId}`);

                setVideoStream((prev: any) => ({
                    ...prev,
                    [myPeerId]: {
                        url: stream,
                        muted: false,
                        playing: true
                    }
                }))
            })

        }
        socket?.on('user-connected', userConnected);

        return () => {
            socket?.off(`user-connected`, userConnected);
            console.log('Cleaned up first useEffect');

        }
    }, [socket, peer, stream, setVideoStream]);



    useEffect(() => {
        if (!peer || !stream) return;

        peer.on("call", (call: any) => {
            const { peer: callerId } = call;
            console.log('Incoming call from peerId:', callerId);
            call.answer(stream);

            call.on("stream", (userVideoStream: any) => {
                console.log(`incoming streaming from other user peerId ${callerId}`);
                setVideoStream((prev: any) => ({
                    ...prev,
                    [myPeerId]: {
                        url: stream,
                        muted: false,
                        playing: true
                    }
                }))
            })
        })

    }, [peer, stream, videoStream]);


    useEffect(() => {
        if (!peer || !myPeerId) return;
        console.log(`setting my steam of peerId ${myPeerId}`);
        setVideoStream((prev: any) => ({
            ...prev,
            [myPeerId]: {
                url: stream,
                muted: false,
                playing: true
            }
        }))
    }, [myPeerId, stream, setVideoStream])

    if (!stream) {
        return <div>Loading stream, please wait...</div>;
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center p-8 bg-blue-400 h-screen">
                <h1 className="text-3xl text-center">Inside Room</h1>
                {Object.keys(videoStream).map((videoStreamId: any) => {
                    const { url, muted, playing } = videoStream[videoStreamId];
                    return (
                        <div key={videoStreamId} className="p-4 ">
                            <VideoPlayer key={videoStreamId} url={url} muted={muted} playing={playing} />
                        </div>

                    )
                })}
            </div>
        </>
    )
}

export default Room;