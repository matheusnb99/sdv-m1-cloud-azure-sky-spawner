import { ComputeManagementClient, VirtualMachine } from "@azure/arm-compute";
import { NetworkInterface, NetworkManagementClient, PublicIPAddress, VirtualNetwork } from "@azure/arm-network";
import { ResourceManagementClient } from "@azure/arm-resources";
import { StorageManagementClient } from "@azure/arm-storage";
import { InteractiveBrowserCredential } from "@azure/identity";
import { loadEnvConfig } from "@next/env";

const dev = process.env.NODE_ENV !== "production";
const { AZURE_SUBSCRIPTION_ID } = loadEnvConfig("./", dev).combinedEnv;

export function createRessourceGroup(
  resourceGroupName: string,
  location: string,
  projectName: string,
  resourceClient: ResourceManagementClient
) {
  console.log(
    `Creating "${resourceGroupName}" resource group in ${resourceGroupName} resource group in ${resourceClient.subscriptionId} subscription`
  );
  const groupParameters = {
    location: location,
    tags: { project: projectName },
  };

  return resourceClient.resourceGroups.createOrUpdate(resourceGroupName, groupParameters);
}

export async function createStorageAccount(
  storageAccountName: string,
  location: string,
  accType: string,
  storageClient: StorageManagementClient,
  resourceGroupName: string,
  projectName: string
) {
  console.log("\n2.Creating storage account: " + storageAccountName);
  const createParameters = {
    location: location,
    sku: {
      name: accType,
    },
    kind: "Storage",
    tags: {
      project: projectName,
    },
  };
  return storageClient.storageAccounts.beginCreateAndWait(resourceGroupName, storageAccountName, createParameters);
}

export function getSubscriptionId(): string {
  const subscriptionId: string | undefined = AZURE_SUBSCRIPTION_ID;

  if (!subscriptionId) {
    console.error("Please set Azure subscription environmental variable");
    process.exit(1);
  }

  return subscriptionId!;
}

export async function getAzureClients(subscriptionId: string): Promise<{
  computeClient: ComputeManagementClient;
  networkClient: NetworkManagementClient;
  resourceClient: ResourceManagementClient;
  storageClient: StorageManagementClient;
}> {
  const credentials = new InteractiveBrowserCredential();
  return {
    computeClient: new ComputeManagementClient(credentials, subscriptionId),
    networkClient: new NetworkManagementClient(credentials, subscriptionId),
    resourceClient: new ResourceManagementClient(credentials, subscriptionId),
    storageClient: new StorageManagementClient(credentials, subscriptionId),
  };
}

export async function listVirtualMachines(computeClient: ComputeManagementClient) {
  console.log(`Listing virtual machine in ${computeClient.subscriptionId} subscription`);
  const virtualMachines = await computeClient.virtualMachines.listAll();
  const virtualMachinesArray = new Array();
  let index = 0;
  for await (let virtualMachine of virtualMachines) {
    console.log(
      `${index++}): ${virtualMachine.name}\t\t${virtualMachine.location}\t${virtualMachine.provisioningState}`
    );

    console.log(virtualMachine);

    virtualMachinesArray.push({
      name: virtualMachine.name,
      location: virtualMachine.location,
    });
  }
  console.log(`Found ${index} virtual machines:`);

  return virtualMachinesArray;
}

export async function createVirtualNetwork(
  networkClient: NetworkManagementClient,
  location: string,
  resourceGroupName: string,
  name: string,
  parameters: VirtualNetwork = {
    location: location,
    addressSpace: {
      addressPrefixes: ["10.0.0.0/16"],
    },
    subnets: [
      {
        name: `sub${name}`,
        addressPrefix: "10.0.0.0/24",
      },
    ],
  }
) {
  console.log(
    `Creating "${name}" virtual network in ${resourceGroupName} resource group in ${networkClient.subscriptionId} subscription`
  );
  await networkClient.virtualNetworks.beginCreateOrUpdateAndWait(resourceGroupName, name, parameters);
  const virtualNetwork = await networkClient.virtualNetworks.get(resourceGroupName, name);

  console.log(`Virtual network "${virtualNetwork.name}" was created successfully`);
  return virtualNetwork;
}

export async function getVirtualNetwork(
  networkClient: NetworkManagementClient,
  resourceGroupName: string,
  virtualNetworkName: string
) {
  const virtualNetwork = await networkClient.virtualNetworks.get(resourceGroupName, virtualNetworkName);
  console.log(`Virtual network "${virtualNetwork.name}" was found successfully`);

  return virtualNetwork;
}

