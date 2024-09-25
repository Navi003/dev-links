import React from "react";

import SignUpForm from "@/app/_components/SignUpForm";

export default function LoginForm() {
  return (
    <>
      <div>
        <h2 className="mb-4 text-4xl text-gray-800">Sign-up</h2>
        <p className="mb-4">Add your details below to get back into the app</p>
      </div>
      <SignUpForm />
    </>
  );
}
