"use client";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import Image from "next/image";
import emailIcon from "@/assets/images/icon-email.svg";
import passwordIcon from "@/assets/images/icon-password.svg";
import { useState } from "react";

import { useRouter } from "next/navigation"; // Import Next.js useRouter
import Cookies from "js-cookie"; // Import js-cookie to handle cookies

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter(); // Use Next.js router to handle redirects

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Send form data to your API route (POST request)
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Send form data as JSON
    });

    const data = await response.json();

    if (data.success) {
      // Store the JWT token in cookies
      Cookies.set("auth-token", data.token, { expires: 1 }); // Cookie expires in 1 day

      // Redirect to the homepage
      router.push("/"); // Redirect to "/" page after login
    } else {
      // Handle errors
      console.log("Sign-in failed:", data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSignIn}>
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
              onChange={handleChange}
              placeholder="Enter your email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              name="password"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 pl-12 text-xl rounded-lg shadow-sm outline-none active:shadow-purple-500 focus:shadow-purple-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleSignIn}
            type="button"
            className="flex-1 bg-primary text-secondary"
          >
            Login
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
