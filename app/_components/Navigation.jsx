import React from "react";
import logo from "@/assets/images/logo-devlinks-small.svg";

import Image from "next/image";
import Link from "next/link";
import ProfileView from "./ProfileView";

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between p-6 rounded-lg bg-bg-main">
      <div className="flex items-center gap-2">
        <Image src={logo} height={30} width={30} alt="logo of dev-links" />
        <span className="text-4xl font-bold text-text-light">devlinks</span>
      </div>
      <ProfileView />
      <div>
        <Link
          className="px-5 py-3 border-[1px] rounded-lg border-primary broder text-primary font-bold hover:bg-secondary"
          href="/preview"
        >
          Preview
        </Link>
      </div>
    </nav>
  );
}
