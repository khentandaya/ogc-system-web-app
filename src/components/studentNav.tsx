import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiTwotoneCalendar,
  AiOutlineForm,
  AiOutlineLogout,
} from "react-icons/ai";

export default function StudentNav() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center w-screen h-[85px] py-2 border border-b-2 shadow-sm items-cente">
        <div className="flex w-[80%] gap-4 items-center justify-evenly">
          <div className="">
            <Image
              src="/msuiit_logo.png"
              alt="iit logo"
              width={60}
              height={60}
              className="w-auto"
            />
          </div>
          <div className="flex justify-start gap-20 text-base">
            <Link
              className={`${
                router.asPath == "/studentview" ? "text-[#017869]" : ""
              } hover:text-[#017869] transition-all duration-100 flex items-center gap-1 hover:scale-[1.05]`}
              href="/studentview"
            >
              <AiOutlineHome />
              Home
            </Link>
            <Link
              className={`${
                router.asPath == "/forms/student-profile" ? "text-[#017869]" : ""
              } hover:text-[#017869] transition-all duration-100 flex items-center gap-1 hover:scale-[1.05]`}
              href="/forms/student-profile"
            >
              <AiOutlineUser />
              Student Profile
            </Link>
            <Link
              className={`${
                router.asPath == "/forms/needs-assesment-form"
                  ? "text-[#017869]"
                  : ""
              } hover:text-[#017869] transition-all duration-100 flex items-center gap-1 hover:scale-[1.05]`}
              href="/forms/needs-assesment-form"
            >
              <AiOutlineForm className="animate-pulse" />
              Take Needs Assesment
            </Link>
            <Link
              className={` ${
                router.asPath == "/appointments/student-appointment"
                  ? "text-[#017869]"
                  : ""
              } hover:text-[#017869] transition-all duration-100 flex items-center gap-1 hover:scale-[1.05]`}
              href="/appointments/student-appointment"
            >
              <AiTwotoneCalendar />
              Book Appointment
            </Link>
            <Link
              className="hover:text-[#017869] transition-all duration-100 flex items-center gap-1 hover:scale-[1.05]"
              href="/login"
              onClick={() => signOut()}
            >
              Logout
              <AiOutlineLogout />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
