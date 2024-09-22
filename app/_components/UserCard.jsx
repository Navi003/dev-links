"use client";
import Image from "next/image";
import { useLinks } from "./useLinkContext";

export default function UserCard() {
  const { imageSrc, user, setUser, userData } = useLinks();

  return (
    <div className="flex flex-col items-center gap-5 p-10 bg-white rounded-lg shadow-lg translate-y-36 min-w-96 shadow-black ">
      <div className="w-32 h-32 overflow-hidden bg-red-500 rounded-full">
        {userData?.user?.image && (
          <Image
            className="object-cover w-full"
            src={imageSrc}
            height={50}
            width={50}
            alt="user Image"
          />
        )}
      </div>
      <div>
        <h2 className="text-3xl font-bold text-center">
          {userData.user?.firstName} {userData.user?.lastName}
        </h2>
        <p className="font-thin text-center">{user.email}</p>
      </div>

      {/* Make the parent ul full width */}
      <ul className="w-full">
        {/* Loop through the links */}
        {userData?.links?.map((link) => {
          return (
            <li
              key={link.platform}
              className="w-full p-2 text-center border rounded-md border-s"
            >
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
