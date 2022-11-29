import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Nav from "../components/nav";
import CardListItem from "../components/card/CardListItem";
import CardBody from "../components/card/CardBody";
import Card from "../components/card";
import CardHeader from "../components/card/CardHeader";
import Signup from "../components/signup";
import ListNameForm from "../components/listname";

import { trpc } from "../utils/trpc";
import PrimaryButton from "../components/button/PrimaryButton";
import Button from "../components/button";
import DangerButton from "../components/button/DangerButton";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const user = trpc.userRouter.getUser.useQuery();
  const lists = trpc.listRouter.getLists.useQuery();
  let userId = sessionData?.user?.id;
  // let { data: name } = lists;
  // let items = lists.data[0]?.items[0]?.name;
  interface List {
    name: string | undefined;
    items: [];
  }
  const [userListData, setUserListData] = useState<List>();
  // console.log(userListData);
  const [currentListId, setCurrentListId] = useState({ id: "" });
  const list = trpc.listRouter.getSingleList.useQuery(currentListId);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [listName, setListName] = useState({ authorId: "", name: "" });
  const [itemName, setItemName] = useState({ authorId: "", name: "" });
  const addNewUser = trpc.userRouter.createUser.useMutation({});
  const addNewList = trpc.listRouter.createList.useMutation({});
  const addNewItem = trpc.itemRouter.createItem.useMutation({});

  // useEffect(() => {
  //   setUserListData({
  //     name: lists.data[0]?.name,
  //     items: [items],
  //   });
  // }, []);
  console.log(userListData);

  const handleUserInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListName({ ...listName, name: e.target.value });
  };
  // const handleItemChange = () => {};

  const handleListSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = user.data?.id;
    addNewList.mutate({ authorId: userId, name: listName.name });
    setListName({ ...listName, name: "" });
  };

  const handleNewUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewUser.mutate({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    setUserData({ name: "", email: "", password: "" });
    signIn();
  };

  return (
    <>
      {/* <nav className="flex justify-between bg-gradient-to-br from-slate-700 to-slate-500">
        <div className="m-3 p-2 text-2xl text-slate-300">Logo</div>
        <h1 className="m-3 p-2 text-center text-3xl text-slate-300">Liszts!</h1>
        <div className="p-3">
          <PrimaryButton
            onClick={sessionData ? () => signOut() : () => signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </PrimaryButton>
        </div>
      </nav> */}
      <Nav>
        <PrimaryButton onClick={sessionData ? () => signOut() : () => signIn()}>
          {sessionData ? "Sign out" : "Sign in"}
        </PrimaryButton>
      </Nav>
      <main className="bg-gray-900">
        <Signup
          onChange={handleUserInputChange}
          onSubmit={handleNewUserSubmit}
        />
        <ListNameForm
          onChange={handleInputChange}
          onSubmit={handleListSubmit}
        />
        <form onSubmit={() => {}} className="flex w-1/5 flex-col">
          <input type="text" placeholder="add item" />
          <button
            type="submit"
            className="rounded-lg bg-gray-600 p-2 text-white"
          >
            additem
          </button>
        </form>
        <div>
          {sessionData && <h2>Welcome Back {sessionData.user?.name} </h2>}
        </div>
        <div className="flex w-1/2 flex-col items-center self-center">
          <PrimaryButton onClick={() => {}}>Click Me</PrimaryButton>
          <DangerButton onClick={() => {}}>Don't Click Me</DangerButton>
          <Button className="" onClick={() => {}}>
            Yes
          </Button>
        </div>

        {lists.data?.map((list) => (
          <div key={list.id}>
            <Card>
              <CardHeader>{list.name}</CardHeader>
              <CardBody
                onChange={(e) => {
                  setItemName({ ...itemName, name: e.target.value });
                }}
                onClick={() => {
                  addNewItem.mutate({ authorId: list.id, name: itemName.name });
                }}
              >
                {list.items.map((item) => (
                  <CardListItem key={item.id} onClick={() => {}}>
                    {item.name}
                  </CardListItem>
                ))}
              </CardBody>
            </Card>
          </div>
        ))}
      </main>
      {/* <div className="gap[10px] flex h-1/3 w-1/3 flex-col rounded-lg border border-solid border-slate-300 bg-gradient-to-br from-blue-500 to-sky-500 shadow-lg">
        <div className="m-2 rounded-md border-2 bg-gradient-to-br from-slate-500 to-slate-300 p-2 text-center text-xl font-bold">
          <h2>List Name Here</h2>
        </div>
        <div className="m-2 gap-2 rounded-md border border-slate-300 bg-gradient-to-br from-slate-500 to-slate-300 p-2 text-lg shadow-md">
          <ul>
            <CardListItem onClick={() => {}}>item name</CardListItem>
            <div className="my-1 flex justify-between rounded-md border border-gray-400 bg-gradient-to-br from-blue-700 to-sky-600 p-2 shadow-lg">
              <li className="text-slate-300">item name</li>
              <span className="text-red-500">X(delete)</span>
            </div>
            <div className="my-1 flex justify-between rounded-md border border-gray-400 bg-gradient-to-br from-blue-700 to-sky-600 p-2 shadow-lg">
              <li className="text-slate-300">item name</li>
              <span className="text-red-500">X(delete)</span>
            </div>
          </ul>
          <div className="my-1 flex justify-between rounded-md border border-slate-300 bg-gradient-to-br from-blue-700 to-sky-600 shadow-md">
            <input
              className="m-2 rounded-md border border-slate-300 pl-2"
              onChange={() => {}}
              placeholder="item name here"
            ></input>
            <DangerButton onClick={() => {}}>Add Item</DangerButton>
          </div>
        </div>
      </div> */}
    </>

    // <>
    //   <Head>
    //     <title>Create T3 App</title>
    //     <meta name="description" content="Generated by create-t3-app" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>
    //   <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
    //     <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
    //       <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
    //         Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
    //       </h1>
    //       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
    //         <Link
    //           className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
    //           href="https://create.t3.gg/en/usage/first-steps"
    //         >
    //           <h3 className="text-2xl font-bold">First Steps →</h3>
    //           <div className="text-lg">
    //             Just the basics - Everything you need to know to set up your
    //             database and authentication.
    //           </div>
    //         </Link>
    //         <Link
    //           className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
    //           href="https://create.t3.gg/en/introduction"
    //         >
    //           <h3 className="text-2xl font-bold">Documentation →</h3>
    //           <div className="text-lg">
    //             Learn more about Create T3 App, the libraries it uses, and how
    //             to deploy it.
    //           </div>
    //         </Link>
    //       </div>
    //       <div className="flex flex-col items-center gap-2">
    //         <p className="text-2xl text-white">
    //           {hello.data ? hello.data.greeting : "Loading tRPC query..."}
    //         </p>
    //         <AuthShowcase />
    //       </div>
    //     </div>
    //   </main>
    // </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
