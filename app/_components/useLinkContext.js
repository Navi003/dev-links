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
  const [imagePreview, setImagePreview] = useState();

  const [userData, setUserData] = useState({});

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
        setImagePreview,
        imagePreview,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
}

function useLinks() {
  const context = useContext(LinksContext);

  return context;
}

export { LinksProvider, useLinks };
