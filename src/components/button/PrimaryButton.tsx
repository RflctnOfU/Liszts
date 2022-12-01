import { ReactNode } from "react";
import Button from ".";

interface Props {
  children?: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function PrimaryButton({ children, ...rest }: Props) {
  return (
    <Button
      {...rest}
      className="bg-gradient-to-br from-blue-500 to-indigo-500 text-slate-300 shadow-md"
    >
      {children}
    </Button>
  );
}
