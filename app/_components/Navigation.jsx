"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import ProfileView from "./ProfileView";
import Button from "./Button";
import Logo from "./Logo";
import Cookies from "js-cookie";
export default function Navigation() {
  const handleSignOut = () => {
    Cookies.remove("auth-token"); // Remove the token from cookies
    router.push("/auth/login"); // Redirect to login page
  };

  return (
    <nav className="sticky z-10 flex flex-col p-6 rounded-lg md:justify-between md:items-center md:flex-row bg-bg-main gap-7">
      <Logo />
      <ProfileView />

      <div className="space-x-4">
        <Button type="button">Logout</Button>
        <Button type="link" href="/preview" className="w-full">
          Preview
        </Button>
      </div>
    </nav>
  );
}
