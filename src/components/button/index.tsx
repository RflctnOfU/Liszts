import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className: string;
}

export default function Button({ children, className, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`m-2 rounded-lg px-3 py-2.5 text-lg font-medium uppercase leading-tight shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${className}`}
    >
      {children}
    </button>
  );
}
