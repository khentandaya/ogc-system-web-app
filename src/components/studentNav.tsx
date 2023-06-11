import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function StudentNav() {
  return (
    <>
      <div className="flex justify-center w-screen h-auto py-4 border border-b-2 shadow-sm items-cente">
        <div className="flex w-[80%] gap-10 items-center justify-around">
          <div className="">
            <Image
              src="/msuiit_logo.png"
              alt="iit logo"
              width={60}
              height={60}
              className="w-auto"
            />
          </div>
          <div className="flex justify-start w-2/3 gap-20 text-lg">
            <Link className="hover:text-primary" href="/studentview">
              Home
            </Link>
            <Link
              className="hover:text-primary"
              href="/forms/needs-assesment-form"
            >
              Take Needs Assesment
            </Link>
            <Link className="hover:text-primary" href="/">
              Book Appointment
            </Link>
            <Link
              className="hover:text-primary"
              onClick={() => signOut()}
              href="/login"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
