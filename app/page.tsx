"use client"

// import { v4 as uuidv4 } from "uuid";
import TestComponent from "@/components/TestComponent";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { generatePattern } from "@/utils/generatePattern";
import SideBar from "@/app/components/SideBar";


import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');

  const createAndJoin = () => {
    // const roomId = uuidv4();
    const roomId = generatePattern();
    // const newRoomId = uuidv4();
    const pattern =
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
    <>

      <div className="bg-black min-h-screen flex justify-center items-center">

        <ToastContainer />
        <div className="bg-gray-800 w-11/12 md:w-2/3 lg:w-1/3 h-1/2 flex flex-col justify-center items-center shadow-xl rounded-lg border border-gray-700">
          <div className="flex flex-col items-center my-auto p-10">
            <input
              type="text"
              placeholder="Enter Room ID"
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
              className="text-lg text-center text-white w-full bg-gray-700 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 ease-in-out"
            />
            <button
              onClick={join}
              className="text-lg bg-red-600 text-white p-3 w-full mt-2 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 ease-in-out">
              Join Room
            </button>
            <h1 className="text-lg text-gray-400 my-4">or</h1>
            <button
              onClick={createAndJoin}
              className="text-lg bg-green-700 text-white p-3 w-full rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 ease-in-out">
              Create Room
            </button>
          </div>
        </div>
      </div>
    </>
  );
}  