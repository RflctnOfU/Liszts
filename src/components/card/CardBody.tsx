import { ReactNode } from "react";
import DangerButton from "../button/DangerButton";

interface CardBody {
  children?: ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  value: string;
}

export default function CardBody({
  children,
  onChange,
  onClick,
  value,
}: CardBody) {
  return (
    <>
      <div className="m-2 gap-2 rounded-md border border-slate-300 bg-gradient-to-br from-slate-500 to-slate-300 p-2 text-lg shadow-md">
        <ul>{children}</ul>
      </div>
      <div className="m-2 flex justify-between rounded-md border border-slate-300 bg-gradient-to-br from-blue-700 to-sky-600 shadow-md">
        <input
          className="m-2 rounded-md border border-slate-300 pl-2"
          onChange={onChange}
          placeholder="item name here"
          value={value}
        ></input>
        <DangerButton onClick={onClick}>Add Item</DangerButton>
      </div>
    </>
  );
}
