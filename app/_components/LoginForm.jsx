"use client";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import Image from "next/image";
import emailIcon from "@/assets/images/icon-email.svg";
import passwordIcon from "@/assets/images/icon-password.svg";
import { sendRequest } from "../lib/sendRequest";

export default function LoginForm() {
  async function handleSubmit(e) {
    e.preventDefault();

    const res = await sendRequest(
      { email: "dhimannavjot1@gmail.com", password: "123456789" },
      "/api/auth/login"
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Email input with icon */}
        <div className="relative flex flex-col w-full gap-2 mb-3">
          <label className="text-lg">Email</label>
          <div className="relative">
            <Image
              src={emailIcon}
              alt="Email Icon"
              className="absolute w-6 h-6 text-gray-500 transform -translate-y-1/2 left-3 top-1/2"
            />
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full p-2 pl-12 text-xl rounded-lg shadow-sm outline-none active:shadow-purple-500 focus:shadow-purple-500"
            />
          </div>
        </div>

        {/* Password input */}
        <div className="flex flex-col w-full gap-2 mb-3">
          <label className="text-lg">Password</label>
          <div className="relative">
            <Image
              src={passwordIcon}
              alt="Email Icon"
              className="absolute w-6 h-6 text-gray-500 transform -translate-y-1/2 left-3 top-1/2"
            />
            <input
              type="password"
              required
              placeholder="Enter your email"
              className="w-full p-2 pl-12 text-xl rounded-lg shadow-sm outline-none active:shadow-purple-500 focus:shadow-purple-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button type="button" className="flex-1 bg-primary text-secondary">
            Login
          </Button>
          <Button type="button" className="flex-1">
            Sign up
          </Button>
        </div>
      </form>

      <p className="mt-4 text-center text-text-dark">
        Don’t have an Account?
        <Link href="/auth/signup" className="text-primary">
          Create an Account
        </Link>{" "}
      </p>
    </>
  );
}
