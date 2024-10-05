"use client";
import React, { useRef } from "react";
import Heading from "./Heading";
import Button from "./Button";
import uploadImage from "@/assets/images/icon-upload-image.svg";
import Image from "next/image";
import { useLinks } from "./useLinkContext";

export default function UserProfileContainer() {
  // Create a reference for the hidden file input
  const fileInputRef = useRef(null);
  const {
    imageSrc,
    setImageSrc,
    setUser,
    user,
    setUserData,
    links,
    setImagePreview,
    userData,
  } = useLinks();

  // Function to trigger the hidden file input click
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      // Store the File object itself to upload later
      setImageSrc(file); // Keep the file for uploading

      // Create a preview URL for the image
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL); // Set the preview URL to display the image

      console.log(imageURL); // Check the URL for debugging
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    const newUserData = { ...userData };
    newUserData[name] = value;

    if (name === "image") {
      newUserData.image = files[0];
    }
    setImageSrc(files);
    // const imageURL = URL.createObjectURL(files);
    // setImagePreview(imageURL); // Set the preview URL to display the image

    setUserData(newUserData);
  };

  //  const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     const updatedUser = { ...user, [name]: value };
  //     setUser(updatedUser);
  //   };

  function userDataHandler() {
    setUserData({
      links: links,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: imageSrc,
      },
    });
  }

  return (
    <div className="flex flex-col justify-between w-full bg-white rounded-lg p-14">
      <Heading text="Add your details to create a personal touch to your profile.">
        Customize your Profile
      </Heading>
      <div className="flex items-center justify-between p-6 mt-4 rounded-md bg-bg-light">
        <p>Profile Picture</p>
        <div className="flex items-center p-6">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
            name="image"
          />

          <div className="flex flex-col items-center justify-center p-10 rounded-md bg-secondary">
            <Image
              src={uploadImage}
              height={50}
              width={50}
              alt="upload Image"
              className="cursor-pointer"
              onClick={handleImageClick} // Handle image click
            />

            <span className="block text-xl font-bold text-primary">
              + Upload Image
            </span>
          </div>
          <label className="ml-4">
            Image must be below <br></br> 1024x1024px. <br></br> Use PNG or JPG
            format.
          </label>
        </div>
      </div>
      <form className="p-6 rounded-lg bg-bg-light">
        <div className="flex items-center justify-between mb-2">
          <label className="flex-1">First Name</label>
          <input
            type="text"
            placeholder="e.g John"
            name="firstName"
            className="flex-1 px-5 py-3 text-lg rounded-md "
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between mb-2">
          <label className="flex-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="e.g. Dave"
            className="flex-1 px-5 py-3 text-lg rounded-md"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between mb-2">
          <label className="flex-1">E-Mail</label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            className="flex-1 px-5 py-3 text-lg rounded-md "
            onChange={handleChange}
          />
        </div>
      </form>

      <Button
        type="button"
        className="w-full mt-4 text-white bg-primary"
        onClick={userDataHandler}
      >
        Save
      </Button>
    </div>
  );
}
