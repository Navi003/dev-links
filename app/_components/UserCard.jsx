"use client";
import React from "react";
import { useLinks } from "@/app/_components/useLinkContext";
import Image from "next/image";
import Link from "next/link";
export default function UserCard() {
  const {
    imageSrc,
    url,
    setUrl,
    links,
    setLinks,

    user,
    setUser,
  } = useLinks();

  return (
    <div
      className="bg-white p-28 translate-y-36 *:
  flex flex-col gap-5 rounded-lg shadow-lg items-center shadow-black
  "
    >
      <div className="w-32 h-32 bg-red-500 rounded-full overflow-hidden">
        {imageSrc && (
          <Image
            className="w-full object-cover"
            src={imageSrc}
            height={50}
            width={50}
            alt="user Image"
          />
        )}
      </div>
      <div>
        <h2 className="font-bold text-3xl text-center">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-center font-thin">{user.email}</p>
      </div>
      <ul className="flex flex-col justify-center items-center gap-5">
        {links.map((link) => {
          return (
            <li key={link.platform} className="rounded-md p-2">
              <a
                target="_blank"
                href={
                  link.link.startsWith("http")
                    ? link.link
                    : `https://${link.link}`
                }
                rel="noopener noreferrer"
              >
                {link.platform}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
