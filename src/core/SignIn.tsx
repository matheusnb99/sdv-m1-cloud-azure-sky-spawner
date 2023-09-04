"use client";

import Form from "@/components/Form";
import Button from "@/core/Button";
import FormField from "@/core/FormField";
import { setCookie } from "@/lib/utils/setCookie";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import * as Yup from "yup";

type handleFormSubmitType = {
  username: string;
  password: string;
};

const initialValues = {
  username: "",
  password: "",
};
const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isTransitionStarted, startTransition] = useTransition();

  const handleSubmit: (arg0: handleFormSubmitType) => void = async ({ username, password }) => {
    setLoading(true);

    console.log({ username, password });

    const res = await setCookie({ name: "account", username: username, password: password });

    console.log(res);
    startTransition(router.refresh);
  };

  return (
    <div className="w-full rounded-md max-w-lg m-auto py-10 mt-10 px-10 border">
      <Form handleFormSubmit={handleSubmit} validationSchema={SignupSchema} initialValues={initialValues}>
        <FormField name="username" label="Username" read={loading} htmlfor={""} />
        <FormField name="password" label="Password" read={loading} htmlfor="password" />
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