export async function createPublicIpAddress(
  networkClient: NetworkManagementClient,
  location: string,
  resourceGroupName: string,
  name: string,
  parameters: PublicIPAddress = {
    location: location,
    publicIPAllocationMethod: "Dynamic",
    dnsSettings: {
      domainNameLabel: name,
    },
  }
) {
  console.log(
    `Creating "${name}" public IP address in ${resourceGroupName} resource group in ${networkClient.subscriptionId} subscription`
  );
  const publicIpInfo = await networkClient.publicIPAddresses.beginCreateOrUpdateAndWait(
    resourceGroupName,
    name,
    parameters
  );
  const publicIPAddress = await networkClient.publicIPAddresses.get(resourceGroupName, name);
  console.log(`Virtual network "${publicIPAddress.name}" was created successfully`);
  return publicIPAddress;
}

export async function createNetworkInterface(
  networkClient: NetworkManagementClient,
  location: string,
  resourceGroupName: string,
  name: string,
  virtualNetwork: VirtualNetwork,
  publicIp: PublicIPAddress,
  parameters: NetworkInterface = {
    location: location,
    ipConfigurations: [
      {
        name: name,
        privateIPAllocationMethod: "Dynamic",
        subnet: virtualNetwork.subnets![0],
        publicIPAddress: publicIp,
      },
    ],
  }
) {
  console.log(
    `Creating "${name}" network interface in ${resourceGroupName} resource group in ${networkClient.subscriptionId} subscription`
  );
  if (!publicIp) {
    console.error("Public IP is not defined");
    return null;
  }

  if (!virtualNetwork) {
    console.error("Subnet is not defined");
    return null;
  }
  await networkClient.networkInterfaces.beginCreateOrUpdateAndWait(resourceGroupName, name, parameters);
  const networkInterface = await networkClient.networkInterfaces.get(resourceGroupName, name);
  console.log(`Virtual network "${networkInterface.name}" was created successfully`);
  return networkInterface;
}

export async function createVirtualMachine(
  computeClient: ComputeManagementClient,
  location: string,
  resourceGroupName: string,
  virtualMachineName: string,
  parameters: VirtualMachine = {
    location: location,
  }
) {
  console.log(
    `Creating "${virtualMachineName}" virtual machine in ${resourceGroupName} resource group in ${computeClient.subscriptionId} subscription`
  );
  await computeClient.virtualMachines.beginCreateOrUpdateAndWait(resourceGroupName, virtualMachineName, parameters);
  const virtualMachine = await computeClient.virtualMachines.get(resourceGroupName, virtualMachineName);
  console.log(`Created ${virtualMachine.name} (${virtualMachine.vmId}) virtual machine.`);
  return virtualMachine;
}

export async function deleteResource(resourceGroupName: string, resourceName: string, resource: any) {
  console.log(`Deleting "${resourceName}" resource in ${resourceGroupName} resource group`);
  await resource.beginDeleteAndWait(resourceGroupName, resourceName);
  console.log(`Resource "${resourceName}" deleted successfully.`);
}

export function getNameSuffix(): string {
  const now = new Date();
  const pad = (n: number, num: number): string => {
    const padString = "0".repeat(n);
    return (padString + num).slice(-n);
  };

  const nameSuffix =
    pad(2, now.getMonth()) +
    pad(2, now.getDate()) +
    pad(2, now.getHours()) +
    pad(2, now.getMinutes()) +
    pad(2, now.getSeconds());

  return nameSuffix;
}

export async function listVMsStatus(computeClient: ComputeManagementClient) {
  // Set params to only ask for status
  const virtualMachinesListAllOptionalParams = { statusOnly: "true" };

  const virtualMachines = await computeClient.virtualMachines.listAll(virtualMachinesListAllOptionalParams);

  const result = new Array();
  for await (const item of virtualMachines) {
    const status = item.instanceView?.statuses?.map((status) => {
      return {
        displayStatus: status.displayStatus,
        time: status.time,
      };
    });
    console.log(item);

    result.push({
      name: item.name,
      vmID: item.vmId,
      location: item.location,
      status: status,
    });
  }
  return result;
}

export async function stopVM(
  computeClient: ComputeManagementClient,
  resourceGroupName: string,
  virtualMachineName: string
) {
  const result = await computeClient.virtualMachines.beginPowerOff(resourceGroupName, virtualMachineName);
  return result;
}

export async function startVM(
  computeClient: ComputeManagementClient,
  resourceGroupName: string,
  virtualMachineName: string
) {
  const result = await computeClient.virtualMachines.beginStart(resourceGroupName, virtualMachineName);
  return result;
}
