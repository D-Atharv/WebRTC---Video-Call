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
                    [newUserId]: {
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
                    [callerId]: {
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
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="text-lg text-gray-200 bg-gray-800 py-3 px-6 rounded-lg shadow-lg animate-pulse">
                    Loading stream, please wait...
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center p-8 bg-gray-900 min-h-screen">
                <h1 className="text-4xl font-semibold text-center text-white mb-8">Inside Room</h1>
                {Object.keys(videoStream).map((videoStreamId: any) => {
                    const { url, muted, playing } = videoStream[videoStreamId];
                    return (
                        <div
                            key={videoStreamId}
                            className="p-4 w-full max-w-2xl shadow-xl bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-101"
                        >
                            <VideoPlayer key={videoStreamId} url={url} muted={muted} playing={playing} />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Room;