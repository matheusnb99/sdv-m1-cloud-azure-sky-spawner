"use client";
import { Formik } from "formik";
// import useUser from "@/hooks/useUser";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  handleFormSubmit: (args: any) => void;
  validationSchema: any;
  initialValues: any;
};

const Form: React.FC<Props> = ({ children, handleFormSubmit, validationSchema, initialValues }) => {
  const [error, setError] = useState(false);

  return (
    <Formik initialValues={initialValues} onSubmit={handleFormSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error ? <p className="bg-red-600 text-white font-bold px-4 py-2">{error}</p> : null}
          {children}
        </form>
      )}
    </Formik>
  );
};

export default Form;
