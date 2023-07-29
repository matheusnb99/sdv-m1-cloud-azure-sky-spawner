import VirtualMachineList from "@/components/VirtualMachineList";
import { FunctionComponent } from "react";

interface ApplicationProps {}

const Application: FunctionComponent<ApplicationProps> = () => {
  return (
    <main>
      <h1 className="text-6xl font-bold text-center text-red-600">Creation de VM</h1>

      <VirtualMachineList />
    </main>
  );
};

export default Application;
