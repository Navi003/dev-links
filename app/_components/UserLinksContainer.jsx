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
import Cookies from "js-cookie";

export default function UserLinksContainer() {
  const { links, setLinks, setUserData, user, imageSrc, userData } = useLinks();

  // const [formData, setFormData] = useState({});

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

  const userDataHandler = async (event) => {
    // Standardverhalten abbrechen
    event.preventDefault();

    // Daten als Formular aufbereiten
    const formData = new FormData();
    formData.append("email", userData.email || ""); // Include user's email
    formData.append("firstName", userData.firstName || ""); // First name of the user
    formData.append("lastName", userData.lastName || ""); // Last name of the user
    formData.append("links", userData.links || "[]"); // Stringify links array
    formData.append("image", userData.image);
    if (userData.image) formData.append("image", userData.image);

    const response = await fetch("/api/register", {
      method: "POST",
      body: formData, // Send FormData directly
      headers: {
        Authorization: `Bearer ${Cookies.get("auti-token")}`, // Send token in the headers
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update user data");
    }
  };

  // async function userDataHandler() {
  //   try {
  //     const formData = new FormData();
  //     formData.append("email", user.email || ""); // Include user's email
  //     formData.append("firstName", user.firstName || ""); // First name of the user
  //     formData.append("lastName", user.lastName || ""); // Last name of the user
  //     formData.append("links", JSON.stringify(links) || "[]"); // Stringify links array

  //     // If imageSrc is a file (from an input), append it
  //     if (imageSrc) {
  //       formData.append("imageSrc", imageSrc); // Assuming imageSrc is a File object
  //     }

  //     const response = await fetch("/api/register", {
  //       method: "POST",
  //       body: formData, // Send FormData directly
  //       headers: {
  //         Authorization: `Bearer ${Cookies.get("auti-token")}`, // Send token in the headers
  //       },
  //     });

  //     console.log(response);

  //     if (!response.ok) {
  //       throw new Error("Failed to update user data");
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }

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
