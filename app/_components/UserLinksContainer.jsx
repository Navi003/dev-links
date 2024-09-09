"use client";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";
import AddLink from "./AddLink";
import { useState } from "react";
import { useLinks } from "./useLinkContext";

export default function UserLinksContainer() {
  const { url, setUrl, links, setLinks } = useLinks();

  function addLinksHandler() {
    setLinks((state) => [...state, url]);
  }

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
        {links.map((link, i) => {
          return <AddLink key={i} />;
        })}
      </ul>
      <Button
        // onClick={}
        type="button"
        className="w-full text-white bg-primary mt-7"
      >
        Save
      </Button>
    </div>
  );
}
