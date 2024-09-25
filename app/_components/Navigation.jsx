import React from "react";

import Image from "next/image";
import Link from "next/link";
import ProfileView from "./ProfileView";
import Button from "./Button";
import Logo from "./Logo";

export default function Navigation() {
  return (
    <nav className="sticky z-10 flex flex-col p-6 rounded-lg md:justify-between md:items-center md:flex-row bg-bg-main gap-7">
      <Logo />
      <ProfileView />

      <Button type="link" href="/preview" className="w-full">
        Preview
      </Button>
    </nav>
  );
}
