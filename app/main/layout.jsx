import React from "react";
import { LinksProvider } from "../_components/useLinkContext";
import PhoneAside from "../_components/PhoneAside";
import Navigation from "../_components/Navigation";

export default function layout({ children }) {
  return (
    <>
      <div className="flex flex-col mx-auto">
        <Navigation />
        <main className="flex flex-col gap-4 mt-4 md:flex-row">
          <PhoneAside />
          {children}
        </main>
      </div>
    </>
  );
}
