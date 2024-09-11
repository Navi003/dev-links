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
        <div>User Information</div>
      </div>

      <Button type="button" className="w-full mt-auto text-white bg-primary">
        Save
      </Button>
    </div>
  );
}
