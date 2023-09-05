"use server";

import { stopVM } from "@/lib/utils/azureTs";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { ComputeManagementClient } from "@azure/arm-compute";
import { revalidatePath } from "next/cache";

export async function stopVmClient(
  token: string,
  subscriptionId: string,
  resourceGroupName: string,
  virtualMachineName: string
) {
  console.log("stopVmClient");

  try {
    const computeClient = new ComputeManagementClient(generateTokenCallback(token), subscriptionId);
    const res = await stopVM(computeClient, resourceGroupName, virtualMachineName);
    const isDone = await res.pollUntilDone();
    revalidatePath("/app");

    return isDone;
  } catch (error) {
    console.error(error);
  }
}
