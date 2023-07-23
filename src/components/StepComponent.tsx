import Form from "@/components/Form";
import { AuthContext } from "@/context/AuthContext";
import Button from "@/core/Button";
import { FunctionComponent, ReactNode, useContext, useState } from "react";

interface StepComponentProps {
  label: string;
  children: ReactNode;
  validationSchema: any;
  initialValues: any;
  setCurrentStep: (step: any) => void;
  handleFormSubmit: (values: RequestBody) => void; // new prop
}

const StepComponent: FunctionComponent<StepComponentProps> = ({
  label,
  setCurrentStep,
  validationSchema,
  initialValues,
  handleFormSubmit,
  children,
}) => {
  const [formValues, setFormValues] = useState<Partial<RequestBody>>({});
  const { jwt } = useContext(AuthContext);

  const nextStep = () => {
    // if (error) {
    //   return;
    // }
    setCurrentStep((currentStep: number) => currentStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((currentStep: number) => currentStep - 1);
  };

  // // useQuery
  // const { data, error } = useQuery(
  //   ["sendData", formValue],
  //   async () =>
  //     await instance.post(path, {
  //       // jwt
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: jwt,
  //       },
  //       body: formValue,
  //     }),
  //   {
  //     enabled: !!formValue,
  //     staleTime: 1000 * 10, // 10 seconds
  //   }
  // );

  // if (error) {
  //   console.log(error);
  // }

  // if (data) {
  //   console.log(data);
  // }

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
