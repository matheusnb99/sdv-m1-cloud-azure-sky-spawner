import { createVirtualNetwork, getSubscriptionId } from "@/lib/utils/azureTs";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { NetworkManagementClient } from "@azure/arm-network";
import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("Generating virtual network");

  const { resourceGroupName, location, virtualNetworkName } = await req.json();

  const headersInstance = headers();
  const token = headersInstance.get("Authorization");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  const subscriptionId: string = getSubscriptionId();

  const networkClient = new NetworkManagementClient(generateTokenCallback(token), subscriptionId);

  const virtualNetwork = await createVirtualNetwork(networkClient, location, resourceGroupName, virtualNetworkName);

  return NextResponse.json({ virtualNetwork });
}

export async function GET(req: Request) {
  console.log("Fetching virtual network");

  const { searchParams } = new URL(req.url);

  const resourceGroupName = searchParams.get("resourceGroupName");
  const virtualNetworkName = searchParams.get("virtualNetworkName");

  const headersInstance = headers();
  const token = headersInstance.get("Authorization");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }
  if (!resourceGroupName) {
    return NextResponse.json({ error: "No resourceGroupName provided" }, { status: 400 });
  }
  if (!virtualNetworkName) {
    return NextResponse.json({ error: "No virtualNetworkName provided" }, { status: 400 });
  }

  const subscriptionId: string = getSubscriptionId();

  const networkClient = new NetworkManagementClient(generateTokenCallback(token), subscriptionId);

  const virtualNetwork = await networkClient.virtualNetworks.get(resourceGroupName, virtualNetworkName);

  return NextResponse.json({ virtualNetwork });
}
