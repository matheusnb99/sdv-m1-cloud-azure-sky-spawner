import { createNetworkInterface, getSubscriptionId } from "@/lib/utils/azureTs";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { NetworkManagementClient } from "@azure/arm-network";
import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { resourceGroupName, virtualNetworkName, publicIpName, location, networkInterfaceName } = await req.json();

  const headersInstance = headers();
  const token = headersInstance.get("Authorization");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  const subscriptionId: string = getSubscriptionId();
  const networkClient = new NetworkManagementClient(generateTokenCallback(token), subscriptionId);
  const virtualNetwork = await networkClient.virtualNetworks.get(resourceGroupName, virtualNetworkName);
  const publicIPAddress = await networkClient.publicIPAddresses.get(resourceGroupName, publicIpName);

  console.log("Creating interface");

  const networkInterface = await createNetworkInterface(
    networkClient,
    location,
    resourceGroupName,
    networkInterfaceName,
    virtualNetwork,
    publicIPAddress
  );

  return NextResponse.json({ networkInterface });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const resourceGroupName = searchParams.get("resourceGroupName");
  const networkInterfaceName = searchParams.get("networkInterfaceName");

  const headersInstance = headers();
  const token = headersInstance.get("Authorization");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }
  if (!resourceGroupName) {
    return NextResponse.json({ error: "No resourceGroupName provided" }, { status: 400 });
  }
  if (!networkInterfaceName) {
    return NextResponse.json({ error: "No networkInterfaceName provided" }, { status: 400 });
  }

  const subscriptionId: string = getSubscriptionId();

  const networkClient = new NetworkManagementClient(generateTokenCallback(token), subscriptionId);

  const networkInterface = await networkClient.networkInterfaces.get(resourceGroupName, networkInterfaceName);

  return NextResponse.json({ networkInterface });
}
