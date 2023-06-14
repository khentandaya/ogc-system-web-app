import Image from "next/image";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import Button from "@/components/button";
import { AiOutlineCalendar, AiOutlineLoading3Quarters } from "react-icons/ai";
import Student from "@/models/Student";
import StudentNav from "@/components/studentNav";
import Link from "next/link";
import { useState } from "react";

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

export default function StudentView() {
  const session = useSession();
  const [buttonLoad, setButtonLoad] = useState(false);

  if (session.status === "authenticated")
    return (
      <div className="flex flex-col gap-24">
        <StudentNav />
        <Content />
      </div>
    );

  function Content() {
    return (
      <div className="grid items-center grid-cols-2 w-screen">
        <div className="flex justify-end items-center">
          <Image
            src={"/landing.png"}
            alt={"landing"}
            width={550}
            height={550}
            className=""
          />
        </div>
        <div className="py-10 pl-4 flex w-[28rem] flex-col gap-8">
          <div className="bg-gradient-to-tr from-[#28407f] w-fit bg-clip-text to-[#01bfa8]">
            <h1 className="font-bold text-transparent text-6xl">Welcome</h1>
          </div>

          <p className="leading-7 text-gray-500 text-left text-sm">
            We provide a safe and supportive environment where you can freely
            express yourself and work towards finding solutions. Our counselors
            are dedicated to helping you navigate life's challenges and empower
            you on your journey towards growth. Don't face difficulties alone –
            book your counseling appointment today and take the first step
            towards positive change
          </p>
          <Link
            onClick={() => setButtonLoad(true)}
            href="/appointments/student-appointment"
          >
            <Button className="flex items-center gap-2 bg-[#3CFEE7] hover:bg-white hover:text-[#017869] text-gray-500 font-semibold transition-all duration-100">
              Book an Appointment
              {buttonLoad ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <AiOutlineCalendar />
              )}
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
