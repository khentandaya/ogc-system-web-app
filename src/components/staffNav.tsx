import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {
  AiOutlineHome,
  AiOutlineTeam,
  AiTwotoneCalendar,
  AiOutlineAreaChart,
  AiOutlineLogout,
} from "react-icons/ai";

export default function StaffNav() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center bg-white w-screen h-[85px] py-2 border border-b-2 shadow-sm items-center">
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
                router.asPath == "/staffview" ? "text-[#017869]" : ""
              } hover:text-[#017869] transition-all duration-100 flex items-center gap-1 hover:scale-[1.05]`}
              href="/staffview"
            >
              <AiOutlineHome />
              Home
            </Link>
            <Link
              className="hover:text-[#017869] transition-all duration-100 flex items-center gap-1 hover:scale-[1.05]"
              href="/"
            >
              <AiOutlineTeam />
              Student Query
            </Link>
            <Link
              className="hover:text-[#017869] transition-all duration-100 flex items-center gap-1 hover:scale-[1.05]"
              href="/"
            >
              <AiTwotoneCalendar />
              Appointment Schedule
            </Link>
            <Link
              className="hover:text-[#017869] transition-all duration-100 flex items-center gap-1 hover:scale-[1.05]"
              href="/"
            >
              <AiOutlineAreaChart />
              Analytics
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
