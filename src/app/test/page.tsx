"use client";

import CreateRessourceForm from "@/components/CreateRessourceForm";

const Page = () => {
  const vmData = {
    username: "User1",
    password: "password1",
    ip: "192.168.1.1",
    os: "Ubuntu",
    status: "running",
    price: "20",
  };

  const resourceGroupName = "myResourceGroupName";
  const location = "myLocation";

  // const body = useCustomQuery({
  //   path: "virtual-machines", // one of the paths you have specified in the hook
  //   resourceGroupName,
  //   location,
  //   virtualMachineName: "myVirtualMachine", // needs to be provided if path is "virtual-machines"
  //   networkInterfaceName: "myNetworkInterface", // needs to be provided if path is "virtual-machines" or "network-interface"
  // });

  // useEffect(() => {
  //   console.log(body); // body is the return value from the hook
  // }, [body]);

  return (
    <>
      <CreateRessourceForm />
      {/* <Vm vmData={vmData} />;
      <Vm vmData={vmData} />; */}
    </>
  );
};

export default Page;
