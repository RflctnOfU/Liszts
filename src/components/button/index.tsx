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
      className={`m-2 rounded-full px-1 py-2.5 text-sm font-medium uppercase leading-tight transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${className}`}
    >
      {children}
    </button>
  );
}
