import {
  createNetworkInterface,
  createPublicIpAddress,
  createRessourceGroup,
  createStorageAccount,
  createVirtualMachine,
  createVirtualNetwork,
  deleteResource,
  getAzureClients,
  getSubscriptionId,
  listVirtualMachines,
} from "@/lib/utils/azureTs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const subscriptionId: string = getSubscriptionId();

    const {
      projectName,
      nameSuffix,
      resourceGroupName,
      storageAccountName,
      location,
      accType,
      virtualMachineName,
      virtualNetworkName,
      publicIpName,
      networkInterfaceName,
    } = await req.json();

    const { computeClient, networkClient, resourceClient, storageClient } = await getAzureClients(subscriptionId);

    await listVirtualMachines(computeClient);

    const resourceGroup = await createRessourceGroup(resourceGroupName, location, projectName, resourceClient);
    const accountInfo = await createStorageAccount(
      storageAccountName,
      location,
      accType,
      storageClient,
      resourceGroupName,
      projectName
    );

    const virtualNetwork = await createVirtualNetwork(networkClient, location, resourceGroupName, virtualNetworkName);
    const publicIp = await createPublicIpAddress(networkClient, location, resourceGroupName, publicIpName);

    const networkInterface = await createNetworkInterface(
      networkClient,
      location,
      resourceGroupName,
      networkInterfaceName,
      virtualNetwork,
      publicIp
    );

    await createVirtualMachine(computeClient, location, resourceGroupName, virtualMachineName, {
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
        networkInterfaces: [{ primary: true, id: networkInterface?.id }],
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
          name: `disk${nameSuffix}`,
          createOption: "FromImage",
        },
      },
    });

    await listVirtualMachines(computeClient);

    await deleteResource(resourceGroupName, virtualMachineName, computeClient.virtualMachines);
    await deleteResource(resourceGroupName, networkInterfaceName, networkClient.networkInterfaces);
    await deleteResource(resourceGroupName, publicIpName, networkClient.publicIPAddresses);
    await deleteResource(resourceGroupName, virtualNetworkName, networkClient.virtualNetworks);
    await deleteResource(resourceGroupName, resourceGroupName, resourceClient.resourceGroups);
  } catch (error: any) {
    console.error(error.message);
  }
  const data = { test: "test" };

  return NextResponse.json({ data });
}
