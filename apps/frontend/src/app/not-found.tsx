"use client";
import Link from "next/link";
import React from "react";

import dynamic from "next/dynamic";
export default function NotFound() {
  const LottieTumbleWeed = dynamic(
    () => import("../components/LottieTumbleweed"),
    {
      ssr: false,
      loading: () => <div className="w-full md:w-64 h-64" />,
    }
  );

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-6 space-y-8">
      <div className=" w-full md:w-64 h-64 rounded-lg flex justify-center items-center">
        <LottieTumbleWeed />
      </div>

      <h1 className="text-5xl font-extrabold text-gray-900">404</h1>
      <p className="text-lg text-gray-600">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-black text-white rounded-md text-sm font-semibold hover:bg-gray-800 transition"
      >
        Go back home
      </Link>
    </div>
  );
}
