"use client";

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

import { FunctionComponent, useContext, useState } from "react";

interface CreateRessourceFormProps {}

const CreateRessourceForm: FunctionComponent<CreateRessourceFormProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<Partial<UseCustomQueryProps>>({});
  const { ressources, currentStep, setCurrentStep } = useContext(RessourceContext);

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
          id={0}
          label={"Create Resource Group"}
          validationSchema={ressourceGroupValidationSchema}
          initialValues={ressourceGroupInitialValues}
          formValues={formValues}
          setFormValues={setFormValues}
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
          id={1}
          label={"Create Storage Account"}
          validationSchema={storageAccountValidationSchema}
          initialValues={storageAccountInitialValues}
          formValues={formValues}
          setFormValues={setFormValues}
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
          id={2}
          label={"Create Virtual Network"}
          validationSchema={virtualNetworkValidationSchema}
          initialValues={virtualNetworkInitialValues}
          formValues={formValues}
          setFormValues={setFormValues}
        >
          <FormField name="virtualNetworkName" htmlfor="projectName" disabled={loading || currentStep > 3}>
            Virtual Network Name
          </FormField>
        </StepComponent>
      )}
      {currentStep >= 4 && (
        <StepComponent
          id={3}
          label={"Create Public Ip Address"}
          validationSchema={publicIpAdressValidationSchema}
          initialValues={publicIpAdressInitialValues}
          formValues={formValues}
          setFormValues={setFormValues}
        >
          <FormField name="publicIpName" htmlfor="publicIpName" disabled={loading || currentStep > 4}>
            Public Ip Adress Name
          </FormField>
        </StepComponent>
      )}
      {currentStep >= 5 && (
        <StepComponent
          id={4}
          label={"Create Network Interface"}
          validationSchema={networkInterfaceValidationSchema}
          initialValues={networkInterfaceInitialValues}
          formValues={formValues}
          setFormValues={setFormValues}
        >
          <FormField name="networkInterfaceName" htmlfor="networkInterfaceName" disabled={loading || currentStep > 5}>
            Network Interface Name
          </FormField>
        </StepComponent>
      )}
      {/* Repeat this pattern for the other steps */}
      {currentStep >= 6 && (
        <StepComponent
          id={5}
          label={"Create Network Interface"}
          validationSchema={virtualMachineValidationSchema}
          initialValues={virtualMachineInitialValues}
          formValues={formValues}
          setFormValues={setFormValues}
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
