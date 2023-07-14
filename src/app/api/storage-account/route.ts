import { createStorageAccount, getSubscriptionId } from "@/lib/utils/azureTs";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { StorageManagementClient } from "@azure/arm-storage";
import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { resourceGroupName, location, projectName, storageAccountName, accType } = await req.json();

  const headersInstance = headers();
  const token = headersInstance.get("Authorization");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  const subscriptionId: string = getSubscriptionId();

  const storageClient = new StorageManagementClient(generateTokenCallback(token), subscriptionId);

  const accountInfo = await createStorageAccount(
    storageAccountName,
    location,
    accType,
    storageClient,
    resourceGroupName,
    projectName
  );

  return NextResponse.json({ accountInfo });
}
