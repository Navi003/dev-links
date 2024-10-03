import React from "react";
import Button from "../_components/Button";
import Link from "next/link";
import UserCard from "../_components/UserCard";

export default function page() {
  return (
    <>
      <div className="absolute top-0 left-0 z-10 w-full min-h-[150vh] bg-secondary overflow-hidden">
        <div className="flex justify-between p-5 bg-secondary">
          <Button type="link" href="/shareLink">
            Share Link
          </Button>
          <Link
            className="
          right-5 top-5

          px-5 py-3 border-[1px] 
          rounded-lg border-primary broder text-primary font-bold bg-secondary
          "
            href="/main/links"
            type="link"
          >
            back
          </Link>
        </div>
        <div className="flex items-center justify-center rounded-lg bg-primary">
          <UserCard />
        </div>
      </div>
    </>
  );
}
