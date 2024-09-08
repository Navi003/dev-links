import React from "react";
import Container from "./_components/Container";
import Navigation from "./_components/Navigation";
import PhoneAside from "./_components/PhoneAside";
import UserLinksContainer from "./_components/UserLinksContainer";

export default function Home() {
  return (
    <Container>
      <Navigation />
      <main className="flex gap-4 mt-4">
        <PhoneAside />
        <UserLinksContainer />
      </main>
    </Container>
  );
}
