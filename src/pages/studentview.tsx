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
      <div className="flex h-screen flex-col">
        <StudentNav />
        <Content />
      </div>
    );

  function Content() {
    return (
      <>
        <div className="relative grid w-screen grow grid-cols-2 items-center overflow-hidden">
          <div className="absolute -bottom-20 -right-20 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
          <div className="absolute -left-20 -top-20 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
          <div className="flex items-center justify-end">
            <Image
              src={"/landing.png"}
              alt={"landing"}
              width={550}
              height={550}
              className=""
            />
          </div>
          <div className="flex w-[28rem] flex-col gap-8 py-10 pl-4">
            <div className="w-fit bg-gradient-to-tr from-[#28407f] to-[#01bfa8] bg-clip-text">
              <h1 className="text-6xl font-bold text-transparent">Welcome</h1>
            </div>

            <p className="text-left text-sm leading-7 text-gray-500">
              {`We provide a safe and supportive environment where you can freely
              express yourself and work towards finding solutions. Our
              counselors are dedicated to helping you navigate life's challenges
              and empower you on your journey towards growth. Don't face
              difficulties alone – book your counseling appointment today and
              take the first step towards positive change`}
            </p>
            <Link
              onClick={() => setButtonLoad(true)}
              href="/appointments/student-appointment"
            >
              <Button className="flex items-center gap-2 bg-[#28407f] font-semibold text-[#FDFDFD] transition-all duration-100 hover:bg-white hover:text-[#017869]">
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
      </>
    );
  }
}
