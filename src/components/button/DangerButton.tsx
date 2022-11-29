import { ReactNode } from "react";
import Button from ".";

interface Props {
  children?: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function DangerButton({ children, ...rest }: Props) {
  return (
    <Button
      {...rest}
      className="bg-gradient-to-br from-rose-900 to-pink-600 text-slate-300 shadow-md"
    >
      {children}
    </Button>
  );
}
