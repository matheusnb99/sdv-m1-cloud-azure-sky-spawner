"use client";
import { Field } from "formik";
import React from "react";
import Input from "./Input";

type Props = {
  children?: React.ReactNode;
  customClassName?: string;
  htmlfor: string;
  as?: React.ElementType;
  name: string;
  label?: string;
  read?: boolean;
  disabled?: boolean;
  otherprops?: React.InputHTMLAttributes<HTMLInputElement>;
};

interface FieldProps {
  field: {
    name: string;
    value: any;
    onChange: (event: React.ChangeEvent<any>) => void;
    onBlur: (event: React.FocusEvent<any>) => void;
  };
  form: {
    touched: { [field: string]: boolean };
    errors: { [field: string]: string };
  };
  meta: {
    error?: string;
    touched?: boolean;
  };
}

const FormField: React.FC<Props> = (props) => {
  const {
    children,
    customClassName,
    htmlfor,
    label,
    disabled,
    as: Component = Input,
    read = "false",
    ...otherprops
  } = props;

  return (
    <Field {...otherprops}>
      {({ field, meta: { touched, error } }: FieldProps) => (
        <div className={customClassName}>
          <label data-htmlfor={htmlfor} className="flex items-center justify-between">
            {children}
            <Component
              disabled={disabled}
              customClassName={`${
                read ? "bg-gray-500 text-black" : "text-black"
              } border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  bg-gray-600 border-gray-500 placeholder-gray-400 input-black`}
              read={read.toString()}
              {...field}
            />
          </label>
          {touched && error ? <p className="block text-red-500 p-2 text-sm ml-100">{error}</p> : null}
        </div>
      )}
    </Field>
  );
};
export default FormField;
