type RequestBody = DefaultProps &
  (
    | RessourceGroupProps
    | StorageAccountProps
    | VirtualNetworkProps
    | PublicIpProps
    | NetworkInterfaceProps
    | VirtualMachineProps
  );

type UseCustomQueryProps = DefaultProps &
  (
    | ({ path: "ressource-groups" } & RessourceGroupProps)
    | ({ path: "storage-account" } & StorageAccountProps)
    | ({ path: "virtual-network" } & VirtualNetworkProps)
    | ({ path: "public-ip" } & PublicIpProps)
    | ({ path: "network-interface" } & NetworkInterfaceProps)
    | ({ path: "virtual-machines" } & VirtualMachineProps)
  );

type DefaultProps = {
  resourceGroupName: string;
  location: string;
};

type RessourceGroupProps = {
  projectName: string;
};

type StorageAccountProps = {
  projectName: string;
  storageAccountName: string;
  accType: string;
};

type VirtualNetworkProps = {
  virtualNetworkName: string;
};

type PublicIpProps = {
  publicIpName: string;
};

type NetworkInterfaceProps = {
  networkInterfaceName: string;
  virtualNetworkName: string;
  publicIpName: string;
};

type VirtualMachineProps = {
  virtualMachineName: string;
  networkInterfaceName: string;
};

type PathType =
  | "ressource-groups"
  | "storage-account"
  | "virtual-network"
  | "public-ip"
  | "network-interface"
  | "virtual-machines";
