"use server";

import Image from "next/image";
import { FunctionComponent } from "react";

import TimerComponent from "@/components/TimerComponent";
import DeleteVmButton from "@/components/buttons/DeleteVmButton";
import StartVmButton from "@/components/buttons/StartVmButton";
import StopVmButton from "@/components/buttons/StopVmButton";
import { getSubscriptionId } from "@/lib/utils/azureTs";
import { deleteVmClient } from "@/lib/utils/deleteVmClient";
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

const VirtualMachine: FunctionComponent<VirtualMachineProps> = async ({ name, id, status }) => {
  const vmname = "vmname";
  const password = "password";
  const ip = "ip";
  const os = "os";
  const price = "price";

  const subscriptionId: string = await getSubscriptionId();
  const token = cookies().get("azure_jwt_token")?.value;

  if (!token) {
    return <>No token</>;
  }

  const tokenCallback = generateTokenCallback(token);

  const networkClient = new NetworkManagementClient(tokenCallback, subscriptionId);

  const vm = await prisma.virtualMachine.findFirst({
    where: {
      virtualMachineName: name,
    },
  });

  const groupName = vm?.resourceGroupName ?? "";

  const ipAddressFromDb = await prisma.publicIpAddress.findFirst({
    where: {
      resourceGroupName: groupName,
    },
  });

  const publicIPAddress = await networkClient.publicIPAddresses.get(groupName, ipAddressFromDb?.publicIpName ?? "");

  const date = Date.parse(vm?.createdAt?.toString() ?? "");

  const lapse = Date.now() - Date.parse(vm?.createdAt?.toString() ?? "");

  console.log(lapse);

  if (lapse > 600000) {
    await deleteVmClient(token, subscriptionId, groupName, name);
  }

  return (
    <div className="m-4 p-4 bg-light-blue-500 flex items-center rounded-lg w-4/6">
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
        <TimerComponent createdAt={vm?.createdAt?.toString() ?? ""} />
      </div>
      <div className="flex flex-col justify-between items-center">
        {status === "VM running" ? (
          <StopVmButton
            key="1"
            subscriptionId={subscriptionId}
            resourceGroupName={vm?.resourceGroupName ?? ""}
            virtualMachineName={name}
            token={token}
          />
        ) : (
          <StartVmButton
            key="2"
            subscriptionId={subscriptionId}
            resourceGroupName={vm?.resourceGroupName ?? ""}
            virtualMachineName={name}
            token={token}
          />
        )}
        <DeleteVmButton
          key="3"
          subscriptionId={subscriptionId}
          resourceGroupName={vm?.resourceGroupName ?? ""}
          virtualMachineName={name}
          token={token}
        />
      </div>
    </div>
  );
};

export default VirtualMachine;
