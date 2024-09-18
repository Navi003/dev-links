"use client";
import Image from "next/image";
import React from "react";
import linkIcon from "@/assets/images/icon-link.svg";

export default function AddLink({ id, link, onUpdateLink, onRemoveLink }) {
  // Function to handle changes in both platform and link input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedLink = { ...link, [name]: value };
    onUpdateLink(id, updatedLink);
  };

  return (
    <li className="p-5 mt-4 rounded-md bg-secondary">
      <div className="flex justify-between">
        <p>Link</p>
        <p onClick={() => onRemoveLink(id)}>Remove</p>
      </div>
      <div className="flex flex-col gap-1 mt-3 ">
        <label>Platform</label>
        <select
          id="platform"
          className="p-2 rounded-md outline-none border-[1px] border-text-light"
          onChange={handleChange}
          value={link.platform}
          name="platform"
        >
          <option value="">Select a platform</option>
          <option value="Github">Github</option>
          <option value="Youtube">Youtube</option>
          <option value="Twitter">Twitter</option>
        </select>
      </div>
      <div className="relative flex flex-col gap-1 mt-3">
        <label>Link</label>
        <input
          id="link"
          type="text"
          name="link"
          className="p-2 rounded-md outline-none border-[1px] border-text-light pl-10"
          placeholder="www.github.com/navi003"
          onChange={handleChange}
          value={link.link}
        />
        <Image
          src={linkIcon}
          height={20}
          width={20}
          alt="link"
          className="absolute top-10 left-3"
        />
      </div>
    </li>
  );
}
