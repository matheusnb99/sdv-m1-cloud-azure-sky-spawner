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

import { FunctionComponent, useState } from "react";

interface CreateRessourceFormProps {}

const CreateRessourceForm: FunctionComponent<CreateRessourceFormProps> = () => {
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const skipToLastStep = () => {
    setStep(6);
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-8">
      {step >= 0 && (
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
      {step >= 1 && (
        <StepComponent
          setStep={setStep}
          label={"Create Resource Group"}
          validationSchema={ressourceGroupValidationSchema}
          initialValues={ressourceGroupInitialValues}
          path="ressource-groups"
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
      {step >= 2 && (
        <StepComponent
          setStep={setStep}
          label={"Create Storage Account"}
          validationSchema={storageAccountValidationSchema}
          initialValues={storageAccountInitialValues}
          path="storage-account"
        >
          <FormField name="storageAccountName" read={loading} htmlfor="projectName">
            Storage Account Name
          </FormField>
          <FormField name="accType" read={loading} htmlfor="location">
            Account Type
          </FormField>
        </StepComponent>
      )}
      {step >= 3 && (
        <StepComponent
          setStep={setStep}
          label={"Create Virtual Network"}
          validationSchema={virtualNetworkValidationSchema}
          initialValues={virtualNetworkInitialValues}
          path="virtual-network"
        >
          <FormField name="virtualNetworkName" read={loading} htmlfor="projectName">
            Virtual Network Name
          </FormField>
        </StepComponent>
      )}
      {step >= 4 && (
        <StepComponent
          setStep={setStep}
          label={"Create Public Ip Address"}
          validationSchema={publicIpAdressValidationSchema}
          initialValues={publicIpAdressInitialValues}
          path="public-ip"
        >
          <FormField name="publicIpName" read={loading} htmlfor="publicIpName">
            Public Ip Adress Name
          </FormField>
        </StepComponent>
      )}
      {step >= 5 && (
        <StepComponent
          setStep={setStep}
          label={"Create Network Interface"}
          validationSchema={networkInterfaceValidationSchema}
          initialValues={networkInterfaceInitialValues}
          path="network-interface"
        >
          <FormField name="networkInterfaceName" read={loading} htmlfor="networkInterfaceName">
            Network Interface Name
          </FormField>
        </StepComponent>
      )}
      {/* Repeat this pattern for the other steps */}
      {step >= 6 && (
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
