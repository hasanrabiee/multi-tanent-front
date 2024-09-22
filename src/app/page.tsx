import HomePage from "@/components/home/HomePage";
import { ROLE_KEY, TOKEN_KEY } from "@/utils/constants/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Home = () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get(TOKEN_KEY);
  const role = cookieStore.get(ROLE_KEY);
  if (authToken) {
    if (role?.value === "admin") {
      redirect("/dashboard/");
    } else {
      redirect("/blog/");
    }
  }
  return <HomePage />;
};

export default Home;
