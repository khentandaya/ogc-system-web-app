import React, { useEffect, useState } from "react";
import StaffNav from "@/components/staffNav";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import Staff from "@/models/Staff";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Display from "@/components/display";
import {
  BsPersonCircle,
  BsPerson,
  BsFileEarmarkText,
} from "react-icons/bs";

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
  const [assessment, setAssessment] = useState<any>();
  const [studentTabClick, setStudentTabClick] = useState(true);
  const [formsTabClick, setFormsTabClick] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`/api/studentprofile/${id}`).then(({ data }) => {
        setStudent(data);
      });
      axios.get(`/api/assessmentform/${id}`).then(({ data }) => {
        console.log(data);
        setAssessment(data);
      });
    }
  }, [id]);

  const formatUserFriendlyDate = (dateString: any) => {
    const date = new Date(dateString);
    const options: object = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex flex-col w-screen gap-5 gap">
      <StaffNav />
      <div className="fixed -bottom-20 -right-20 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
      <div className="fixed -left-36 top-56 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
      <div className="mx-32 flex h-[5rem] items-center justify-start p-4">
        <div className="flex h-[3rem] items-center justify-center gap-1 rounded-2xl bg-[#cceff6] p-2 py-1 ">
          <div
            onClick={() => {
              setStudentTabClick(true);
              setFormsTabClick(false);
            }}
            className={` ${
              studentTabClick ? "rounded-xl bg-[#FDFDFD]" : ""
            } flex h-[2rem] w-[13rem] cursor-pointer items-center justify-center gap-2`}
          >
            <BsPerson size={20} />
            {`Student's Profile`}
          </div>

          <div
            onClick={() => {
              setStudentTabClick(false);
              setFormsTabClick(true);
            }}
            className={` ${
              formsTabClick ? "rounded-xl bg-[#FDFDFD]" : ""
            } flex h-[2rem] w-[13rem] cursor-pointer items-center justify-center gap-2`}
          >
            <BsFileEarmarkText size={17} />
            {`Needs Assessment Form`}
          </div>
        </div>
      </div>
      <div className="mx-32 flex h-[30rem] flex-col gap-5 overflow-y-scroll p-2">
        {studentTabClick ? (
          <StudentInfo />
        ) : formsTabClick ? (
          <AssessmentForm />
        ) : (
          ""
        )}
      </div>
    </div>
  );

  function AssessmentForm() {
    return <></>;
  }

  function StudentInfo() {
    const image = student?.image + "";
    return (
      <>
        <div className="w-full">
          {student ? (
            <Image
              src={image}
              alt={"user_avatar"}
              width={120}
              height={120}
              className="border-4 rounded-full shadow-xl"
            />
          ) : (
            <BsPersonCircle className="text-black/20" size={120} />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 py-8 mx-32 border-b border-slate-400">
          <Display value="First Name">{student?.firstname}</Display>
          <Display value="Last Name">{student?.lastname}</Display>
          <Display value="College">{student?.college.toUpperCase()}</Display>
          <Display value="AY">{student?.ay}</Display>
          <Display value="ID Number">{student?.idNumber}</Display>
          <Display value="Year Level">{student?.yrlevel}</Display>
          <Display value="SASE Score">{student?.sasescore}</Display>
        </div>
        <div className="grid grid-cols-2 gap-4 py-8 mx-32 border-b border-slate-400">
          <Display value="Nickname">{student?.nickname.toUpperCase()}</Display>
          <Display value="Student Status">{student?.studentstatus}</Display>
          <Display value="Date of Birth">
            {formatUserFriendlyDate(student?.birthDate)}
          </Display>
          <Display value="Place of Birth">{student?.placeOfBirth}</Display>
          <Display value="Sex">{student?.sex.toUpperCase()}</Display>
          <Display value="Citizenship">
            {student?.citizenship.toUpperCase()}
          </Display>
          <Display value="Religious Affiliation">
            {student?.religiousAffiliation.toUpperCase()}
          </Display>
          <Display value="Civil Status">
            {student?.civilStatus.toUpperCase()}
          </Display>
          <Display value="No. of Children">{student?.nochildren}</Display>
          <Display value="Home Address.">{student?.homeAddress}</Display>
          <Display value="Contact No.">{student?.contactNumber}</Display>
          <Display value="Stays With">{student?.staysWith}</Display>
          <Display value="Working Student">{student?.workingStudent}</Display>
          <Display value="Talent/Skills">{student?.talentSkills}</Display>
          <Display value="Leisure/Recreational">
            {student?.leisureRecreational}
          </Display>
          <Display value="Gender Identity">{student?.genderIdentity}</Display>
          <Display value="To whom are you attracted to romanbtically, emotionally, and sexually?">
            {student?.toWhomareYouAttracted}
          </Display>
        </div>
      </>
    );
  }
}
