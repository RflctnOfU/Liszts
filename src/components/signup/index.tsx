import React, { ReactNode } from "react";

interface Signup {
  children?: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Signup({ children, onChange, onSubmit }: Signup) {
  return (
    <form className="flex w-1/3 flex-col items-center" onSubmit={onSubmit}>
      <input
        className="m-1 rounded p-1"
        type="text"
        placeholder="name"
        name="name"
        onChange={onChange}
      />
      <input
        className="m-1 rounded p-1"
        type="email"
        placeholder="email"
        name="email"
        onChange={onChange}
      />
      <input
        className="m-1 rounded p-1"
        type="password"
        placeholder="password"
        name="password"
        onChange={onChange}
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
