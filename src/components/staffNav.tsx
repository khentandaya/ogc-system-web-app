import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiTwotoneCalendar,
  AiOutlineAreaChart,
  AiOutlineLogout,
} from "react-icons/ai";

export default function StaffNav() {
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
              className="w-auto"
            />
          </div>
          <div className="flex justify-start gap-20 text-base">
            <Link
              className={`${
                router.asPath === "/staffview" ? "text-[#28407f]" : ""
              } flex items-center gap-1 transition-all duration-100 hover:scale-[1.05] hover:text-[#28407f]`}
              href="/staffview"
            >
              <AiOutlineHome />
              Home
            </Link>
            <Link
              className={`${
                router.asPath === "/staff/student-query" ? "text-[#28407f]" : ""
              } flex items-center gap-1 transition-all duration-100 hover:scale-[1.05] hover:text-[#28407f]`}
              href="/staff/student-query"
            >
              <AiOutlineSearch size={19} />
              Students
            </Link>
            <Link
              className={`${
                router.asPath === "/appointments/staff-appointment"
                  ? "text-[#28407f]"
                  : ""
              } flex items-center gap-1 transition-all duration-100 hover:scale-[1.05] hover:text-[#28407f]`}
              href="/appointments/staff-appointment"
            >
              <AiTwotoneCalendar />
              Appointment Schedule
            </Link>
            <Link
              className={`${
                router.asPath === "/staff/analytics" ? "text-[#28407f]" : ""
              } flex items-center gap-1 transition-all duration-100 hover:scale-[1.05] hover:text-[#28407f]`}
              href="/staff/analytics"
            >
              <AiOutlineAreaChart />
              Analytics
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
