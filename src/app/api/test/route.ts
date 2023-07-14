import { createRessourceGroup, getSubscriptionId } from "@/lib/utils/azureTs";
import { ComputeManagementClient } from "@azure/arm-compute";
import { NetworkManagementClient } from "@azure/arm-network";
import { ResourceManagementClient } from "@azure/arm-resources";
import { StorageManagementClient } from "@azure/arm-storage";
import { InteractiveBrowserCredential, TokenCredential } from "@azure/identity";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const credentials: InteractiveBrowserCredential = new InteractiveBrowserCredential({
    redirectUri: "http://localhost:1337",
  });

  const token = await credentials.getToken("https://management.azure.com/.default openid profile offline_access");

  return NextResponse.json({ token });
}

export async function POST(request: Request) {
  const { resourceGroupName, location, projectName, token } = await request.json();

  const toek: TokenCredential = {
    getToken: async () => {
      return {
        token,
        expiresOnTimestamp: Date.now() + 1000 * 60 * 60, // set to expire in 1 hour
      };
    },
  };

  const subscriptionId: string = getSubscriptionId();
  const data = {
    computeClient: new ComputeManagementClient(toek, subscriptionId),
    networkClient: new NetworkManagementClient(toek, subscriptionId),
    resourceClient: new ResourceManagementClient(toek, subscriptionId),
    storageClient: new StorageManagementClient(toek, subscriptionId),
  };

  const resourceGroup = await createRessourceGroup(resourceGroupName, location, projectName, data.resourceClient);

  console.log(resourceGroup);
  return NextResponse.json({ resourceGroup });
}
