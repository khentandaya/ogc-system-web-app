import React, { useEffect, useState } from "react";
import StaffNav from "@/components/staffNav";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import Staff from "@/models/Staff";
import { useRouter } from "next/router";
import axios from "axios";

type Props = {};

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

export default function StudentInfo({}: Props) {
  const router = useRouter();
  const id = router.query.id;
  const [student, setStudent] = useState<any>();
  const [studentTabClick, setStudentTabClick] = useState(true);
  const [formsTabClick, setFormsTabClick] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`/api/studentprofile/${id}`).then(({ data }) => {
        setStudent(data);
      });
    }
  }, [id]);

  console.log(student);

  return (
    <div className="gap flex w-screen flex-col gap-5">
      <StaffNav />
      <div className="mx-32 flex h-[5rem] items-center justify-start p-4">
        <div className="flex h-[3rem] items-center justify-center gap-1 rounded-2xl bg-[#cceff6] p-2 py-1 ">
          <div
            onClick={() => {
              setStudentTabClick(true);
              setFormsTabClick(false);
            }}
            className={` ${
              studentTabClick ? "rounded-xl bg-[#FDFDFD]" : ""
            } flex h-[2rem] w-[13rem] cursor-pointer items-center justify-center`}
          >{`Student's Profile`}</div>

          <div
            onClick={() => {
              setStudentTabClick(false);
              setFormsTabClick(true);
            }}
            className={` ${
              formsTabClick ? "rounded-xl bg-[#FDFDFD]" : ""
            } flex h-[2rem] w-[13rem] cursor-pointer items-center justify-center`}
          >{`Needs Assessment Form`}</div>
        </div>
      </div>
      <div className="mx-32 h-[30rem] overflow-y bg-slate-400">
        
      </div>
    </div>
  );
}
