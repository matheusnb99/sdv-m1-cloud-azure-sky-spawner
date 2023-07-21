import { getSubscriptionId, stopVM } from "@/lib/utils/azureTs";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { ComputeManagementClient } from "@azure/arm-compute";
import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { resourceGroupName, virtualMachineName } = await req.json();

  const headersInstance = headers();
  const token = headersInstance.get("Authorization");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  const subscriptionId: string = getSubscriptionId();

  const computeClient = new ComputeManagementClient(generateTokenCallback(token), subscriptionId);

  const res = await stopVM(computeClient, resourceGroupName, virtualMachineName);

  return NextResponse.json({ res });
}
