import React from "react";
import Button from "../_components/Button";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form className="w-[600px] p-12 bg-white rounded-md">
        <div className="flex flex-col w-full gap-2 mb-3">
          <label className="text-xl">Email</label>
          <input
            type="text"
            className="p-2 text-xl rounded-lg shadow-sm outline-none shadow-purple-500"
          />
        </div>
        <div className="flex flex-col w-full gap-2 mb-3">
          <label className="text-xl">Password</label>
          <input
            type="password"
            className="p-2 text-xl rounded-lg shadow-sm outline-none shadow-purple-500"
          />
        </div>
        <div className="flex gap-2">
          <Button type="button" className="flex-1 bg-primary text-secondary">
            Login
          </Button>
          <Button type="button" className="flex-1">
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}
