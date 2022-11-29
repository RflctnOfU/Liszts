import { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface CardListItem {
  children?: ReactNode;
  onClick: React.MouseEventHandler<SVGElement>;
}

export default function CardListItem({
  children,
  onClick,
  ...rest
}: CardListItem) {
  return (
    <div className="my-1 flex justify-between rounded-md border border-gray-400 bg-gradient-to-br from-blue-700 to-sky-600 p-2 shadow-md">
      <li className="text-slate-300">{children}</li>
      <FaTimes
        className="text-red-600 hover:cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
}
