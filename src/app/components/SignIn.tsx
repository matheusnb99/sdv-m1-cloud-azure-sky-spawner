"use client";

import Form from "@/app/components/Form";
import Button from "@/app/core/Button";
import FormField from "@/app/core/FormField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  // email: Yup.string().email("Invalid email").required("Required"),
  // password: Yup.string()
  //   .required("No password provided.")
  //   .min(8, "Password is too short - should be 8 chars minimum.")
  //   .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    // login("JWT");
    router.push("/");
  };

  return (
    <div className="w-full rounded-md max-w-lg m-auto py-10 mt-10 px-10 border">
      <Form handleFormSubmit={handleSubmit} signupSchema={SignupSchema}>
        <FormField name="email" type="email" label="E-mail" read={loading} />
        <FormField name="password" type="password" label="Password" read={loading} />
        <Button
          customClassName="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;
