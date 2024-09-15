"use client";

import Image from "next/image";


import SignupForm from "./components/signup-form";
import SigninForm from "./components/signin-form";

export default function Home() {
  

  return (
    <main className="h-screen flex">
      <section className="w-full lg:w-1/2 pt-24 px-8 lg:px-0">
        <div className="w-full sm:w-[380px] mx-auto">
         
        </div>

        <footer className="text-center text-gray-400 mt-24 text-xs">
          &copy; 2024 ALL RIGHTS RESERVED
        </footer>
      </section>

      <section className="hidden lg:block w-1/2 pr-6 py-6">
        <div className="bg-gray-300 w-full h-full rounded-2xl relative">
          <Image
            src="/images/login-bg.jpg"
            alt="login-bg"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      </section>
    </main>
  );
}
