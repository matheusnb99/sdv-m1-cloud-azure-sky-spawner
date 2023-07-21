"use client";

import Auth from "@/components/Auth";
import { AuthContext } from "@/context/AuthContext";
import { UserContext } from "@/context/UserContext";
import { FunctionComponent, useContext } from "react";

interface ApplicationProps {}

const Application: FunctionComponent<ApplicationProps> = () => {
  const { user } = useContext(UserContext);
  const { loginAd } = useContext(AuthContext);

  const { jwt } = useContext(AuthContext);

  if (!jwt) {
    return (
      <>
        Loading, if this takes too long, please refresh the page.
        {/* button that reloads page */}
        <button
          onClick={() => {
            loginAd();
          }}
        >
          Login
        </button>
      </>
    );
  }

  return (
    <main>
      {user && (
        <div>
          <nav className="flex items-center justify-between p-5 bg-blue-600">
            <div className="text-white">VM Manager</div>
            <div className="flex items-center">
              <span className="mr-4 text-white">{user.username}</span>
              <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Log out</button>
            </div>
          </nav>
          <div className="p-5 space-y-3">
            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              Create Resource Group
            </button>
            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Create Account Info</button>
            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              Create Virtual Network
            </button>
            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Create Public IP</button>
            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              Create Network Interface
            </button>
            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              Create Virtual Machine
            </button>

            <div className="relative border-t-2 border-gray-500 pt-2 mt-4">
              <h2 className="absolute  top-0 bg-white px-2 text-gray-500 -mt-2">{"title"}</h2>
              <div className="p-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, voluptatem quo, vero voluptates
                corrupti repellat nesciunt pariatur deleniti, eligendi beatae iure libero totam magnam maiores inventore
                dolorum sit labore fuga?
              </div>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-6xl font-bold text-center text-red-600">Creation de VM</h1>
      <div className="flex min-h-screen flex-col items-center justify-evenly p-24">{!user && <Auth />}</div>
    </main>
  );
};

export default Application;
