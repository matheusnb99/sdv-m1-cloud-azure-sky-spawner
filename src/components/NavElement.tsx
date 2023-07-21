import { FunctionComponent } from "react";

interface NavElementProps {
  label: string;
  variant: "default" | "primary";
}

const variantClasses = {
  default:
    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white",
  primary:
    "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700",
};

const NavElement: FunctionComponent<NavElementProps> = ({ label, variant }) => {
  return (
    <li>
      <a href="#" className={variantClasses[variant]}>
        {label}
      </a>
    </li>
  );
};

export default NavElement;
