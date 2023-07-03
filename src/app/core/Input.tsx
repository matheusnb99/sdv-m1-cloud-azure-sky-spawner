import classNames from "classnames";

type Props = {
  className?: string;
  otherprops?: any;
};

const Input: React.FC<Props> = (props) => {
  const { className, ...otherProps } = props;

  return <input {...otherProps} className={classNames("block mt-2 border-2 border-black-200 py-1 px-2", className)} />;
};
export default Input;
