"use server";

import { deleteResource } from "@/lib/utils/azureTs";
import purgeDb from "@/lib/utils/db/purgeDb";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { ComputeManagementClient } from "@azure/arm-compute";
import { revalidatePath } from "next/cache";

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
    const deleted = await deleteResource(resourceGroupName, virtualMachineName, computeClient.virtualMachines);
    // await deleteResource(resourceGroupName, resourceGroupName, resourceClient.resourceGroups);

    console.log(virtualMachineName.toString());

    await purgeDb(resourceGroupName.toString(), virtualMachineName.toString());

    revalidatePath("/app");

    return deleted;
  } catch (error) {
    console.error(error);
  }
}
