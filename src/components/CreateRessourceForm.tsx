import StepComponent from "@/components/StepComponent";
import { RessourceContext } from "@/context/RessourceContext";
import FormField from "@/core/FormField";
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
import useCustomQuery from "@/lib/hooks/useCustomQuery";
import instance from "@/lib/utils/instance";
import { useQuery } from "@tanstack/react-query";

import { FunctionComponent, useContext, useState } from "react";

interface CreateRessourceFormProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const Steps = [
  "ressource-groups",
  "storage-account",
  "virtual-network",
  "public-ip",
  "network-interface",
  "virtual-machines",
];

const CreateRessourceForm: FunctionComponent<CreateRessourceFormProps> = ({ currentStep, setCurrentStep }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<Partial<UseCustomQueryProps>>({});
  const [run, setRun] = useState<boolean>(false);
  const { updateItem, ressources } = useContext(RessourceContext);

  const { getBody } = useCustomQuery();

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const skipToLastStep = () => {
    const tempRessources = ressources.find((item) => item.step > 3);
    if (tempRessources === undefined) {
      console.log("No ressources found");

      return;
    }
    setFormValues(tempRessources);

    if (tempRessources.step <= 4) {
      setCurrentStep(tempRessources.step);
      return;
    }
    setCurrentStep(4);
  };

  const path = Steps[currentStep - 1] as PathType;

  const handleFormSubmit = async (values: RequestBody) => {
    setRun(true);
    await setFormValues((prevValues) => {
      return { ...prevValues, ...values, path };
    });
  };

  const { data, error } = useQuery(
    ["sendData", formValues],
    async () => {
      const body = getBody({ ...formValues } as UseCustomQueryProps);

      console.log(body);

      if (!path) {
        return;
      }

      setLoading(true);

      return await instance
        .post(path, {
          body: body,
        })
        .then((res) => {
          setRun(false);
          setLoading(false);

          if (currentStep > 6) {
            console.log("Finished");
            updateItem({ id: ressources.length, step: currentStep, ...formValues });

            setFormValues({});
            setCurrentStep(0);
          }
          setCurrentStep(currentStep + 1);

          return res.data;
        })
        .catch((err) => {
          // setCurrentStep(currentStep - 1);
          console.log(err);
        });
    },
    {
      enabled: run,
      retry: false,
      staleTime: 1000 * 10, // 10 seconds
    }
  );

  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      {currentStep == 0 && (
        <div>
          {/* {ressources.length > 0 && (
            <button
              onClick={skipToLastStep}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
            >
              Use already typed information
            </button>
          )} */}
          <button onClick={nextStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create new resources
          </button>
        </div>
      )}
      {currentStep >= 1 && (
        <StepComponent
          label={"Create Resource Group"}
          validationSchema={ressourceGroupValidationSchema}
          initialValues={ressourceGroupInitialValues}
          handleFormSubmit={handleFormSubmit}
          isLoading={loading && currentStep == 1}
        >
          <FormField name="projectName" htmlfor="projectName" disabled={loading || currentStep > 1}>
            Project Name
          </FormField>
          <FormField name="location" htmlfor="location" disabled={loading || currentStep > 1}>
            Location
          </FormField>
          <FormField name="resourceGroupName" htmlfor="resourceGroupName" disabled={loading || currentStep > 1}>
            Resource Group Name
          </FormField>
        </StepComponent>
      )}
      {currentStep >= 2 && (
        <StepComponent
          label={"Create Storage Account"}
          validationSchema={storageAccountValidationSchema}
          initialValues={storageAccountInitialValues}
          handleFormSubmit={handleFormSubmit}
          isLoading={loading && currentStep == 2}
        >
          <FormField name="storageAccountName" htmlfor="projectName" disabled={loading || currentStep > 2}>
            Storage Account Name
          </FormField>
          <FormField name="accType" htmlfor="location" disabled={loading || currentStep > 2}>
            Account Type
          </FormField>
        </StepComponent>
      )}
      {currentStep >= 3 && (
        <StepComponent
          label={"Create Virtual Network"}
          validationSchema={virtualNetworkValidationSchema}
          initialValues={virtualNetworkInitialValues}
          handleFormSubmit={handleFormSubmit}
          isLoading={loading && currentStep == 3}
        >
          <FormField name="virtualNetworkName" htmlfor="projectName" disabled={loading || currentStep > 3}>
            Virtual Network Name
          </FormField>
        </StepComponent>
      )}
      {currentStep >= 4 && (
        <StepComponent
          label={"Create Public Ip Address"}
          validationSchema={publicIpAdressValidationSchema}
          initialValues={publicIpAdressInitialValues}
          handleFormSubmit={handleFormSubmit}
          isLoading={loading && currentStep == 4}
        >
          <FormField name="publicIpName" htmlfor="publicIpName" disabled={loading || currentStep > 4}>
            Public Ip Adress Name
          </FormField>
        </StepComponent>
      )}
      {currentStep >= 5 && (
        <StepComponent
          label={"Create Network Interface"}
          validationSchema={networkInterfaceValidationSchema}
          initialValues={networkInterfaceInitialValues}
          handleFormSubmit={handleFormSubmit}
          isLoading={loading && currentStep == 5}
        >
          <FormField name="networkInterfaceName" htmlfor="networkInterfaceName" disabled={loading || currentStep > 5}>
            Network Interface Name
          </FormField>
        </StepComponent>
      )}
      {/* Repeat this pattern for the other steps */}
      {currentStep >= 6 && (
        <StepComponent
          label={"Create Network Interface"}
          validationSchema={virtualMachineValidationSchema}
          initialValues={virtualMachineInitialValues}
          handleFormSubmit={handleFormSubmit}
          isLoading={loading && currentStep == 6}
        >
          <FormField name="virtualMachineName" htmlfor="virtualMachineName" disabled={loading || currentStep > 6}>
            Virtual Machine Name
          </FormField>
          <FormField name="username" htmlfor="username" disabled={loading || currentStep > 6}>
            Virtual Machine Name
          </FormField>
          <FormField name="password" htmlfor="password" disabled={loading || currentStep > 6}>
            Virtual Machine Name
          </FormField>
          <FormField name="diskName" htmlfor="diskName" disabled={loading || currentStep > 6}>
            Virtual Machine Name
          </FormField>
        </StepComponent>
      )}
    </div>
  );
};

export default CreateRessourceForm;
