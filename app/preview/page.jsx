import React from "react";
import Button from "../_components/Button";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="absolute top-0 left-0 z-10 w-full min-h-[150vh] bg-black overflow-hidden">
        <div className="flex">
          <Link
            className="absolute
          right-5 top-5

          px-5 py-3 border-[1px] 
          
          rounded-lg border-primary broder text-primary font-bold bg-secondary

          
          "
            href="/"
            type="link"
          >
            back
          </Link>
        </div>
        <div className="flex items-center justify-center rounded-lg bg-primary">
          <div className="bg-white w-80 h-96 translate-y-36"></div>
        </div>
      </div>
    </>
  );
}
