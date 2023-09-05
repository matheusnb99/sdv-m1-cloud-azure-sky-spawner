"use server";

import { startVM } from "@/lib/utils/azureTs";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { ComputeManagementClient } from "@azure/arm-compute";
import { revalidatePath } from "next/cache";

export async function startVmClient(
  token: string,
  subscriptionId: string,
  resourceGroupName: string,
  virtualMachineName: string
) {
  const computeClient = new ComputeManagementClient(generateTokenCallback(token), subscriptionId);
  const res = await startVM(computeClient, resourceGroupName, virtualMachineName);
  const isDone = await res.pollUntilDone();

  revalidatePath("/app");

  return isDone;
}
