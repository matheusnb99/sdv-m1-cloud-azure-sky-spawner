import Form from "@/components/Form";
import Button from "@/core/Button";
import { FunctionComponent, ReactNode, useState } from "react";

interface StepComponentProps {
  label: string;
  children: ReactNode;
  validationSchema: any;
  initialValues: any;
  isLoading: boolean;
  handleFormSubmit: (values: RequestBody) => void; // new prop
}

const StepComponent: FunctionComponent<StepComponentProps> = ({
  label,
  validationSchema,
  initialValues,
  handleFormSubmit,
  isLoading,
  children,
}) => {
  const [isSent, setIsSent] = useState<boolean>(false);

  const handleSubmit = (values: RequestBody) => {
    setIsSent(true);
    handleFormSubmit(values);
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
