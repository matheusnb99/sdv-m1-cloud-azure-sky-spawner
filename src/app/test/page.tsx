"use client";

import CreateRessourceForm from "@/components/CreateRessourceForm";
import { useState } from "react";
import * as Yup from "yup";

const testVal = Yup.object().shape({
  projectName: Yup.string().required("Required"),
});

const Page = () => {
  const resourceGroupName = "myResourceGroupName";
  const location = "myLocation";

  // const body = useCustomQuery({
  //   path: "virtual-machines", // one of the paths you have specified in the hook
  //   resourceGroupName,
  //   location,
  //   virtualMachineName: "myVirtualMachine", // needs to be provided if path is "virtual-machines"
  //   networkInterfaceName: "myNetworkInterface", // needs to be provided if path is "virtual-machines" or "network-interface"
  // });

  // useEffect(() => {
  //   console.log(body); // body is the return value from the hook
  // }, [body]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (values: any) => {
    setIsSubmitted(true);
    console.log(values);
  };

  return (
    <>
      {/* <Form handleFormSubmit={handleSubmit} validationSchema={testVal} initialValues={{ projectName: "" }}>
        <FormField name="projectName" htmlfor="projectName" disabled={isSubmitted}>
          Project Name
        </FormField>
        <Button
          customClassName="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Create
        </Button>
      </Form> */}
      <CreateRessourceForm />
      {/* <Vm vmData={vmData} />;
      <Vm vmData={vmData} />; */}
    </>
  );
};

export default Page;
