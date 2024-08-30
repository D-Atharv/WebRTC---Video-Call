"use client"

import { useEffect } from "react";
import TestComponent from "@/components/TestComponent";
import { useSocket } from "@/context/useSocket";
export default function Home() {
  const socket = useSocket();

  useEffect(() => {
    socket?.on("connect", () => {
      console.log(socket.id);
    });
  })
  return (
    <>
      <h1> hello world</h1>
      <h1><TestComponent /></h1>
    </>
  );
}
