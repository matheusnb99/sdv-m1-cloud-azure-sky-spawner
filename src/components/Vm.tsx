import { FunctionComponent } from "react";

import Image from "next/image";
import prettyMilliseconds from "pretty-ms";
import debian from "../..//public/images/debian.png";

interface VmProps {
  vmData: {
    username: string;
    password: string;
    ip: string;
    os: string;
    status: string;
    price: string;
  };
  lapse: number;
}

const Vm: FunctionComponent<VmProps> = (props) => {
  const {
    vmData: { username, password, ip, os, status, price },
    lapse,
  } = props;

  const handleStartStop = () => {
    console.log("Start/Stop button clicked");
    // Handle start/stop functionality
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
    // Handle delete functionality
  };

  return (
    <div className="m-4 p-4 bg-light-blue-500 flex items-center rounded-lg">
      <Image className="h-full p-4" src={debian} height={300} width={300} alt="VM Image" />
      <div className="flex-1 text-center mx-4">
        <h2 className="font-bold text-xl mb-2">Username: {username}</h2>
        <p>Password: {password}</p>
        <p>IP: {ip}</p>
        <p>OS: {os}</p>
        <p>Status: {status}</p>
        <p>Price: {price}</p>
        <p>Deleting in {prettyMilliseconds(lapse)}</p>
      </div>
      <div className="flex flex-col justify-between items-center">
        <button onClick={handleStartStop} className="mb-2 py-2 px-4 bg-blue-500 text-white rounded">
          Start/Stop
        </button>
        <button onClick={handleDelete} className="py-2 px-4 bg-red-500 text-white rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Vm;
