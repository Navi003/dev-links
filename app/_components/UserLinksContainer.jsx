/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";
import AddLink from "./AddLink";

import { useLinks } from "./useLinkContext";
import emptyLinkImage from "@/assets/images/illustration-empty.svg";
import Image from "next/image";
import { generateRandomId } from "@/app/lib/randomId";

export default function UserLinksContainer() {
  const { links, setLinks, setUserData, user, imageSrc } = useLinks();

  // Add an empty link object when the "Add new Link" button is clicked
  function addLinksHandler() {
    const id = generateRandomId();

    setLinks((state) => [...state, { platform: "", link: "", id }]);
  }

  // Function to update individual links based on index
  const updateLinkHandler = (index, updatedLink) => {
    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks[index] = updatedLink;
      return newLinks;
    });
  };

  const removeLinkHandler = (id) => {
    console.log(id);
    setLinks((prevLinks) => {
      return prevLinks.filter((link) => link.id !== id);
    });
  };

  async function userDataHandler() {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Replace with actual user data you want to send
          links: links, // Assuming `links` is an array of your links
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: imageSrc,
          },
        }),
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.json(); // Extract JSON data from the response

      console.log(data);

      // Set user data state after a successful response
      // setUserData({
      //   links: data.userData.links, // or however you want to structure this
      //   user: {
      //     firstName: data.userData.user.firstName,
      //     lastName: data.userData.user.lastName,
      //     email: data.userData.user.email,
      //     image: data.userData.user.image,
      //   },
      // });
    } catch (error) {
      console.error("Error while registering user:", error);
      // Handle error (e.g., show a message to the user)
    }
  }
  return (
    <div className="flex flex-col justify-between w-full bg-white rounded-lg p-14">
      <div>
        <Heading text="Add/edit/remove links below and then share all your profiles with the world!">
          Customize your Links
        </Heading>
        <Button type="button" className="w-full mt-4" onClick={addLinksHandler}>
          + Add new Link
        </Button>
      </div>
      <div className="max-h-[450px] overflow-scroll containerScroll mt-4">
        {links.length > 0 ? (
          <ul>
            {links.map((link, i) => (
              <AddLink
                key={i}
                link={link}
                index={i}
                onUpdateLink={updateLinkHandler}
                onRemoveLink={removeLinkHandler}
              />
            ))}
          </ul>
        ) : (
          <div className="p-6 mt-3 rounded-lg bg-bg-light">
            <div className="flex flex-col items-center justify-center">
              <Image
                src={emptyLinkImage}
                width={200}
                height={200}
                alt="Empty Links"
              />
              <div>
                <h2 className="text-3xl font-bold text-center">
                  Let's get you started
                </h2>
                <p className=" max-w-[488px] mx-auto text-text-light mt-8">
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We're here
                  to help you share your profiles with everyone!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Button
        type="button"
        className="w-full mt-auto text-white bg-primary"
        onClick={userDataHandler}
      >
        Save
      </Button>
    </div>
  );
}
