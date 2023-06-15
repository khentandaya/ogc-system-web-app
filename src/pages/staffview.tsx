import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import Staff from "@/models/Staff";
import StaffNav from "@/components/staffNav";
import {
  AiOutlineTeam,
  AiOutlineCarryOut,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import axios from "axios";

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const staff = await Staff.findOne({ email: session?.user?.email });
  if (!staff) {
    return {
      redirect: {
        destination: "/signup",
      },
    };
  }
  return {
    props: {},
  };
}

export default function StaffView() {
  const session = useSession();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("/api/studentprofile").then(({ data }) => {
      setStudents(data);
    });
  }, []);

  if (session.status === "authenticated")
    return (
      <div className="flex mx-32 items-center justify-center flex-col gap-14">
        <StaffNav />
        <div className="flex gap-3 items-center w-full justify-between">
          <div className="w-[18rem] flex items-center gap-5">
            <Image
              src={session.data?.user?.image + ""}
              alt={"user_avatar"}
              width={80}
              height={80}
              className="rounded-full cursor-default border-4"
            />
            <p className="flex gap-10">Hello! {session.data.user.firstName},</p>
          </div>
          <p className="max-h-[30px] flex gap-3 justify-between font-bold">
            <span className="cursor-default rounded-xl px-3 font- font-semibold text-white bg-primary">
              {session.data.user.college?.toUpperCase()}
            </span>
            | Admin
          </p>
        </div>
        <div className="h-[15rem] grid grid-cols-3 mt-10 gap-16 w-full">
          <div className="grow hover:scale-[1.02] transition-all duration-100 p-8 text-[#FDFDFD] h-[12rem] grid grid-rows-2 border border-gray-400 shadow-xl bg-gradient-to-tr from-[#1267FB] to-[#71A4FD]">
            <p className="flex text-3xl font-semibold justify-start">
              Students
            </p>
            <p className="flex pl-10 text-3xl font-bold justify-between items-end">
              <AiOutlineTeam size={80} />
              {students.length}
            </p>
          </div>
          <div className="grow hover:scale-[1.02] transition-all duration-100 p-8 text-[#FDFDFD] h-[12rem] grid grid-rows-2 border border-gray-400 shadow-xl bg-gradient-to-tr from-[#19913C] to-[#37DD68]">
            <p className="flex text-3xl font-semibold justify-start">
              Approved
            </p>
            <p className="flex pl-10  text-3xl font-bold justify-between items-end">
              <AiOutlineCarryOut size={80} />3
            </p>
          </div>
          <div className="grow hover:scale-[1.02] transition-all duration-100 p-8 text-[#FDFDFD] h-[12rem] grid grid-rows-2 border border-gray-400 shadow-xl bg-gradient-to-tr from-[#FB1412] to-[#FD7371]">
            <p className="flex text-3xl font-semibold justify-start">
              Cancelled
            </p>
            <p className="flex pl-10 text-3xl font-bold justify-between items-end">
              <AiOutlineCloseCircle size={80} />1
            </p>
          </div>
        </div>
      </div>
    );
}
