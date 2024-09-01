//to get access for camera and audio

"use client"

import { useEffect, useRef, useState } from "react";

export const useMedia = () => {
    const [state, setState] = useState<MediaStream | null>(null);
    const isStreamSet = useRef(false);

    useEffect(() => {
        if (isStreamSet.current) return;
        isStreamSet.current = true;

        const fetchMedia = async (): Promise<void> => {
            try {
                console.log("Requesting media stream...");

                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                console.log("setting stream");
                setState(stream);
            } catch (error: any) {
                console.log("error in useMedia", error);
            }
        };
        fetchMedia();
    }, [])

    return { stream: state }
}
