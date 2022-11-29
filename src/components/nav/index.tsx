import { ReactNode } from "react";

interface Nav {
  children?: ReactNode;
}

export default function Nav({ children }: Nav) {
  return (
    <nav className="flex justify-between bg-gradient-to-br from-slate-700 to-slate-500">
      <div className="m-3 p-2 text-2xl text-slate-300">Logo</div>
      <h1 className="m-3 p-2 text-center text-3xl text-slate-300">Liszts!</h1>
      <div className="p-3">{children}</div>
    </nav>
  );
}
