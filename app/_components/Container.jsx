import React from "react";

export default function Container({ children }) {
  return (
    <div className=" md:w-[1400px] bg-background mx-auto mt-6">{children}</div>
  );
}
