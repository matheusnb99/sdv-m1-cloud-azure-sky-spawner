import StepComponent from "@/components/StepComponent";
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
  virtualNetworkInitialValues,
  virtualNetworkValidationSchema,
} from "@/lib/form/formInformation";
import useCustomQuery from "@/lib/hooks/useCustomQuery";

import { FunctionComponent, useEffect, useState } from "react";

interface CreateRessourceFormProps {}

const Steps = [
  "ressource-groups",
  "storage-account",
  "virtual-network",
  "public-ip",
  "network-interface",
  "virtual-machines",
];

const CreateRessourceForm: FunctionComponent<CreateRessourceFormProps> = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<Partial<UseCustomQueryProps>>({}); // new state for form values
  const [bodyValues, setBodyValues] = useState<Partial<RequestBody>>({});

  const { getBody } = useCustomQuery();

  const nextStep = () => {
    setCurrentStep((currentStep) => currentStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };

  const skipToLastStep = () => {
    setCurrentStep(6);
  };

  const handleFormSubmit = async (values: RequestBody) => {
    await setFormValues((prevValues) => {
      const path = Steps[currentStep - 1] as PathType;

      return { ...prevValues, ...values, path };
    });
    setCurrentStep((prevStep) => prevStep + 1);

    // const body = getBody({ ...values, path } as UseCustomQueryProps);
    // console.log(body);
  };

  useEffect(() => {
    if (formValues && Object.keys(formValues).length === 0 && formValues.constructor === Object) {
      return;
    }
    const body = getBody({ ...formValues } as UseCustomQueryProps);
    console.log(body);
  }, [formValues, getBody]);

  useEffect(() => {
    let requestBody: UseCustomQueryProps;

    // switch (path) {
    //   case "ressource-groups":
    //     requestBody = {
    //       resourceGroupName: formValues.resourceGroupName as string,
    //       location: formValues.location as string,
    //       path: path,
    //       projectName: formValues.projectName as string,
    //     };
    //     break;
    //   case "storage-account":
    //     requestBody = {
    //       resourceGroupName: formValues.resourceGroupName as string,
    //       location: formValues.location as string,
    //       path: path,
    //       projectName: formValues.projectName as string,
    //       storageAccountName: formValues.storageAccountName as string,
    //       accType: formValues.accType as string,
    //     };
    //     break;

    //   case "virtual-network":
    //     requestBody = {
    //       resourceGroupName: formValues.resourceGroupName as string,
    //       location: formValues.location as string,
    //       path: path,
    //       virtualNetworkName: formValues.virtualNetworkName as string,
    //     };
    //     break;
    //   case "public-ip":
    //     requestBody = {
    //       resourceGroupName: formValues.resourceGroupName as string,
    //       location: formValues.location as string,
    //       path: path,
    //       publicIpName: formValues.publicIpName as string,
    //     };
    //     break;
    //   case "network-interface":
    //     requestBody = {
    //       resourceGroupName: formValues.resourceGroupName as string,
    //       location: formValues.location as string,
    //       path: path,
    //       networkInterfaceName: formValues.networkInterfaceName as string,
    //       virtualNetworkName: formValues.virtualNetworkName as string,
    //       publicIpName: formValues.publicIpName as string,
    //     };
    //     break;
    //   case "virtual-machines":
    //     requestBody = {
    //       resourceGroupName: formValues.resourceGroupName as string,
    //       location: formValues.location as string,
    //       path: path,
    //       virtualMachineName: formValues.virtualMachineName as string,
    //       networkInterfaceName: formValues.networkInterfaceName as string,
    //     };
    //     break;
    // }

    // ... do something with the `body`
  }, [formValues]);

  return (
    <div className="w-full max-w-xs mx-auto mt-8">
      {currentStep >= 0 && (
        <div>
          <button
            onClick={skipToLastStep}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
          >
            Use already typed information
          </button>
          <button onClick={nextStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create new resources
          </button>
        </div>
      )}
      {currentStep >= 1 && (
        <StepComponent
          setCurrentStep={setCurrentStep}
          label={"Create Resource Group"}
          validationSchema={ressourceGroupValidationSchema}
          initialValues={ressourceGroupInitialValues}
          handleFormSubmit={handleFormSubmit}
        >
          <FormField name="projectName" read={loading} htmlfor="projectName">
            Project Name
          </FormField>
          <FormField name="location" read={loading} htmlfor="location">
            Location
          </FormField>
          <FormField name="resourceGroupName" read={loading} htmlfor="resourceGroupName">
            Resource Group Name
          </FormField>
        </StepComponent>
      )}
      {currentStep >= 2 && (
        <StepComponent
          setCurrentStep={setCurrentStep}
          label={"Create Storage Account"}
          validationSchema={storageAccountValidationSchema}
          initialValues={storageAccountInitialValues}
          handleFormSubmit={handleFormSubmit}
        >
          <FormField name="storageAccountName" read={loading} htmlfor="projectName">
            Storage Account Name
          </FormField>
          <FormField name="accType" read={loading} htmlfor="location">
            Account Type
          </FormField>
        </StepComponent>
      )}
      {currentStep >= 3 && (
        <StepComponent
          setCurrentStep={setCurrentStep}
          label={"Create Virtual Network"}
          validationSchema={virtualNetworkValidationSchema}
          initialValues={virtualNetworkInitialValues}
          handleFormSubmit={handleFormSubmit}
        >
          <FormField name="virtualNetworkName" read={loading} htmlfor="projectName">
            Virtual Network Name
          </FormField>
        </StepComponent>
      )}
      {currentStep >= 4 && (
        <StepComponent
          setCurrentStep={setCurrentStep}
          label={"Create Public Ip Address"}
          validationSchema={publicIpAdressValidationSchema}
          initialValues={publicIpAdressInitialValues}
          handleFormSubmit={handleFormSubmit}
        >
          <FormField name="publicIpName" read={loading} htmlfor="publicIpName">
            Public Ip Adress Name
          </FormField>
        </StepComponent>
      )}
      {currentStep >= 5 && (
        <StepComponent
          setCurrentStep={setCurrentStep}
          label={"Create Network Interface"}
          validationSchema={networkInterfaceValidationSchema}
          initialValues={networkInterfaceInitialValues}
          handleFormSubmit={handleFormSubmit}
        >
          <FormField name="networkInterfaceName" read={loading} htmlfor="networkInterfaceName">
            Network Interface Name
          </FormField>
        </StepComponent>
      )}
      {/* Repeat this pattern for the other steps */}
      {currentStep >= 6 && (
        <div>
          <label>Create a Virtual Machine</label>
          {/* Insert your form fields here */}
          <button
            onClick={previousStep}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateRessourceForm;
