import {
  networkInterfaceInitialValues,
  networkInterfaceValidationSchema,
  publicIpAdressInitialValues,
  publicIpAdressValidationSchema,
  ressourceGroupInitialValues,
  ressourceGroupValidationSchema,
  storageAccountInitialValues,
  storageAccountValidationSchema,
  virtualMachineInitialValues,
  virtualMachineValidationSchema,
  virtualNetworkInitialValues,
  virtualNetworkValidationSchema,
} from "@/lib/form/formInformation";

export const stepConfigurations = [
  {
    id: 0,
    label: "Create Resource Group",
    validationSchema: ressourceGroupValidationSchema,
    initialValues: ressourceGroupInitialValues,
    fields: [
      { name: "projectName", label: "Project Name" },
      { name: "location", label: "Location" },
      { name: "resourceGroupName", label: "Resource Group Name" },
    ],
  },
  {
    id: 1,
    label: "Create Storage Account",
    validationSchema: storageAccountValidationSchema,
    initialValues: storageAccountInitialValues,
    fields: [
      { name: "storageAccountName", label: "Storage Account Name" },
      { name: "accType", label: "Account Type" },
    ],
  },
  {
    id: 2,
    label: "Create Virtual Network",
    validationSchema: virtualNetworkValidationSchema,
    initialValues: virtualNetworkInitialValues,
    fields: [{ name: "virtualNetworkName", label: "Virtual Network Name" }],
  },
  {
    id: 3,
    label: "Create Public Ip Address",
    validationSchema: publicIpAdressValidationSchema,
    initialValues: publicIpAdressInitialValues,
    fields: [{ name: "publicIpName", label: "Public Ip Address Name" }],
  },
  {
    id: 4,
    label: "Create Network Interface",
    validationSchema: networkInterfaceValidationSchema,
    initialValues: networkInterfaceInitialValues,
    fields: [{ name: "networkInterfaceName", label: "Network Interface Name" }],
  },
  {
    id: 5,
    label: "Create Virtual Machine",
    validationSchema: virtualMachineValidationSchema,
    initialValues: virtualMachineInitialValues,
    fields: [
      { name: "virtualMachineName", label: "Virtual Machine Name" },
      { name: "username", label: "Username" },
      { name: "password", label: "Password" },
      { name: "diskName", label: "Disk Name" },
    ],
  },
];
