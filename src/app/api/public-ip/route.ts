import { createPublicIpAddress, getSubscriptionId } from "@/lib/utils/azureTs";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { NetworkManagementClient } from "@azure/arm-network";
import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("Generating public IP");
  const {
    body: { resourceGroupName, location, publicIpName },
  } = await req.json();

  const headersInstance = headers();
  const token = headersInstance.get("Authorization");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  const subscriptionId: string = getSubscriptionId();

  const networkClient = new NetworkManagementClient(generateTokenCallback(token), subscriptionId);

  const publicIp = await createPublicIpAddress(networkClient, location, resourceGroupName, publicIpName);

  return NextResponse.json({ publicIp });
}

export async function GET(req: Request) {
  console.log("Fetching public IP");

  const { searchParams } = new URL(req.url);

  const resourceGroupName = searchParams.get("resourceGroupName");
  const publicIpName = searchParams.get("publicIpName");

  const headersInstance = headers();
  const token = headersInstance.get("Authorization");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }
  if (!resourceGroupName) {
    return NextResponse.json({ error: "No resourceGroupName provided" }, { status: 400 });
  }
  if (!publicIpName) {
    return NextResponse.json({ error: "No publicIpName provided" }, { status: 400 });
  }

  const subscriptionId: string = getSubscriptionId();

  const networkClient = new NetworkManagementClient(generateTokenCallback(token), subscriptionId);

  const publicIPAddress = await networkClient.publicIPAddresses.get(resourceGroupName, publicIpName);

  return NextResponse.json({ publicIPAddress });
}
