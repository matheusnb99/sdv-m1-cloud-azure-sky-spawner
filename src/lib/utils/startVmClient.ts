"use server";

import { startVM } from "@/lib/utils/azureTs";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { ComputeManagementClient } from "@azure/arm-compute";

export async function startVmClient(
  token: string,
  subscriptionId: string,
  resourceGroupName: string,
  virtualMachineName: string
) {
  console.log("startVmClient");

  const computeClient = new ComputeManagementClient(generateTokenCallback(token), subscriptionId);
  const temp = await startVM(computeClient, resourceGroupName, virtualMachineName).then((res) => {
    res.pollUntilDone().then((res) => console.log(res));
  });
  return true;
}
