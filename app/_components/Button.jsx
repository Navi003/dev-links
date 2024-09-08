import Link from "next/link";
import React from "react";

export default function Button({ children, type, href, className, onClick }) {
  const style =
    "px-5 py-3 border-[1px] rounded-lg border-primary broder text-primary font-bold hover:bg-secondary";

  if (type === "button") {
    return (
      <button
        onClick={onClick}
        className={`${style} ${className ? className : ""}`}
      >
        {children}
      </button>
    );
  }

  if (type === "link") {
    return (
      <Link className={style} href={href}>
        {children}
      </Link>
    );
  }
}
