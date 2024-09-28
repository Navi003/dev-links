import React from "react";
import Container from "../_components/Container";
import Logo from "../_components/Logo";
import { LinksProvider } from "../_components/useLinkContext";

export default function layout({ children }) {
  return (
    <LinksProvider>
      <Container>
        <nav className="flex justify-center">
          <Logo />
        </nav>
        <div className="flex items-center justify-center min-h-screen ">
          <div className="p-12 bg-white rounded-md w-[600px] ">{children}</div>
        </div>
      </Container>
    </LinksProvider>
  );
}
