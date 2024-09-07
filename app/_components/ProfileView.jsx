"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import linkLogo from "@/assets/images/icon-link.svg";
import profileLogo from "@/assets/images/icon-profile-details-header.svg";
import { useState } from "react";

export default function ProfileView() {
  const [profileView, setProfileView] = useState(false);

  return (
    <div className="flex items-center gap-4 text-xl">
      <div
        onClick={() => setProfileView((state) => !state)}
        className={`flex items-center justify-center px-8 py-4 transition-all space-x-2 rounded-lg ${
          profileView ? "text-text-light" : "text-primary bg-secondary"
        }`}
      >
        <Image
          src={linkLogo}
          height={20}
          width={20}
          alt="link"
          className="text-primary"
        />
        <Link className="hover:text-primary" href="/">
          Links
        </Link>
      </div>
      <div
        onClick={() => setProfileView((state) => !state)}
        className={`flex  transition-all  items-center justify-center px-8 py-4 space-x-2 rounded-lg ${
          profileView ? "text-primary bg-secondary" : "text-text-light"
        }`}
      >
        <Image src={profileLogo} height={20} width={20} alt="link" />
        <Link className="hover:text-primary" href="/">
          Profile Details
        </Link>
      </div>
    </div>
  );
}
