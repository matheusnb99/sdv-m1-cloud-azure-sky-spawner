"use client";

import Auth from "@/components/Auth";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-center">Welcome {user?.username}</h1>
          <h1 className="text-6xl font-bold text-center">to</h1>
          <h1 className="text-6xl font-bold text-center">VM Manager</h1>
        </div>
      )}
      <h1 className="text-6xl font-bold text-center">Creation de VM</h1>
      {!user && <Auth />}
    </main>
  );
}
