import { NextPage } from "next";
import { FaTimes } from "react-icons/fa";
import PrimaryButton from "../components/button/PrimaryButton";

const Dummy: NextPage = () => {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-50">
      <div className="flex w-1/2 justify-around rounded-lg bg-gray-100 p-3 text-center shadow-md">
        <div className="flex flex-col justify-between">
          <h2 className=" py-1 text-gray-700">Hello World!</h2>
          <form className="flex flex-col">
            <input
              type="text"
              className="rounded-2xl px-2 text-gray-500 transition duration-150 ease-in-out focus:bg-gray-100"
            />
            <PrimaryButton className="text-sm" onClick={() => {}}>
              Add Item
            </PrimaryButton>
          </form>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between rounded-md bg-gray-200 p-1 pl-2 shadow-inner">
            <span className="text-gray-700">item name</span>
            <FaTimes className="self-center text-red-500" size={20} />
          </div>
          <div className="flex justify-between rounded-md bg-gray-200 p-1 pl-2 shadow-inner">
            <span className="text-gray-700">item name</span>
            <FaTimes className="self-center text-red-500" size={20} />
          </div>
          <div className="flex justify-between rounded-md bg-gray-200 p-1 pl-2 shadow-inner">
            <span className="text-gray-700">item name</span>
            <FaTimes className="self-center text-red-500" size={20} />
          </div>
          <div className="flex justify-between rounded-md bg-gray-200 p-1 pl-2 shadow-inner">
            <span className="text-gray-700">item name</span>
            <FaTimes className="self-center text-red-500" size={20} />
          </div>
          <div className="flex justify-between rounded-md bg-gray-200 p-1 pl-2 shadow-inner">
            <span className="text-gray-700">item name</span>
            <FaTimes className="self-center text-red-500" size={20} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dummy;
