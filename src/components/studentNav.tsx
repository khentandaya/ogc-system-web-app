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
      <div className="flex h-[85px] w-screen items-center justify-center border border-b-2 bg-white py-2 shadow-sm">
        <div className="flex w-[80%] items-center justify-evenly gap-4">
          <div className="">
            <Image
              src="/eogc_logo.png"
              alt="iit logo"
              width={60}
              height={60}
              className="w-auto cursor-pointer"
            />
          </div>
          <div className="flex justify-start gap-16 text-base">
            <Link
              className={`${
                router.asPath == "/studentview" ? "text-[#28407f]" : ""
              } flex items-center gap-1 transition-all duration-100 hover:scale-[1.05] hover:text-[#28407f]`}
              href="/studentview"
            >
              <AiOutlineHome />
              Home
            </Link>
            <Link
              className={`${
                router.asPath == "/forms/needs-assesment-form"
                  ? "text-[#28407f]"
                  : ""
              } flex items-center gap-1 transition-all duration-100 hover:scale-[1.05] hover:text-[#28407f]`}
              href="/forms/needs-assesment-form"
            >
              <AiOutlineForm className="animate-pulse" />
              Take Needs Assesment
            </Link>
            <Link
              className={` ${
                router.asPath == "/appointments/student-appointment"
                  ? "text-[#28407f]"
                  : ""
              } flex items-center gap-1 transition-all duration-100 hover:scale-[1.05] hover:text-[#28407f]`}
              href="/appointments/student-appointment"
            >
              <AiTwotoneCalendar />
              Book Appointment
            </Link>
            <Link
              className={`${
                router.asPath == "/forms/student-profile"
                  ? "text-[#28407f]"
                  : ""
              } flex items-center gap-1 transition-all duration-100 hover:scale-[1.05] hover:text-[#28407f]`}
              href="/forms/student-profile"
            >
              <AiOutlineUser />
              Student Profile
            </Link>
            <div
              className="flex cursor-pointer items-center gap-1 transition-all duration-100 hover:scale-[1.05] hover:text-[#28407f]"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Logout
              <AiOutlineLogout />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
