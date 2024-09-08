import React from "react";

export default function AddLink() {
  return (
    <li className="p-3 mt-2 rounded-md bg-text-light">
      <div className="flex justify-between">
        <p>Link</p>
        <p>remove</p>
      </div>
      <div className="flex flex-col gap-1 ">
        <label>Platform</label>
        <select className="p-2 rounded-md outline-none border-[1px] border-text-light">
          <option>github</option>
        </select>
      </div>
    </li>
  );
}
