import { createRessourceGroup, getSubscriptionId } from "@/lib/utils/azureTs";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { ResourceManagementClient } from "@azure/arm-resources";
import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { resourceGroupName, location, projectName } = await req.json();

  const headersInstance = headers();
  const token = headersInstance.get("Authorization");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  const subscriptionId: string = getSubscriptionId();

  const resourceClient = new ResourceManagementClient(generateTokenCallback(token), subscriptionId);

  const resourceGroup = await createRessourceGroup(resourceGroupName, location, projectName, resourceClient);

  return NextResponse.json({ resourceGroup });
}
