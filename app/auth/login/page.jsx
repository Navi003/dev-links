import React from "react";
import Button from "@/app/_components/Button";

import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/app/_components/LoginForm";
import SignUpForm from "@/app/_components/SignUpForm";

export default function page() {
  return (
    <>
      <div>
        <h2 className="mb-4 text-4xl text-gray-800">Login</h2>
        <p className="mb-4">Add your details below to get back into the app</p>
      </div>
      <LoginForm />
    </>
  );
}
