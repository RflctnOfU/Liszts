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
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <>
      <Nav>
        <PrimaryButton onClick={sessionData ? () => signOut() : () => signIn()}>
          {sessionData ? "Sign out" : "Sign in"}
        </PrimaryButton>
      </Nav>
      <main className="h-screen bg-gray-50"></main>
    </>
  );
};

export default Home;
