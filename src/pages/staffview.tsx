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
  AiOutlineContacts,
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
  const [appointments, setAppointments] = useState([]);
  const [needsaforms, setNeedsaForm] = useState([]);

  async function getStudents() {
    const res = await axios.get("/api/studentprofile");
    if (res) {
      return res.data;
    }
  }
  useEffect(() => {
    getStudents().then((data) => {
      setStudents(data);
    });

    axios.get(`/api/appointmentcollege?collegeQ=${session.data?.user.college}`).then(({data})=>{
      setAppointments(data);
    })

    axios.get(`/api/allneedsaform`).then(({data})=>{
      setNeedsaForm(data);
    })
  }, [session.data]);

  if (session.status === "authenticated")
    return (
      <div className="flex flex-col items-center justify-center mx-32 gap-14">
        <StaffNav />
        <div className="fixed -bottom-20 -right-20 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
        <div className="fixed -left-36 top-56 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
        <div className="flex items-center justify-between w-full gap-3">
          <div className="flex w-[18rem] items-center gap-5">
            <Image
              src={session.data?.user?.image + ""}
              alt={"user_avatar"}
              width={80}
              height={80}
              className="border-4 rounded-full cursor-default"
            />
            <p className="flex gap-10">
              Hello! {session?.data?.user.firstName},
            </p>
          </div>
          <p className="flex max-h-[30px] justify-between gap-3 font-bold">
            <span className="px-3 font-semibold text-white cursor-default font- rounded-xl bg-primary">
              {session?.data?.user.college?.toUpperCase()}
            </span>
            | Admin
          </p>
        </div>
        <div className="mt-10 grid h-[15rem] w-full grid-cols-3 gap-16">
          <div className="grid h-[12rem] grow grid-rows-2 border bg-[#0079FF] p-8 text-[#FDFDFD]">
            <p className="flex justify-start text-3xl font-semibold">
              Students
            </p>
            <p className="flex items-end justify-between pl-10 text-3xl font-bold">
              <AiOutlineTeam size={80} />
              {students.length}
            </p>
          </div>
          <div className="grid h-[12rem] grow grid-rows-2 border bg-[#00DFA2] p-8 text-[#FDFDFD]">
            <p className="flex justify-start text-3xl font-semibold">
              Needs Assessment
            </p>
            <p className="flex items-end justify-between pl-10 text-3xl font-bold">
              <AiOutlineCarryOut size={80} />
              {needsaforms.length}
            </p>
          </div>
          <div className="grid h-[12rem] grow grid-rows-2 border bg-[#F4F952] p-8 text-[#FDFDFD]">
            <p className="flex justify-start text-3xl font-semibold">
              Apppointments
            </p>
            <p className="flex items-end justify-between pl-10 text-3xl font-bold">
              <AiOutlineContacts size={80} />
              {appointments.length}
            </p>
          </div>
        </div>
      </div>
    );
}
