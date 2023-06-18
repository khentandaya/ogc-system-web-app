import React, { useEffect, useState } from "react";
import StaffNav from "@/components/staffNav";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import Staff from "@/models/Staff";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Display from "@/components/display";
import { BsPersonCircle, BsPerson, BsFileEarmarkText } from "react-icons/bs";
import Student from "@/models/Student";
import { Loader2 } from "lucide-react";

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
  // if (!req.url?.includes(".json")) {
  //   const idNumber = req.url?.slice(-9);
  //   const student = await Student.findOne({ idNumber });
  //   const studentExists = student !== null;
  //   console.log(studentExists, idNumber);
  //   return {
  //     props: {
  //       studentExists,
  //     },
  //   };
  // }
  return {
    props: {

    }
  }
}

export default function StudentInfo({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const id = router.query.id;
  const [student, setStudent] = useState<any>();
  const [assessment, setAssessment] = useState<any>();
  const [studentTabClick, setStudentTabClick] = useState(true);
  const [formsTabClick, setFormsTabClick] = useState(false);
  const [studentExists, setStudentExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get(`/api/studentprofile/${id}`).then(({ data }) => {
        if (data) {
          setStudent(data);
        }
      });
      axios.get(`/api/assessmentform/${id}`).then(({ data }) => {
        setAssessment(data);
      });
      axios.get(`/api/students?idNumber=${id}`).then(({data})=> {
        setStudentExists(data.length !== 0);
        setLoading(false);
      })
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

  if (studentExists)
    return (
      <div className="flex flex-col w-screen gap-5 gap">
        <StaffNav />
        <div className="fixed -bottom-20 -right-20 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
        <div className="fixed -left-36 top-56 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
        <div className="mx-32 flex h-[5rem] items-center justify-center p-4">
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
              <BsPerson size={23} />
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
              <BsFileEarmarkText size={20} />
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

  return (
    <div className="flex flex-col w-screen gap-5 gap">
      <StaffNav />
      <div className="fixed -bottom-20 -right-20 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
      <div className="fixed -left-36 top-56 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
      {loading ? <Loader2 className="animate-spin w-20 h-20 text-[#28407f] self-center" /> : <div className="self-center">Student Does not Exist</div>}
    </div>
  );

  function AssessmentForm() {
    return (
      <>
        <div className="flex flex-col gap-10">
          <div className="w-fit bg-gradient-to-tr from-[#28407f] to-[#01bfa8] bg-clip-text">
            <h1 className="text-2xl text-transparent">{`Student's Assessment Form`}</h1>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold mx-36">
              I have the need to improve the following:
            </p>
            {assessment?.needToImprovetheFollowing.map((el: any, i: number) => {
              return (
                <p className="pb-4 font-bold mx-44" key={i}>
                  {el}
                </p>
              );
            })}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold mx-36">I find myself _______:</p>
            {assessment?.iFindMyself.map((el: any, i: number) => {
              return (
                <p className="pb-4 font-bold mx-44" key={i}>
                  {" "}
                  {el}
                </p>
              );
            })}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold mx-36">
              I need Assistance in terms of _________:
            </p>
            {assessment?.needsAssistance.map((el: any, i: number) => {
              return (
                <p className="pb-4 font-bold mx-44" key={i}>
                  {el}
                </p>
              );
            })}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold mx-36">Personal Social:</p>
            {assessment?.personalSocial.map((el: any, i: number) => {
              return (
                <p className="pb-4 font-bold mx-44" key={i}>
                  {el}
                </p>
              );
            })}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold mx-36">
              In the past, when you experienced feeling depressed or when you
              were pushed to the limit, how did you respond?:
            </p>
            {assessment?.pushedLimitsResponse.map((el: any, i: number) => {
              return (
                <p className="pb-4 font-bold mx-44" key={i}>
                  {el}
                </p>
              );
            })}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold mx-36">
              I can easily discuss my problems with my ________:
            </p>
            {assessment?.discussProblemsWith.map((el: any, i: number) => {
              return (
                <p className="pb-4 font-bold mx-44" key={i}>
                  {el}
                </p>
              );
            })}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold mx-36">
              I can easily discuss my problems with my ________:
            </p>
            {assessment?.discussProblemsWith.map((el: any, i: number) => {
              return (
                <p className="pb-4 font-bold mx-44" key={i}>
                  {el}
                </p>
              );
            })}
          </div>
          <div className="w-fit bg-gradient-to-tr from-[#28407f] to-[#01bfa8] bg-clip-text">
            <div className="h-auto py-4 text-2xl text-transparent border-t border-slate-400">
              How often did you experience or percieve the following?
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-semibold mx-36">
              I willfully came for counseling when I had a problem
            </p>
            <p className="pb-4 font-bold mx-44">
              {assessment?.cameForCounselingWhenProblem}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold mx-36">
              I experience counseling upon refferal by teachers, friends,
              parents, etc.
            </p>
            <p className="pb-4 font-bold mx-44">
              {assessment?.experiencedCounseling}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold mx-36">
              I know that help is available at MSU-IIT Office of the Guidance
              and Counseling.
            </p>
            <p className="pb-4 font-bold mx-44">
              {assessment?.knowsTheHelpAvailable}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold mx-36">
              I am afraid to go to MSU-IIT Office of Guidance and Counseling.
            </p>
            <p className="pb-4 font-bold mx-44">
              {assessment?.afraidToGoGuidance}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold mx-36">
              I am shy ot ask assistance/seek counseling from my guidance
              counselor.
            </p>
            <p className="pb-4 font-bold mx-44">
              {assessment?.shyToAskAssistance}
            </p>
          </div>
        </div>
      </>
    );
  }

  function StudentInfo() {
    const image = student?.image + "";
    return (
      <>
        <div className="w-full">
          {student?.image ? (
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
          <Display value="College">
            {student?.college ? student?.college.toUpperCase() : ""}
          </Display>
          <Display value="AY">{student?.ay}</Display>
          <Display value="ID Number">{student?.idNumber}</Display>
          <Display value="Year Level">{student?.yrlevel}</Display>
          <Display value="SASE Score">{student?.sasescore}</Display>
        </div>
        <div className="grid grid-cols-2 gap-4 py-8 mx-32 border-b border-slate-400">
          <Display value="Nickname">
            {student?.nickname ? student?.nickname.toUpperCase() : ""}
          </Display>
          <Display value="Student Status">{student?.studentstatus}</Display>
          <Display value="Date of Birth">
            {formatUserFriendlyDate(student?.birthDate)}
          </Display>
          <Display value="Place of Birth">{student?.placeOfBirth}</Display>
          <Display value="Sex">
            {student?.sex ? student?.sex.toUpperCase() : ""}
          </Display>
          <Display value="Citizenship">
            {student?.citizenship ? student?.citizenship.toUpperCase() : ""}
          </Display>
          <Display value="Religious Affiliation">
            {student?.religiousAffiliation
              ? student?.religiousAffiliation.toUpperCase()
              : ""}
          </Display>
          <Display value="Civil Status">
            {student?.civilStatus ? student?.civilStatus.toUpperCase() : ""}
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
