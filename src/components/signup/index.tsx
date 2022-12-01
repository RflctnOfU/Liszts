import React, { ReactNode } from "react";

interface Signup {
  children?: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value1: string;
  value2: string;
  value3: string;
}

export default function Signup({
  children,
  onChange,
  onSubmit,
  value1,
  value2,
  value3,
}: Signup) {
  return (
    <form className="flex w-1/3 flex-col items-center" onSubmit={onSubmit}>
      <input
        className="m-1 rounded p-1"
        type="text"
        placeholder="name"
        name="name"
        onChange={onChange}
        value={value1}
      />
      <input
        className="m-1 rounded p-1"
        type="email"
        placeholder="email"
        name="email"
        onChange={onChange}
        value={value2}
      />
      <input
        className="m-1 rounded p-1"
        type="password"
        placeholder="password"
        name="password"
        onChange={onChange}
        value={value3}
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
