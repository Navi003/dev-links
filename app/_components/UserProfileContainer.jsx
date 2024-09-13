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
  const { imageSrc, setImageSrc } = useLinks();

  // Function to trigger the hidden file input click
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the selected image for preview
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
    }
  };

  return (
    <div className="flex flex-col justify-between w-full bg-white rounded-lg p-14 gap-4">
      <Heading text="Add your details to create a personal touch to your profile.">
        Customize your Profile
      </Heading>
      <div className="bg-bg-light flex justify-between items-center rounded-md mt-4 p-6">
        <p>Profile Picture</p>
        <div className="p-6 flex items-center">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />

          <div className="bg-secondary rounded-md p-10 flex items-center justify-center flex-col">
            <Image
              src={uploadImage}
              height={50}
              width={50}
              alt="upload Image"
              className="cursor-pointer"
              onClick={handleImageClick} // Handle image click
            />

            <span className="block font-bold text-primary text-xl">
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
          />
        </div>
        <div className="flex items-center justify-between mb-2">
          <label className="flex-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="e.g. Dave"
            className="flex-1 px-5 py-3 text-lg rounded-md "
          />
        </div>
        <div className="flex items-center justify-between mb-2">
          <label className="flex-1">E-Mail</label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            className="flex-1 px-5 py-3 text-lg rounded-md "
          />
        </div>
      </form>

      <Button type="button" className="w-full mt-4 text-white bg-primary">
        Save
      </Button>
    </div>
  );
}
