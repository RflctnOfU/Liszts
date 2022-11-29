import { ReactNode } from "react";

interface CardHeader {
  children?: ReactNode;
}

export default function CardHeader({ children, ...rest }: CardHeader) {
  return (
    <div className="m-2 rounded-md border-2 bg-gradient-to-br from-slate-500 to-slate-300 p-2 text-center text-xl font-bold">
      <h2>{children}</h2>
    </div>
  );
}
