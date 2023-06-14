import React from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import Student from "@/models/Student";
import Staff from "@/models/Staff";

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

  const student = await Student.findOne({ email: session?.user?.email });
  const staff = await Staff.findOne({ email: session?.user?.email });
  if (student) {
    return {
      redirect: {
        destination: "/studentview",
      },
    };
  }

  else if(staff) {
    return {
      redirect: {
        destination: "/staffview"
      }
    }
  }

  return {
    redirect: {
      destination: "/signup",
    },
  };
}

export default function HomePage() {}