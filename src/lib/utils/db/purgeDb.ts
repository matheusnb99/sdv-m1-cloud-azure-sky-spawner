import { prisma } from "@/lib/utils/prisma";

const purgeDb = async (resourceGroupName: string) => {
  console.log("purgeDb");
  try {
    await prisma.virtualMachine.deleteMany({
      where: {
        resourceGroupName: resourceGroupName,
      },
    });
    // ResourceGroup, NetworkInterface, PublicIPAddress, VirtualNetwork, StorageAccount, VirtualMachine
    await prisma.resourceGroup.deleteMany({
      where: {
        resourceGroupName: resourceGroupName,
      },
    });
    await prisma.networkInterface.deleteMany({
      where: {
        resourceGroupName: resourceGroupName,
      },
    });
    await prisma.publicIpAddress.deleteMany({
      where: {
        resourceGroupName: resourceGroupName,
      },
    });
    await prisma.virtualNetwork.deleteMany({
      where: {
        resourceGroupName: resourceGroupName,
      },
    });
    await prisma.storageAccount.deleteMany({
      where: {
        resourceGroupName: resourceGroupName,
      },
    });
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error(error);
  }
};

export default purgeDb;
