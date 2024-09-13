import React from "react";
import logo from "@/assets/images/logo-devlinks-small.svg";

import Image from "next/image";
import Link from "next/link";
import ProfileView from "./ProfileView";
import Button from "./Button";

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between p-6 rounded-lg bg-bg-main sticky z-10">
      <div className="flex items-center gap-2">
        <Image src={logo} height={30} width={30} alt="logo of dev-links" />
        <span className="text-4xl font-bold text-text-light">devlinks</span>
      </div>
      <ProfileView />
      <div>
        <Button type="link" href="/preview">
          Preview
        </Button>
      </div>
    </nav>
  );
}
