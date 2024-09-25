import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo-devlinks-small.svg";

export default function Logo() {
  return (
    <div className="flex gap-2 md:items-center ">
      <Image src={logo} height={30} width={30} alt="logo of dev-links" />
      <span className="text-4xl font-bold text-text-light">devlinks</span>
    </div>
  );
}
