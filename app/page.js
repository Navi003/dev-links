// "use client";
import React from "react";

import UserLinksContainer from "./_components/UserLinksContainer";
import Navigation from "./_components/Navigation";
import PhoneAside from "./_components/PhoneAside";
// import { LinksProvider } from "./_components/useLinkContext";

export default function Home() {
  return (
    <div className="flex flex-col mx-auto">
      <Navigation />
      <main className="flex flex-col gap-4 mt-4 md:flex-row">
        <PhoneAside />
        <UserLinksContainer />
      </main>
    </div>
  );
}
