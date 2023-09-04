"use server";

import { deleteResource } from "@/lib/utils/azureTs";
import purgeDb from "@/lib/utils/db/purgeDb";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { prisma } from "@/lib/utils/prisma";
import { ComputeManagementClient } from "@azure/arm-compute";

export async function deleteVmClient(
  token: string,
  subscriptionId: string,
  resourceGroupName: string,
  virtualMachineName: string
) {
  console.log("deleteVmClient");

  try {
    const computeClient = new ComputeManagementClient(generateTokenCallback(token), subscriptionId);
    // const resourceClient = new ResourceManagementClient(generateTokenCallback(token), subscriptionId);
    await deleteResource(resourceGroupName, virtualMachineName, computeClient.virtualMachines);
    // await deleteResource(resourceGroupName, resourceGroupName, resourceClient.resourceGroups);

    console.log(virtualMachineName.toString());

    purgeDb(resourceGroupName.toString());

    await prisma.virtualMachine.delete({
      where: {
        virtualMachineName: virtualMachineName.toString(),
      },
    });

    return true;
  } catch (error) {
    console.error(error);
  }
}
