import Image from "next/image";
import { FunctionComponent } from "react";

import { getSubscriptionId } from "@/lib/utils/azureTs";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { prisma } from "@/lib/utils/prisma";
import { NetworkManagementClient } from "@azure/arm-network";
import { cookies } from "next/headers";
import prettyMilliseconds from "pretty-ms";
import debian from "../..//public/images/debian.png";

interface VirtualMachineProps {
  name: string;
  id: string;
  status: string;
}

const handleStartStop = () => {
  console.log("Start/Stop button clicked");
  // Handle start/stop functionality
};

const handleDelete = () => {
  console.log("Delete button clicked");
  // Handle delete functionality
};

const VirtualMachine: FunctionComponent<VirtualMachineProps> = async ({ name, id, status }) => {
  const vmname = "vmname";
  const password = "password";
  const ip = "ip";
  const os = "os";
  const price = "price";
  const lapse = 1000;

  const subscriptionId: string = getSubscriptionId();
  const token = cookies().get("azure_jwt_token")?.value;

  if (!token) {
    return <>No token</>;
  }

  const networkClient = new NetworkManagementClient(generateTokenCallback(token), subscriptionId);

  const ipAddressFromDb = await prisma.publicIpAddress.findFirst();

  const vm = await prisma.virtualMachine.findFirst();

  const gpName = ipAddressFromDb?.resourceGroupName ?? "";
  const ipName = ipAddressFromDb?.publicIpName ?? "";

  const publicIPAddress = await networkClient.publicIPAddresses.get(gpName, ipName);

  // console.log(publicIPAddress);

  return (
    <div className="m-4 p-4 bg-light-blue-500 flex items-center rounded-lg">
      <Image className="h-full p-4" src={debian} height={300} width={300} alt="VM Image" />
      <div className="flex-1 text-center mx-4">
        <h2 className="font-bold text-xl mb-2">Vm name: {name}</h2>
        <p>Username: {vm?.username}</p>
        <p>Password: {vm?.password}</p>
        <p>IP: {publicIPAddress.ipAddress}</p>
        <p>OS: {vm?.diskName}</p>
        <p>Status: {status}</p>
        <p>Price: {price}</p>
        <p>Deleting in {prettyMilliseconds(lapse)}</p>
      </div>
      <div className="flex flex-col justify-between items-center">
        <button className="mb-2 py-2 px-4 bg-blue-500 text-white rounded">Start/Stop</button>
        <button className="py-2 px-4 bg-red-500 text-white rounded">Delete</button>
      </div>
    </div>
  );
};

export default VirtualMachine;
