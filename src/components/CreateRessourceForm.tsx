"use client";

import StepComponent from "@/components/StepComponent";
import { RessourceContext } from "@/context/RessourceContext";
import FormField from "@/core/FormField";
import { stepConfigurations } from "@/lib/form/stepConfigurations";

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
      {stepConfigurations.map(
        (step, index) =>
          currentStep >= index + 1 && (
            <StepComponent
              key={step.id}
              id={step.id}
              label={step.label}
              validationSchema={step.validationSchema}
              initialValues={step.initialValues}
              formValues={formValues}
              setFormValues={setFormValues}
            >
              {step.fields.map((field) => (
                <FormField
                  key={field.name}
                  name={field.name}
                  htmlfor={field.name}
                  disabled={loading || currentStep > index + 1}
                >
                  {field.label}
                </FormField>
              ))}
            </StepComponent>
          )
      )}
    </div>
  );
};

export default CreateRessourceForm;
