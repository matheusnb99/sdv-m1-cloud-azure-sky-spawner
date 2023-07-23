import Vm from "@/components/Vm";
import instance from "@/lib/utils/instance";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";

interface VmListProps {}

const VmList: FunctionComponent<VmListProps> = () => {
  const vmData = {
    id: "/subscriptions/dca7b940-e834-46fe-94d6-1dfae14c97d3/resourceGroups/RESSOURCEGROUP0623190716/providers/Microsoft.Compute/virtualMachines/machine0623190716",
    username: "User1",
    password: "password1",
    ip: "192.168.1.1",
    os: "Ubuntu",
    status: "running",
    price: "20",
  };

  const { data, isLoading, error } = useQuery(
    ["vmList"],
    async () => {
      return await instance.get(`/virtual-machines`).then((res) => {
        console.log(res.data.status);

        return res.data.status;
      });
    },
    {
      staleTime: 1000 * 10, // 10 seconds
    }
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error</>;
  }

  return (
    <>
      {data.map((vm: any) => {
        return (
          <Vm
            key={vm.vmId}
            vmData={{
              username: "User1",
              password: "password1",
              ip: "192.168.1.1",
              os: "Ubuntu",
              status: vm.status[1].displayStatus,
              price: "20",
            }}
          />
        );
      })}
    </>
  );
};

export default VmList;
