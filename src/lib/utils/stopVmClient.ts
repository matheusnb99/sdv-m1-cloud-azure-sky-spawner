"use server";

import { stopVM } from "@/lib/utils/azureTs";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { ComputeManagementClient } from "@azure/arm-compute";

export async function stopVmClient(
  token: string,
  subscriptionId: string,
  resourceGroupName: string,
  virtualMachineName: string
) {
  console.log("stopVmClient");
  console.log(resourceGroupName);

  try {
    const computeClient = new ComputeManagementClient(generateTokenCallback(token), subscriptionId);
    const temp = await stopVM(computeClient, resourceGroupName, virtualMachineName);

    return true;
  } catch (error) {
    console.error(error);
  }
}
