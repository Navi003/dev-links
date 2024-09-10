"use client";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";
import AddLink from "./AddLink";
import { useState } from "react";
import { useLinks } from "./useLinkContext";

export default function UserLinksContainer() {
  const { links, setLinks } = useLinks();

  // Add an empty link object when the "Add new Link" button is clicked
  function addLinksHandler() {
    setLinks((state) => [...state, { platform: "", link: "" }]);
  }

  // Function to update individual links based on index
  const updateLinkHandler = (index, updatedLink) => {
    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks[index] = updatedLink;
      return newLinks;
    });
  };

  console.log(links);

  return (
    <div className="w-full bg-white rounded-lg p-14">
      <Heading text="Add/edit/remove links below and then share all your profiles with the world!">
        Customize your Links
      </Heading>
      <Button type="button" className="w-full mt-4" onClick={addLinksHandler}>
        + Add new Link
      </Button>
      <ul>
        {links.map((link, i) => (
          <AddLink
            key={i}
            id={i}
            link={link}
            onUpdateLink={updateLinkHandler}
          />
        ))}
      </ul>
      <Button type="button" className="w-full text-white bg-primary mt-7">
        Save
      </Button>
    </div>
  );
}
