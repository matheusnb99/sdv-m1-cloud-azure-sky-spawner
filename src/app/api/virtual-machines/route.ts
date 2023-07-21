import {
  createVirtualMachine,
  deleteResource,
  getSubscriptionId,
  listVMsStatus,
  listVirtualMachines,
} from "@/lib/utils/azureTs";
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

  const status = await listVMsStatus(computeClient, subscriptionId);

  status.forEach((vm) => {
    console.log(`Virtual machine ${vm.name} has status ${vm.instanceView.statuses[0].displayStatus}`);
    console.table(vm.instanceView.statuses);
  });

  return NextResponse.json({ virtualMachinesArray });
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
