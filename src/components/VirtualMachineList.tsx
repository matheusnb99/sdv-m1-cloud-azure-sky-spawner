"use server";

import VirtualMachine from "@/components/VirtualMachine";
import { getSubscriptionId, listVMsStatus } from "@/lib/utils/azureTs";
import { User } from "@/lib/utils/db/User";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { prisma } from "@/lib/utils/prisma";
import { AccessType } from "@/types/user";
import { ComputeManagementClient } from "@azure/arm-compute";
import { cookies } from "next/headers";
import Link from "next/link";
import { FunctionComponent } from "react";

interface VirtualMachineListProps {}

const VirtualMachineList: FunctionComponent<VirtualMachineListProps> = async () => {
  const subscriptionId: string = await getSubscriptionId();
  const token = cookies().get("azure_jwt_token")?.value;

  const username = cookies().get("account_jwt_token")?.value;

  if (!username) {
    return <>Not connected</>;
  }

  const credits = User.getCredits(username);
  const access = User.getAccess(username);

  if (!token) {
    return <>No token</>;
  }

  const computeClient = new ComputeManagementClient(generateTokenCallback(token), subscriptionId);
  const vmList = await listVMsStatus(computeClient);

  const vms = await prisma.virtualMachine.findMany();

  if (vmList.length != vms.length) {
    console.log(vmList.length);
    console.log(vms.length);

    return <>Please make sure you don`&apos;`t have any vms in your account </>;
  }
  return (
    <>
      <div className="flex justify-center flex-wrap">
        {!vmList.length && <div>No VMs</div>}
        {vmList.map((vm: any, index: number) => {
          if (vm.status[1].displayStatus === "VM deallocated") {
            return <></>;
          }
          return <VirtualMachine key={index} name={vm.name} id={vm.vmId} status={vm.status[1].displayStatus} />;
        })}
      </div>
      {access === AccessType.NONE && (
        <div className="flex justify-center">
          <p>
            Your account does not have the permitions to create vms, but you can access the vms that were created by an
            supperior. Ask `&apos;`user2`&apos;` or `&apos;`user3`&apos;` to create a vm so you can use it
          </p>
        </div>
      )}

      {vmList.length >= 0 && access === AccessType.MULTIPLE && (
        <div>
          <Link href="/create-vm">Create Vm</Link>
        </div>
      )}

      {vmList.length === 0 && access === AccessType.SINGLE && (
        <div>
          <Link href="/create-vm">Create Vm</Link>
        </div>
      )}
    </>
  );
};

export default VirtualMachineList;
