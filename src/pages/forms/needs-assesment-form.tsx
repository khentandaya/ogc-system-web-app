import React from "react";
import StudentNav from "@/components/studentNav";
import Image from "next/image";
import Input from "@/components/input";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Student from "@/models/Student";
import { useSession } from "next-auth/react";

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
  const student = await Student.findOne({ email: session?.user?.email });
  return {
    props: {
      studentString: JSON.stringify(student),
    },
  };
}

export default function NeedsAssesmentForm({
  studentString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const student = JSON.parse(studentString);
  // console.log(student);

  const session = useSession();
  console.log(session);

  if (session.status === "authenticated")
    return (
      <div className="flex flex-col items-center justify-center gap-12">
        <StudentNav />
        <div className="flex flex-col gap-2 h-[35rem] w-[75%]">
          <p className="">Student Individual Data and Needs Profile Form</p>
          <div className="flex flex-col w-full h-full gap-5 p-4 shadow-xl rounded-xl">
            <Image
              alt="user-profile"
              src={session.data?.user?.image + ""}
              width={100}
              height={100}
              className="border-[3px] object-fill shadow-xl border-secondary rounded-3xl"
            />

            <div className="flex items-center justify-between">
              <Input
                className=""
                name="idnumber"
                defaultValue={student.idNumber}
                required
              >
                ID Number
              </Input>
              <Input className="" name="course" required>
                Course
              </Input>
              <Input className="" name="ay" required>
                AY
              </Input>
              <div className="flex flex-col gap-1">
                <label className="px-1">College</label>
                <select
                  className="px-2 outline-0 py-2 border-[2.5px] bg-foreground h-15 w-50 rounded-xl border-slate-300"
                  name="college"
                  defaultValue={student.college}
                >
                  <option value="ccs">CCS</option>
                  <option value="ced">CED</option>
                  <option value="chs">CHS</option>
                  <option value="csm">CSM</option>
                  <option value="coe">COE</option>
                  <option value="ceba">CEBA</option>
                  <option value="cass">CASS</option>
                </select>
              </div>
            </div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
}
