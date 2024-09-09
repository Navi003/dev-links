"use client";
import Image from "next/image";
import React from "react";
import linkIcon from "@/assets/images/icon-link.svg";
import { useLinks } from "./useLinkContext";
import { useEffect } from "react";

export default function AddLink() {
  const { url, setUrl } = useLinks();

  function handleChange(e) {
    const { name, value } = e.target;
    const newUrlData = { ...url };
    newUrlData[name] = value;
    setUrl(newUrlData);
  }

  // useEffect(() => {
  //   const platform = document.querySelector("#platform");
  //   const url = document.querySelector("#url");
  //   const selectedValue = platform.value;

  //   console.log(selectedValue);

  //   setUrl((state) => ({ ...state, platform: selectedValue }));

  //   setUrl((state) => ({ ...state, link: url.value }));
  // }, []);

  return (
    <li className="p-5 mt-4 rounded-md bg-secondary">
      <div className="flex justify-between">
        <p>Link</p>
        <p>remove</p>
      </div>
      <div className="flex flex-col gap-1 mt-3 ">
        <label>Platform</label>
        <select
          id="platform"
          className="p-2 rounded-md outline-none border-[1px] border-text-light"
          onChange={handleChange}
          value={url.platform}
          name="platform"
          defaultValue="github"
        >
          <option>github</option>
          <option>Google</option>
          <option>Twitter</option>
          <option>Leetcode</option>
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
          value={url.url}
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
