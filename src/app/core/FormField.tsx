import { Field } from "formik";
import React from "react";
import Input from "./Input";

type Props = {
  children: React.ReactNode;
  className?: string;
  htmlfor: string;
  as?: React.ElementType;
  name: string;
  read: boolean;
  otherprops?: any;
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
  const { children, className, htmlfor, as: Component = Input, read = "false", ...otherProps } = props;

  return (
    <Field {...otherProps}>
      {({ field, meta: { touched, error } }: FieldProps) => (
        <div className={className}>
          <label data-htmlfor={htmlfor} className="block flex items-center justify-between">
            {children}
            <Component
              className={`${
                read ? "bg-gray-500 text-gray-300" : ""
              } border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  bg-gray-600 border-gray-500 placeholder-gray-400 text-white`}
              read={read}
              {...field}
              {...otherProps}
            />
          </label>
          {touched && error ? <p className="block text-red-500 p-2 text-sm ml-100">{error}</p> : null}
        </div>
      )}
    </Field>
  );
};
export default FormField;
