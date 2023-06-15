import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { AiOutlineSave, AiOutlineLoading3Quarters } from "react-icons/ai";
import { set } from "mongoose";

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
  const [buttonLoad, setButtonLoad] = useState(false);
  const [studentData, setStudentData] = useState<any>({});
  const session = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;
    setButtonLoad(true);
    const form = new FormData(e.target);
    const formJSON = Object.fromEntries(form.entries());
    console.log(formJSON);
    await axios.post("/api/studentprofile", formJSON);
    setStudentData((old: any) => ({
      ...old,
      updatedAt: new Date().toISOString(),
    }));
    setButtonLoad(false);
  };

  const formatDateForInput = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatUserFriendlyDate = (dateString: any) => {
    const date = new Date(dateString);
    const options: object = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    if (session.data) {
      axios
        .get(`/api/studentprofile/${session?.data?.user.idNumber}`)
        .then(({ data }) => {
          setStudentData(data);
        });
    }
  }, [session]);

  if (session.status === "authenticated")
    return (
      <div className="flex items-center justify-center flex-col">
        <StudentNav />
        <div className="flex w-screen px-14 pt-9">
          <div className="pb-4 flex justify-between items-center border-b-[3px] border-slate-300 w-full">
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
            <div className="flex text-sm italic items-center gap-4 justify-between px-2">
              {studentData
                ? `Last Updated on: ${formatUserFriendlyDate(
                    studentData.updatedAt
                  )}`
                : ""}
              <Button
                type="submit"
                form="studentForm"
                className="flex items-center px-3 h-[2.5rem] gap-2 bg-[#3CFEE7] hover:bg-white hover:text-[#017869] text-gray-500 font-semibold transition-all duration-200"
              >
                {buttonLoad ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <AiOutlineSave size={25} />
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex w-full gap-20 pl-20 pt-9">
          <StudentSideNav />
          <form
            id="studentForm"
            onSubmit={handleSubmit}
            className="flex gap-6 pt-2 flex-col"
          >
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
                <div className="flex gap-4">
                  <Input
                    className="grow"
                    name="course"
                    defaultValue={studentData?.course ? studentData.course : ""}
                    required
                  >
                    Course
                  </Input>
                  <Input
                    className="w-36"
                    name="idNumber"
                    defaultValue={session.data.user.idNumber}
                    required
                  >
                    ID Number
                  </Input>
                </div>
                <div className="flex gap-4">
                  <Input
                    className="grow"
                    name="sasescore"
                    defaultValue={
                      studentData?.sasescore ? studentData.sasescore : ""
                    }
                  >
                    MSU-SASE Score
                  </Input>
                  <Input
                    className="w-36"
                    name="ay"
                    defaultValue={studentData?.ay ? studentData.ay : ""}
                  >
                    AY
                  </Input>
                </div>

                <div className="flex gap-4 justify-start">
                  <div className="flex flex-col gap-[12px] w-36">
                    <label className="px-1">College</label>
                    <select
                      className="px-2 outline-0 py-2 border-[2.5px] bg-foreground h-15 w-50 rounded-xl border-slate-300"
                      name="college"
                      defaultValue={student?.college}
                      required
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
                  <div className="flex flex-col gap-[12px] w-36">
                    <label className="px-1">Year level</label>
                    <select
                      className="px-2 outline-0 py-2 border-[2.5px] bg-foreground h-15 w-50 rounded-xl border-slate-300"
                      name="yrlevel"
                      defaultValue={studentData?.yrlevel ? studentData?.yrlevel : "" }
                      required
                    >
                      <option value="1st">1st</option>
                      <option value="2nd">2nd</option>
                      <option value="3rd">3rd</option>
                      <option value="4th">4th</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* PERSONAL DATA */}
            <div id="personaldata" className="flex flex-col w-full px-6">
              <span className="text-lg font-bold">Personal Data</span>
              <div className="flex pl-32 pr-10 py-7 max-w-[55rem] flex-col gap-10">
                <div className="flex gap-4">
                  <Input
                    className="grow"
                    name="nickname"
                    defaultValue={
                      studentData?.nickname ? studentData.nickname : ""
                    }
                  >
                    Nickname
                  </Input>
                  <Input
                    className="grow"
                    name="citizenship"
                    defaultValue={
                      studentData?.citizenship ? studentData.citizenship : ""
                    }
                    required
                  >
                    Citizenship
                  </Input>
                  <Input
                    className="w-36"
                    name="sex"
                    defaultValue={student?.gender}
                    required
                  >
                    Sex
                  </Input>
                </div>
                <div className="flex gap-4">
                  <Input
                    className="grow"
                    name="contactNumber"
                    defaultValue={student?.phone}
                    required
                  >
                    Contact Number
                  </Input>
                  <Input
                    className="grow"
                    name="religiousAffiliation"
                    defaultValue={
                      studentData?.religiousAffiliation
                        ? studentData.religiousAffiliation
                        : ""
                    }
                    required
                  >
                    Religious Affiliation
                  </Input>
                  <Input
                    className="w-36"
                    type="date"
                    name="birthDate"
                    defaultValue={formatDateForInput(
                      new Date(student?.birthdate)
                    )}
                    required
                  >
                    Date of Birth
                  </Input>
                </div>
                <div className="flex gap-4">
                  <Input
                    className="grow"
                    name="placeOfBirth"
                    defaultValue={
                      studentData?.placeOfBirth ? studentData.placeOfBirth : ""
                    }
                    required
                  >
                    Place of Birth
                  </Input>
                </div>
                <div className="flex gap-4">
                  <Input
                    className="grow"
                    name="addressIligan"
                    defaultValue={
                      studentData?.addressIligan
                        ? studentData.addressIligan
                        : ""
                    }
                  >
                    Address (In Iligan City)
                  </Input>
                </div>
                <div className="flex gap-4">
                  <Input
                    className="grow"
                    name="homeAddress"
                    defaultValue={student?.address}
                    required
                  >
                    Home Address
                  </Input>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-[30px] grow">
                    Civil Status
                    <div className="grid grid-cols-3 gap-7 justify-between">
                      <Radio
                        name="civilStatus"
                        checked={studentData?.civilStatus === "single"}
                        onClick={() => {
                          setStudentData((old: any) => ({
                            ...old,
                            civilStatus: "single",
                          }));
                        }}
                        value="single"
                      >
                        Single
                      </Radio>
                      <Radio
                        name="civilStatus"
                        checked={studentData?.civilStatus === "married"}
                        onClick={() => {
                          setStudentData((old: any) => ({
                            ...old,
                            civilStatus: "married",
                          }));
                        }}
                        value="married"
                      >
                        Married
                      </Radio>
                      <Radio
                        name="civilStatus"
                        checked={
                          studentData?.civilStatus === "notLegallyMarried"
                        }
                        onClick={() => {
                          setStudentData((old: any) => ({
                            ...old,
                            civilStatus: "notLegallyMarried",
                          }));
                        }}
                        value="notLegallyMarried"
                      >
                        Not Legally Married
                      </Radio>
                      <Radio
                        name="civilStatus"
                        checked={studentData?.civilStatus === "separated"}
                        onClick={() => {
                          setStudentData((old: any) => ({
                            ...old,
                            civilStatus: "separated",
                          }));
                        }}
                        value="separated"
                      >
                        Separated
                      </Radio>
                      <Radio
                        name="civilStatus"
                        checked={studentData?.civilStatus === "widowed"}
                        onClick={() => {
                          setStudentData((old: any) => ({
                            ...old,
                            civilStatus: "widowed",
                          }));
                        }}
                        value="widowed"
                      >
                        Widowed
                      </Radio>
                      <Radio
                        name="civilStatus"
                        checked={studentData?.civilStatus === "others"}
                        onClick={() => {
                          setStudentData((old: any) => ({
                            ...old,
                            civilStatus: "others",
                          }));
                        }}
                        value="others"
                      >
                        Others
                      </Radio>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Input
                    className="grow"
                    name="staysWith"
                    defaultValue={
                      studentData?.staysWith ? studentData.staysWith : ""
                    }
                  >
                    Stays with
                  </Input>
                  <Input
                    className="grow"
                    name="noChildren"
                    defaultValue={
                      studentData?.noChildren ? studentData.noChildren : ""
                    }
                  >
                    No. Children
                  </Input>
                </div>
                <div className="flex gap-4">
                  <Input
                    className="grow"
                    name="talentSkills"
                    defaultValue={
                      studentData?.talentSkills ? studentData.talentSkills : ""
                    }
                  >
                    Talent/Skills
                  </Input>
                  <Input
                    className="grow"
                    name="leisureRecreational"
                    defaultValue={
                      studentData?.leisureRecreational
                        ? studentData.leisureRecreational
                        : ""
                    }
                  >
                    Leisure/Recreational Activities
                  </Input>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-[30px] grow">
                    Working Student
                    <div className="grid grid-cols-2 gap-7 justify-between">
                      <Radio
                        name="workingStudent"
                        checked={studentData?.workingStudent === "fulltime"}
                        onClick={() => {
                          setStudentData((old: any) => ({
                            ...old,
                            workingStudent: "fulltime",
                          }));
                        }}
                        value="fulltime"
                      >
                        Yes, fulltime
                      </Radio>
                      <Radio
                        name="workingStudent"
                        checked={studentData?.workingStudent === "parttime"}
                        onClick={() => {
                          setStudentData((old: any) => ({
                            ...old,
                            workingStudent: "parttime",
                          }));
                        }}
                        value="parttime"
                      >
                        Yes, parttime
                      </Radio>
                      <Radio
                        name="workingStudent"
                        checked={
                          studentData?.workingStudent === "planningToWork"
                        }
                        onClick={() => {
                          setStudentData((old: any) => ({
                            ...old,
                            workingStudent: "single",
                          }));
                        }}
                        value="planningToWork"
                      >
                        No, but planning to work
                      </Radio>
                      <Radio
                        name="workingStudent"
                        checked={studentData?.workingStudent === "noPlanToWork"}
                        onClick={() => {
                          setStudentData((old: any) => ({
                            ...old,
                            workingStudent: "noPlanToWork",
                          }));
                        }}
                        value="noPlanToWork"
                      >
                        No, and have no plan to work
                      </Radio>
                    </div>
                  </div>
                </div>
                <Input
                  className="grow"
                  name="genderIdentity"
                  defaultValue={
                    studentData?.genderIdentity
                      ? studentData.genderIdentity
                      : ""
                  }
                >
                  Gender Identity
                </Input>
                <Input
                  className="grow"
                  name="toWhomareYouAttracted"
                  defaultValue={
                    studentData?.toWhomareYouAttracted
                      ? studentData.toWhomareYouAttracted
                      : ""
                  }
                >
                  To whom are you attracted to romantically, emotionally, and
                  sexually?
                </Input>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}
