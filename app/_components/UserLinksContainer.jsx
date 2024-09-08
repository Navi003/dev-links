import React from "react";
import Heading from "./Heading";
import Button from "./Button";
import AddLink from "./AddLink";

export default function UserLinksContainer() {
  return (
    <div className="w-full bg-white rounded-lg p-14">
      <Heading text="Add/edit/remove links below and then share all your profiles with the world!">
        Customize your Links
      </Heading>
      <Button type="button" className="w-full mt-4">
        + Add new Link
      </Button>
      <ul>
        <AddLink />
      </ul>
    </div>
  );
}
