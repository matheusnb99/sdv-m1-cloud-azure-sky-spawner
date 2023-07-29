"use client";

import Form from "@/components/Form";
import { RessourceContext } from "@/context/RessourceContext";
import Button from "@/core/Button";
import useCustomQuery from "@/lib/hooks/useCustomQuery";
import {
  _createNetworkInterface,
  _createPublicIpAddress,
  _createRessourceGroup,
  _createStorageAccount,
  _createVirtualMachine,
  _createVirtualNetwork,
} from "@/lib/serverfunctions/createAzureRessources";
import { FunctionComponent, ReactNode, useContext, useState } from "react";

interface StepComponentProps {
  id: number;
  label: string;
  children: ReactNode;
  validationSchema: any;
  initialValues: any;
  formValues: any;
  setFormValues: (args: any) => void;
}

const Steps = [
  "ressource-groups",
  "storage-account",
  "virtual-network",
  "public-ip",
  "network-interface",
  "virtual-machines",
];

const StepComponent: FunctionComponent<StepComponentProps> = ({
  id,
  label,
  validationSchema,
  initialValues,
  formValues,
  setFormValues,
  children,
}) => {
  const { getBody } = useCustomQuery();
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currentStep, setCurrentStep } = useContext(RessourceContext);

  const path = Steps[id] as PathType;

  const handleSubmit = async (values: RequestBody) => {
    setIsSent(true);
    setIsLoading(true);

    console.log(path);

    await setFormValues({ ...formValues, ...values, path });

    const body = getBody({ ...formValues, ...values, path } as UseCustomQueryProps);

    let res = null;

    switch (id) {
      case 0:
        res = await _createRessourceGroup(body);

        break;
      case 1:
        res = await _createStorageAccount(body);

        break;
      case 2:
        res = await _createVirtualNetwork(body);

        break;
      case 3:
        res = await _createPublicIpAddress(body);

        break;
      case 4:
        res = await _createNetworkInterface(body);

        break;
      case 5:
        res = await _createVirtualMachine(body);

        break;

      default:
        break;
    }
    if (res) {
      setIsSuccess(true);
      setCurrentStep(currentStep + 1);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <label>{label}</label>
      <Form handleFormSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
        {children}
        {!isSent && (
          <Button
            customClassName="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            Create
          </Button>
        )}
      </Form>

      {isLoading && <div> LOADING </div>}
      {isSent && <div>---------------------</div>}
    </div>
  );
};

export default StepComponent;
