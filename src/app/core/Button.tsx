import classNames from "classnames";

const variants = {
  primary: "bg-blue-500 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold rounded",
  secondary: "bg-green-400",
};
const sizes = {
  sm: "px-2 py-1",
  md: "px-3 py-1.5",
  lg: "px-5 py-2.5",
};
type Props = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  customClassName?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button: React.FC<Props> = (props) => {
  const { variant = "primary", size = "md", customClassName, children, ...otherprops } = props;

  return (
    <button {...otherprops} className={classNames(variants[variant], sizes[size], customClassName)}>
      {children}
    </button>
  );
};

export default Button;
