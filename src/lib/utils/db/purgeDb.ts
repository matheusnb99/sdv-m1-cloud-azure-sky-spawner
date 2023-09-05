import { prisma } from "@/lib/utils/prisma";

const purgeDb = async (resourceGroupName: string, virtualMachineName: string) => {
  console.log("purgeDb");
  try {
    const vm = await prisma.virtualMachine.findFirst({
      where: {
        virtualMachineName: virtualMachineName,
      },
    });

    if (vm) {
      await prisma.virtualMachine.delete({
        where: {
          id: vm.id,
        },
      });
    }
    const ni = await prisma.networkInterface.findFirst({
      where: {
        resourceGroupName: resourceGroupName,
      },
    });

    if (ni) {
      await prisma.networkInterface.delete({
        where: {
          id: ni.id,
        },
      });
    }

    const pip = await prisma.publicIpAddress.findFirst({
      where: {
        resourceGroupName: resourceGroupName,
      },
    });

    if (pip) {
      await prisma.publicIpAddress.delete({
        where: {
          id: pip.id,
        },
      });
    }

    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error(error);
  }
};

export default purgeDb;
