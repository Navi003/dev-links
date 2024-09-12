import React from "react";
import Heading from "./Heading";
import Button from "./Button";

export default function UserProfileContainer() {
  return (
    <div className="flex flex-col justify-between w-full bg-white rounded-lg p-14">
      <div className="w-full">
        <Heading text="Add your details to create a personal touch to your profile.">
          Customize your Profile
        </Heading>
        <div>IMAGE UPLOAD</div>
        <form className="p-6 rounded-lg bg-bg-light">
          <div className="flex items-center justify-between mb-2">
            <label className="flex-1">First Name</label>
            <input
              type="text"
              placeholder="e.g John"
              className="flex-1 px-5 py-3 text-lg rounded-md "
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex-1">Last Name</label>
            <input
              type="text"
              placeholder="e.g John"
              className="flex-1 px-5 py-3 text-lg rounded-md "
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex-1">E-Mail</label>
            <input
              type="email"
              placeholder="e.g John"
              className="flex-1 px-5 py-3 text-lg rounded-md "
            />
          </div>
        </form>
      </div>

      <Button type="button" className="w-full mt-auto text-white bg-primary">
        Save
      </Button>
    </div>
  );
}
