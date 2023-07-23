import * as Yup from "yup";

function getNameSuffix(): string {
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

const nameSuffix = getNameSuffix();

export const ressourceGroupValidationSchema = Yup.object().shape({
  projectName: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  resourceGroupName: Yup.string().required("Required"),
});
export const ressourceGroupInitialValues = {
  projectName: "projectName" + nameSuffix,
  location: "eastus",
  resourceGroupName: "ressourceGroup" + nameSuffix,
};

export const storageAccountValidationSchema = Yup.object().shape({
  storageAccountName: Yup.string().required("Required").min(3, "Too Short!").max(24, "Too Long!"),
  accType: Yup.string().required("Required"),
});
export const storageAccountInitialValues = {
  storageAccountName: "storage" + nameSuffix,
  accType: "Standard_LRS",
};

export const virtualNetworkValidationSchema = Yup.object().shape({
  virtualNetworkName: Yup.string().required("Required"),
});
export const virtualNetworkInitialValues = {
  virtualNetworkName: "network" + nameSuffix,
};

export const publicIpAdressValidationSchema = Yup.object().shape({
  publicIpName: Yup.string().required("Required"),
});
export const publicIpAdressInitialValues = {
  publicIpName: "ip" + nameSuffix,
};

export const networkInterfaceValidationSchema = Yup.object().shape({
  networkInterfaceName: Yup.string().required("Required"),
});
export const networkInterfaceInitialValues = {
  networkInterfaceName: "interface" + nameSuffix,
};

export const virtualMachineValidationSchema = Yup.object().shape({
  virtualMachineName: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  diskName: Yup.string().required("Required"),
});

export const virtualMachineInitialValues = {
  virtualMachineName: "machine" + nameSuffix,
  username: "azureuser",
  password: "Azure123456!",
  diskName: "disk" + nameSuffix,
};
