"use client"

import { v4 as uuidv4 } from "uuid";
import TestComponent from "@/components/TestComponent";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');

  const createAndJoin = () => {
    const roomId = uuidv4();
    // const newRoomId = uuidv4();
    router.push(`/roomId/${roomId}`);

  }

  const join = () => {
    if (roomId) {
      router.push(`/roomId/${roomId}`);

    }
    else {
      toast("Incorrect RoomID.");
    }
  }
  return (
    <div className="bg-black min-h-screen flex justify-center items-center border-black border-2">
      <ToastContainer />
      <div className="bg-blue-900 w-11/12 md:w-2/3 lg:w-1/3 h-1/2 flex flex-col justify-center items-center shadow-lg rounded-lg">
        {/* <h1 className="text-white text-3xl font-bold text-center p-4">Video Call</h1> */}
        <div className="flex flex-col items-center mt-10 p-4">
          <input
            type="text"
            placeholder="Enter Room ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            className="text-xl text-center text-black w-full bg-blue-200 p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={join}
            className="text-xl bg-red-600 text-white p-4 w-full mt-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded transition duration-150 ease-in-out">
            Join Room
          </button>
          <h1 className="text-xl text-white my-4">or</h1>
          <button
            onClick={createAndJoin}
            className="text-xl bg-green-800 text-white p-4 w-full hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 rounded transition duration-150 ease-in-out">
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}
