import { AuthContext } from "@/context/AuthContext";
import { useCallback, useContext } from "react";

const useCustomQuery = () => {
  const { jwt } = useContext(AuthContext);

  const getBody: (formValues: UseCustomQueryProps) => RequestBody = useCallback((formValues) => {
    let body: RequestBody;
    if (formValues.path === "ressource-groups") {
      body = {
        resourceGroupName: formValues.resourceGroupName,
        location: formValues.location,
        projectName: formValues.projectName as string,
      };
    } else if (formValues.path === "storage-account") {
      body = {
        resourceGroupName: formValues.resourceGroupName,
        location: formValues.location,
        projectName: formValues.projectName as string,
        storageAccountName: formValues.storageAccountName as string,
        accType: formValues.accType as string,
      };
    } else if (formValues.path === "virtual-network") {
      body = {
        resourceGroupName: formValues.resourceGroupName,
        location: formValues.location,
        virtualNetworkName: formValues.virtualNetworkName as string,
      };
    } else if (formValues.path === "public-ip") {
      body = {
        resourceGroupName: formValues.resourceGroupName,
        location: formValues.location,
        publicIpName: formValues.publicIpName as string,
      };
    } else if (formValues.path === "network-interface") {
      body = {
        resourceGroupName: formValues.resourceGroupName,
        location: formValues.location,
        networkInterfaceName: formValues.networkInterfaceName as string,
        virtualNetworkName: formValues.virtualNetworkName as string,
        publicIpName: formValues.publicIpName as string,
      };
    } else if (formValues.path === "virtual-machines") {
      body = {
        resourceGroupName: formValues.resourceGroupName,
        location: formValues.location,
        virtualMachineName: formValues.virtualMachineName as string,
        networkInterfaceName: formValues.networkInterfaceName as string,
      };
    } else {
      throw new Error("Invalid path");
    }

    return body;
  }, []);
  // useQuery
  // const { data, error } = useQuery(
  //   ["sendData", props],
  //   async () =>
  //     await instance.post(formValues.path, {
  //       // jwt
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: jwt,
  //       },
  //       body: formValue,
  //     }),
  //   {
  //     enabled: !!formValue,
  //     staleTime: 1000 * 10, // 10 seconds
  //   }
  // );

  return { getBody };
};

export default useCustomQuery;
