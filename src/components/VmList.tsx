import Vm from "@/components/Vm";
import { RessourceContext } from "@/context/RessourceContext";
import { UserContext } from "@/context/UserContext";
import Button from "@/core/Button";
import useTimer from "@/lib/hooks/useTimer";
import instance from "@/lib/utils/instance";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, useContext } from "react";

interface VmListProps {
  setPopup: (value: boolean) => void;
}

const VmList: FunctionComponent<VmListProps> = ({ setPopup }) => {
  const { lapse, setLapse, running, setRunning, clear } = useTimer();
  const { user } = useContext(UserContext);
  const { ressources } = useContext(RessourceContext);

  console.log(ressources);

  const { data, isLoading, error } = useQuery(
    ["vmList"],
    async () => {
      return await instance.get(`/virtual-machines`).then((res) => {
        console.log(res.data.status);

        setRunning(true);

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

  if (data.length === 0) {
    if (user) {
      if (user.credits === 0) {
        return <>You don&apos;t have any credits!</>;
      }

      return (
        <>
          Currently you don&apos;t have any vms!
          <Button
            type="button"
            onClick={() => {
              setPopup(true);
            }}
          >
            Create One!
          </Button>
        </>
      );
    } else {
      return <>You need to login to create a vm!</>;
    }
  }

  if (!ressources) {
    return <>Error</>;
  }

  return (
    <>
      {data.map((vm: any, index: number) => {
        console.log(ressources[index]);
        return (
          <>
            <Vm
              key={vm.vmId}
              vmData={{
                username: ressources[index].username,
                password: ressources[index].password,
                ip: "192.168.1.1",
                os: "Ubuntu",
                status: vm.status[1].displayStatus,
                price: "20",
              }}
              lapse={lapse}
            />
          </>
        );
      })}
      <Button
        type="button"
        onClick={() => {
          setPopup(true);
        }}
      >
        Create Another!
      </Button>
    </>
  );
};

export default VmList;
