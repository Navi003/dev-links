import React from "react";

export default function Heading({ children, text }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-text-dark ">{children}</h2>
      <p className="mt-3 text-text-light">{text}</p>
    </div>
  );
}
