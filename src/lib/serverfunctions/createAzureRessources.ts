"use server";
import {
  createNetworkInterface,
  createPublicIpAddress,
  createRessourceGroup,
  createStorageAccount,
  createVirtualMachine,
  createVirtualNetwork,
  getSubscriptionId,
} from "@/lib/utils/azureTs";
import { generateTokenCallback } from "@/lib/utils/generateToken";
import { prisma } from "@/lib/utils/prisma";
import { ComputeManagementClient } from "@azure/arm-compute";
import { NetworkManagementClient } from "@azure/arm-network";
import { ResourceManagementClient } from "@azure/arm-resources";
import { StorageManagementClient } from "@azure/arm-storage";
import { cookies } from "next/headers";

const getToken = () => {
  const token = cookies().get("azure_jwt_token")?.value;

  if (!token) {
    throw new Error("No token provided");
  }

  return generateTokenCallback(token);
};

export const _createRessourceGroup = async (body: RequestBody) => {
  const { resourceGroupName, location, projectName } = body as DefaultProps & RessourceGroupProps;
  const subscriptionId = getSubscriptionId();
  const resourceClient = new ResourceManagementClient(getToken(), subscriptionId);
  const resourceGroup = await createRessourceGroup(resourceGroupName, location, projectName, resourceClient);

  await prisma.resourceGroup.create({
    data: {
      resourceGroupName: resourceGroupName,
      location: location,
      projectName: projectName,
    },
  });

  return resourceGroup;
};

export const _createNetworkInterface = async (body: RequestBody) => {
  const { resourceGroupName, virtualNetworkName, publicIpName, location, networkInterfaceName } = body as DefaultProps &
    NetworkInterfaceProps;
  const subscriptionId = getSubscriptionId();
  const networkClient = new NetworkManagementClient(getToken(), subscriptionId);
  const virtualNetwork = await networkClient.virtualNetworks.get(resourceGroupName, virtualNetworkName);
  const publicIPAddress = await networkClient.publicIPAddresses.get(resourceGroupName, publicIpName);

  const networkInterface = await createNetworkInterface(
    networkClient,
    location,
    resourceGroupName,
    networkInterfaceName,
    virtualNetwork,
    publicIPAddress
  );

  await prisma.networkInterface.create({
    data: {
      networkInterfaceName: networkInterfaceName,
      location: location,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      publicIpName: publicIpName,
    },
  });

  return networkInterface;
};

export const _createPublicIpAddress = async (body: RequestBody) => {
  const { resourceGroupName, publicIpName, location } = body as DefaultProps & PublicIpProps;
  const subscriptionId = getSubscriptionId();
  const networkClient = new NetworkManagementClient(getToken(), subscriptionId);
  const publicIp = await createPublicIpAddress(networkClient, location, resourceGroupName, publicIpName);

  await prisma.publicIpAddress.create({
    data: {
      publicIpName: publicIpName,
      location: location,
      resourceGroupName: resourceGroupName,
    },
  });

  return publicIp;
};

export const _getPublicIpAddress = async (body: RequestBody) => {
  const { resourceGroupName, publicIpName } = body as DefaultProps & PublicIpProps;
  const subscriptionId = getSubscriptionId();
  const networkClient = new NetworkManagementClient(getToken(), subscriptionId);
  const publicIPAddress = await networkClient.publicIPAddresses.get(resourceGroupName, publicIpName);

  return publicIPAddress;
};

export const _createStorageAccount = async (body: RequestBody) => {
  const { resourceGroupName, storageAccountName, accType, location, projectName } = body as DefaultProps &
    StorageAccountProps;
  const subscriptionId = getSubscriptionId();
  const storageClient = new StorageManagementClient(getToken(), subscriptionId);
  const accountInfo = await createStorageAccount(
    storageAccountName,
    location,
    accType,
    storageClient,
    resourceGroupName,
    projectName
  );

  await prisma.storageAccount.create({
    data: {
      storageAccountName: storageAccountName,
      location: location,
      resourceGroupName: resourceGroupName,
      accType: accType,
      projectName: projectName,
    },
  });

  return accountInfo;
};

export const _createVirtualMachine = async (body: RequestBody) => {
  const { resourceGroupName, virtualMachineName, networkInterfaceName, location, username, password, diskName } =
    body as DefaultProps & VirtualMachineProps;
  const subscriptionId = getSubscriptionId();
  const computeClient = new ComputeManagementClient(getToken(), subscriptionId);
  const networkClient = new NetworkManagementClient(getToken(), subscriptionId);

  const networkInterface = await networkClient.networkInterfaces.get(resourceGroupName, networkInterfaceName);

  await prisma.virtualMachine.create({
    data: {
      virtualMachineName: virtualMachineName,
      location: location,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      username: username,
      password: password,
      diskName: diskName,
    },
  });

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
};

export const _getVirtualMachine = async (resourceGroupName: string, virtualMachineName: string) => {
  const subscriptionId = getSubscriptionId();
  const computeClient = new ComputeManagementClient(getToken(), subscriptionId);
  const virtualMachine = await computeClient.virtualMachines.get(resourceGroupName, virtualMachineName);

  return virtualMachine;
};
export const _createVirtualNetwork = async (body: RequestBody) => {
  const { resourceGroupName, virtualNetworkName, location } = body as DefaultProps & VirtualNetworkProps;
  const subscriptionId = getSubscriptionId();
  const networkClient = new NetworkManagementClient(getToken(), subscriptionId);
  const virtualNetwork = await createVirtualNetwork(networkClient, location, resourceGroupName, virtualNetworkName);

  await prisma.virtualNetwork.create({
    data: {
      virtualNetworkName: virtualNetworkName,
      location: location,
      resourceGroupName: resourceGroupName,
    },
  });

  return virtualNetwork;
};
