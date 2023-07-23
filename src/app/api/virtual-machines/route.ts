import { createVirtualMachine, deleteResource, getSubscriptionId, listVMsStatus } from "@/lib/utils/azureTs";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { ComputeManagementClient } from "@azure/arm-compute";
import { NetworkManagementClient } from "@azure/arm-network";
import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

const checkItem = (item: any) => {
  if (!item) {
    return NextResponse.json({ error: `No ${item} provided` }, { status: 400 });
  }
};

export async function POST(req: Request) {
  const {
    body: { resourceGroupName, location, virtualMachineName, networkInterfaceName, username, password, diskName },
  } = await req.json();

  const headersInstance = headers();
  const token = headersInstance.get("Authorization");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  checkItem(resourceGroupName);
  checkItem(location);
  checkItem(virtualMachineName);
  checkItem(networkInterfaceName);
  checkItem(username);
  checkItem(password);
  checkItem(diskName);

  const subscriptionId: string = getSubscriptionId();

  const computeClient = new ComputeManagementClient(generateTokenCallback(token), subscriptionId);
  const networkClient = new NetworkManagementClient(generateTokenCallback(token), subscriptionId);

  const networkInterface = await networkClient.networkInterfaces.get(resourceGroupName, networkInterfaceName);

  const machine = await createVirtualMachine(computeClient, location, resourceGroupName, virtualMachineName, {
    location: location,
    hardwareProfile: {
      vmSize: "Standard_D2s_v3",
    },
    osProfile: {
      computerName: virtualMachineName,
      adminUsername: username,
      adminPassword: password,
    },
    networkProfile: {
      networkInterfaces: [{ primary: true, id: networkInterface.id }],
    },
    storageProfile: {
      imageReference: {
        sku: "20_04-lts-gen2",
        publisher: "Canonical",
        version: "latest",
        offer: "0001-com-ubuntu-server-focal",
      },
      osDisk: {
        caching: "ReadWrite",
        managedDisk: {
          storageAccountType: "Standard_LRS",
        },
        name: diskName,
        createOption: "FromImage",
      },
    },
  });

  return NextResponse.json({ machine });
}

export async function GET(req: Request) {
  const headersInstance = headers();
  const token = headersInstance.get("Authorization");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  const subscriptionId: string = getSubscriptionId();

  const computeClient = new ComputeManagementClient(generateTokenCallback(token), subscriptionId);

  // const virtualMachinesArray: VirtualMachine[] = await listVirtualMachines(computeClient);

  const status = await listVMsStatus(computeClient);

  return NextResponse.json({ status });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);

  const resourceGroupName = searchParams.get("resourceGroupName");
  const virtualMachineName = searchParams.get("virtualMachineName");

  console.log("resourceGroupName", resourceGroupName);
  console.log("virtualMachineName", virtualMachineName);

  if (!resourceGroupName || !virtualMachineName) {
    return NextResponse.json({ error: "No resourceGroupName or virtualMachineName provided" }, { status: 400 });
  }

  const subscriptionId: string = getSubscriptionId();

  const headersInstance = headers();
  const token = headersInstance.get("Authorization");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  console.log("Deleting virtual machine...");

  const computeClient = new ComputeManagementClient(generateTokenCallback(token), subscriptionId);

  await deleteResource(resourceGroupName, virtualMachineName, computeClient.virtualMachines);

  return NextResponse.json({ message: "Virtual machine deleted" });
}
