import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export default function Card({ children, ...rest }: CardProps) {
  return (
    <div className="gap[10px] flex h-1/3 w-1/3 flex-col rounded-lg border border-solid border-slate-300 bg-gradient-to-br from-blue-700 to-sky-700 shadow-lg">
      {children}
    </div>
  );
}
