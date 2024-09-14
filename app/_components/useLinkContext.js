"use client";
import { createContext, useContext } from "react";
import { useState } from "react";
const LinksContext = createContext();

function LinksProvider({ children }) {
  const [url, setUrl] = useState({
    platform: "",
    link: "",
  });
  const [links, setLinks] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  return (
    <LinksContext.Provider
      value={{
        url,
        setUrl,
        links,
        setLinks,
        imageSrc,
        setImageSrc,
        user,
        setUser,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
}

function useLinks() {
  const context = useContext(LinksContext);

  if (context === undefined) {
    throw new Error("Context was used outside Provider");
  }

  return context;
}

export { LinksProvider, useLinks };
