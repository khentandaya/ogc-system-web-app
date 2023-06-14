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
import Button from "@/components/button";
import StudentType from "@/types/Student";
import StudentSideNav from "@/components/studentSideNav";
import Radio from "@/components/radio";

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

export default function StudentProfile({
  studentString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const student: StudentType = JSON.parse(studentString);

  const session = useSession();
  console.log(session.data?.user);

  if (session.status === "authenticated")
    return (
      <div className="flex items-center justify-center flex-col">
        <StudentNav />
        <div className="flex w-screen px-14 pt-9">
          <div className="pb-4 relative border-b-[3px] border-slate-300 w-full">
            <p className="text-3xl font-bold">
              <span className="bg-gradient-to-tr from-[#28407f] w-fit bg-clip-text to-[#01bfa8]">
                <span className="text-transparent">
                  Student Individual Data
                </span>
              </span>
              <br />
              <span className="text-base font-semibold text-slate-600">
                We Ensure that your data is confidential
              </span>
            </p>
          </div>
        </div>

        <div className="flex w-full gap-20 pl-20 pt-9">
          <StudentSideNav />
          <div className="flex gap-6 pt-2 flex-col">
            <div
              id="studentdata"
              className="flex flex-col border-b border-slate-200 pl-6"
            >
              <span className="text-lg font-bold">Student Data</span>
              <div className="flex pl-32 pr-10 py-7 flex-col gap-10">
                <Image
                  src={session.data?.user?.image + ""}
                  alt={"user_avatar"}
                  width={120}
                  height={120}
                  className="rounded-full shadow-xl border-4"
                />
                <div className="flex gap-4">
                  <Input
                    className="grow"
                    name="idNumber"
                    defaultValue={session.data.user.idNumber}
                    required
                  >
                    ID Number
                  </Input>
                  <Input className="w-36" name="course" required>
                    Course
                  </Input>
                </div>
                <div className="flex gap-4">
                  <Input className="grow" name="sasescore">
                    MSU-SASE Score
                  </Input>
                  <Input className="w-36" name="ay">
                    AY
                  </Input>
                </div>
                <div className="flex gap-4">
                  <Input
                    className="grow"
                    name="lastname"
                    defaultValue={session.data.user.lastName}
                    required
                  >
                    Last Name
                  </Input>
                  <Input
                    className="grow"
                    name="firstname"
                    defaultValue={session.data.user.firstName}
                    required
                  >
                    First Name
                  </Input>
                  <Input
                    className="w-36"
                    name="middleinitial"
                    defaultValue={session.data.user.middleInitial}
                    required
                  >
                    M.I
                  </Input>
                </div>
                <div className="flex gap-4 justify-start">
                  <Input className="w-36" name="studentstatus">
                    Student Status
                  </Input>
                </div>
              </div>
            </div>

            {/* PERSONAL DATA */}
            <div id="personaldata" className="flex flex-col w-full px-6">
              <span className="text-lg font-bold">Personal Data</span>
              <div className="flex pl-32 pr-10 py-7 max-w-[55rem] flex-col gap-10">
                <div className="flex gap-4">
                  <Input className="grow" name="nickname">
                    Nickname
                  </Input>
                  <Input className="grow" name="citizenship" required>
                    Citizenship
                  </Input>
                  <Input className="w-36" name="sex" required>
                    Sex
                  </Input>
                </div>
                <div className="flex gap-4">
                  <Input
                    className="grow"
                    name="contactNumber"
                    defaultValue={student.phone}
                    required
                  >
                    Contact Number
                  </Input>
                  <Input className="grow" name="religiousAffiliation" required>
                    Religious Affiliation
                  </Input>
                  <Input
                    className="w-36"
                    type="date"
                    name="birthDate"
                    required
                  >
                    Date of Birth
                  </Input>
                </div>
                <div className="flex gap-4">
                  <Input className="grow" name="placeOfBirth" required>
                    Place of Birth
                  </Input>
                </div>
                <div className="flex gap-4">
                  <Input className="grow" name="addressIligan" required>
                    Address (In Iligan City)
                  </Input>
                </div>
                <div className="flex gap-4">
                  <Input
                    className="grow"
                    name="homeAddress"
                    defaultValue={student.address}
                    required
                  >
                    Home Address
                  </Input>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-[30px] grow">
                    Civil Status
                    <div className="grid grid-cols-3 gap-7 justify-between">
                      <Radio name="civilStatus" value="single">
                        Single
                      </Radio>
                      <Radio name="civilStatus" value="married">
                        Married
                      </Radio>
                      <Radio name="civilStatus" value="notLegallyMarried">
                        Not Legally Married
                      </Radio>
                      <Radio name="civilStatus" value="separated">
                        Separated
                      </Radio>
                      <Radio name="civilStatus" value="widowed">
                        Widowed
                      </Radio>
                      <Radio name="civilStatus" value="others">
                        Others
                      </Radio>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Input className="grow" name="staysWith">
                    Stays with
                  </Input>
                  <Input className="grow" name="noChildren">
                    No. Children
                  </Input>
                </div>
                <div className="flex gap-4">
                  <Input className="grow" name="talentSkills">
                    Talent/Skills
                  </Input>
                  <Input className="grow" name="leisureRecreational">
                    Leisure/Recreational Activities
                  </Input>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-[30px] grow">
                    Working Student
                    <div className="grid grid-cols-2 gap-7 justify-between">
                      <Radio name="workingStudent" value="fulltime">
                        Yes, fulltime
                      </Radio>
                      <Radio name="workingStudent" value="parttime">
                        Yes, parttime
                      </Radio>
                      <Radio name="workingStudent" value="planningToWork">
                        No, but planning to work
                      </Radio>
                      <Radio name="workingStudent" value="noPlanToWork">
                        No, and have no plan to work
                      </Radio>
                    </div>
                  </div>
                </div>
                <Input className="grow" name="genderIdentity">
                  Gender Identity
                </Input>
                <Input className="grow" name="talentSkills">
                  To whom are you attracted to romantically, emotionally, and
                  sexually?
                </Input>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
