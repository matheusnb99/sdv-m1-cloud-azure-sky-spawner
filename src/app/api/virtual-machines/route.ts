import { createVirtualMachine, getSubscriptionId, listVirtualMachines } from "@/lib/utils/azureTs";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { ComputeManagementClient, VirtualMachine } from "@azure/arm-compute";
import { NetworkManagementClient } from "@azure/arm-network";
import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { resourceGroupName, location, virtualMachineName, networkInterfaceName } = await req.json();

  const headersInstance = headers();
  const token = headersInstance.get("Authorization");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

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
      adminUsername: "MyUsername",
      adminPassword: "MyPa$$w0rd",
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
        name: `diskateaegaege`,
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

  const virtualMachinesArray: VirtualMachine[] = await listVirtualMachines(computeClient);

  return NextResponse.json({ virtualMachinesArray });
}
