import { ReactNode } from "react";

interface ListNameForm {
  children?: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}

export default function ListNameForm({
  children,
  onChange,
  onSubmit,
  value,
}: ListNameForm) {
  return (
    <form className="flex w-1/3 flex-col items-center" onSubmit={onSubmit}>
      <input
        className="m-1 rounded p-1"
        type="text"
        placeholder="name"
        name="name"
        onChange={onChange}
        value={value}
      />
      <button
        className="rounded-lg bg-slate-700 p-2 text-gray-300 transition duration-200 hover:bg-slate-500"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
