import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            {/* <Image
                src="/echohealthlogo.png"
                alt="EchoHealth Logo"
                width={100}
                height={100}
              /> */}
            <span className="text-2xl font-bold text-blue-400">EchoHealth</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/auth"
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Sign In
            </Link>
            <Link
              href="/auth"
              className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
