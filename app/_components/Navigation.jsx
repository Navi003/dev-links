import React from "react";
import logo from "@/assets/images/logo-devlinks-small.svg";

import Image from "next/image";
import Link from "next/link";
import ProfileView from "./ProfileView";
import Button from "./Button";

export default function Navigation() {
  return (
    <nav className="sticky z-10 flex flex-col p-6 rounded-lg md:justify-between md:items-center md:flex-row bg-bg-main gap-7">
      <div className="flex gap-2 md:items-center ">
        <Image src={logo} height={30} width={30} alt="logo of dev-links" />
        <span className="text-4xl font-bold text-text-light">devlinks</span>
      </div>
      <ProfileView />

      <Button type="link" href="/preview" className="w-full">
        Preview
      </Button>
    </nav>
  );
}
