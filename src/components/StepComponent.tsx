import Form from "@/components/Form";
import { AuthContext } from "@/context/AuthContext";
import Button from "@/core/Button";
import instance from "@/lib/utils/instance";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, ReactNode, useContext, useState } from "react";

interface StepComponentProps {
  label: string;
  children: ReactNode;
  path: string;
  validationSchema: any;
  initialValues: any;
  setStep: (step: any) => void;
}

const StepComponent: FunctionComponent<StepComponentProps> = ({
  label,
  setStep,
  path,
  validationSchema,
  initialValues,
  children,
}) => {
  const [formValue, setFormValue] = useState<any>(null);
  const { jwt } = useContext(AuthContext);

  const nextStep = () => {
    if (error) {
      return;
    }
    setStep((currentStep: number) => currentStep + 1);
  };

  const previousStep = () => {
    setStep((currentStep: number) => currentStep - 1);
  };

  const handleFormSubmit = (values: any) => {
    console.log("Form submitted");
    nextStep();
    setFormValue(values);
    console.log(values);
  };

  // useQuery
  const { data, error } = useQuery(
    ["sendData", formValue],
    async () =>
      await instance.post(path, {
        // jwt
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
        body: formValue,
      }),
    {
      enabled: !!formValue,
      staleTime: 1000 * 10, // 10 seconds
    }
  );

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
  }

  return (
    <div>
      <label>{label}</label>
      <Form handleFormSubmit={handleFormSubmit} validationSchema={validationSchema} initialValues={initialValues}>
        {children}
        <Button
          customClassName="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Create
        </Button>
      </Form>
      <button onClick={previousStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Previous
      </button>
      <button onClick={nextStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Next
      </button>
    </div>
  );
};

export default StepComponent;
