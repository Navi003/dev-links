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
import { Cookies } from "js-cookie";

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
    console.log("UPDATING");
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmY1YzkxMmIxOWM3ZTVhYjE4YzM4YzAiLCJlbWFpbCI6ImRoaW1hbm5hdmpvdDFAZ21haWwuY29tIiwiaWF0IjoxNzI3ODE4Mjg5LCJleHAiOjE3Mjc4MjE4ODl9.XypkS90XoyMT5mbLYPVne3s9JLPM9-dvswkzYy74QLw";
      console.log(token);

      const formData = new FormData();
      formData.append("token", token); // Include the JWT token for authentication
      formData.append("email", user.email); // Include user's email
      formData.append("firstName", user.firstName); // First name of the user
      formData.append("lastName", user.lastName); // Last name of the user
      formData.append("links", JSON.stringify(links)); // Stringify links array

      // If imageSrc is a file (from an input), append it
      if (imageSrc) {
        formData.append("imageSrc", imageSrc); // Assuming imageSrc is a File object
      }

      console.log(formData);

      const response = await fetch("/api/register", {
        method: "POST",
        body: formData, // Send the FormData object
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const data = await response.json(); // Extract JSON data from the response

      console.log(data);

      // Set user data state after a successful response
      setUserData({
        links: JSON.parse(data.links), // Parse the links back to an array
        user: {
          firstName: data.userData.firstName,
          lastName: data.userData.lastName,
          email: data.userData.email,
          image: data.userData.image,
        },
      });
    } catch (error) {
      console.log(error.message);
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
                <p className="max-w-[488px] mx-auto text-text-light mt-8">
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
