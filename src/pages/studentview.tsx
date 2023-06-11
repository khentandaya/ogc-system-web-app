import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import Button from "@/components/button";
import { LuArrowRight } from "react-icons/lu";
import Student from "@/models/Student";
import StudentNav from "@/components/studentNav";

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
  if (!student) {
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

export default function HomePage() {
  const session = useSession();

  if (session.status === "authenticated")
    return (
      <div className="flex flex-col gap-28">
        <StudentNav />
        <Content />
      </div>
    );

  function Content() {
    return (
      <div className="flex flex-col items-center justify-center px-36">
        <div className="flex items-center justify-center w-full gap-10 p-10 bg-slate-400">
          <div className="w-[50%] bg-green-400">
            <Image
              alt="students"
              src={"/students.jpg"}
              width={1200}
              height={1200}
              className="w-auto"
            />
          </div>
          <div className="p-10 flex flex-col gap-10 w-[50%]">
            <p className="leading-9">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <Button className="flex items-center gap-2 transition-all duration-100 hover:text-primary">
              Book your Appointment <LuArrowRight />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
