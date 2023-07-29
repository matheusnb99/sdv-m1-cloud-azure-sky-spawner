"use server";

import VirtualMachine from "@/components/VirtualMachine";
import { getSubscriptionId, listVMsStatus } from "@/lib/utils/azureTs";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { ComputeManagementClient } from "@azure/arm-compute";
import { cookies } from "next/headers";
import Link from "next/link";
import { FunctionComponent } from "react";

interface VirtualMachineListProps {}

const VirtualMachineList: FunctionComponent<VirtualMachineListProps> = async () => {
  const subscriptionId: string = getSubscriptionId();
  const token = cookies().get("azure_jwt_token")?.value;

  if (!token) {
    return <>No token</>;
  }

  const computeClient = new ComputeManagementClient(generateTokenCallback(token), subscriptionId);
  const vmList = await listVMsStatus(computeClient);

  if (vmList.length === 0) {
    return (
      <>
        No vms!
        <Link href="/create-vm">Create Vm!</Link>
      </>
    );
  }

  return (
    <>
      {vmList.map((vm: any, index: number) => {
        return <VirtualMachine key={index} name={vm.name} id={vm.vmId} status={vm.status[1].displayStatus} />;
      })}

      <Link href="/create-vm">Create Vm</Link>
    </>
  );
};

export default VirtualMachineList;
