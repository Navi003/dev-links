"use client";
import { createContext, useContext } from "react";
import { useState } from "react";
const LinksContext = createContext();

function LinksProvider({ children }) {
  const [url, setUrl] = useState({
    platform: "",
    link: "",
    id: "",
  });
  const [links, setLinks] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [userData, setUserData] = useState({});

  console.log(userData);

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
        setUserData,
        userData,
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
