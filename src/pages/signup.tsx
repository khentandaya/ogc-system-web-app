import { getServerSession } from "next-auth";
import Link from "next/link";
import { GetServerSidePropsContext } from "next/types";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import Student from "@/models/Student";
import Staff from "@/models/Staff";

type Props = {};

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const student = await Student.findOne({ email: session?.user?.email });
    const staff = await Staff.findOne({ email: session?.user?.email });
    if (student || staff)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
  }
  return {
    props: {},
  };
}

export default function Signup({}: Props) {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-3xl">Are you a...</h1>
        <div className="flex gap-4">
          <Link
            className="px-4 py-6 text-2xl text-center transition-transform duration-100 w-52 bg-primary/90 text-secondary hover:scale-105"
            href={"/signup/student"}
          >
            Student
          </Link>
          <Link
            className="px-4 py-6 text-2xl text-center transition-transform duration-100 w-52 bg-primary/90 text-secondary hover:scale-105"
            href={"/signup/staff"}
          >
            Staff
          </Link>
        </div>
      </div>
    </div>
  );
}
