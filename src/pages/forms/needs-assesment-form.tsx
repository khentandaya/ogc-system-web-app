import StudentNav from "@/components/studentNav";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Student from "@/models/Student";
import { useSession } from "next-auth/react";
import StudentType from "@/types/Student";
import Checkbox from "@/components/checkbox";

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
  const student: StudentType = JSON.parse(studentString);
  const session = useSession();

  if (session.status === "authenticated")
    return (
      <div className="flex flex-col items-center justify-center">
        <StudentNav />
        <div className="flex w-screen px-14 pt-9">
          <div className="pb-4 relative border-b-[3px] border-slate-300 w-full">
            <p className="text-3xl font-bold">
              <span className="bg-gradient-to-tr from-[#28407f] w-fit bg-clip-text to-[#01bfa8]">
                <span className="text-transparent">
                  Needs Assessment
                </span>
              </span>
              <br />
              <span className="text-base font-semibold text-slate-600">
                We Ensure that your data is confidential
              </span>
            </p>
          </div>
        </div>
        <div className="flex w-full pl-36 pt-9">
          <div className="flex gap-6 pt-2 flex-col">
            <div className="flex flex-col px-6">
              <span className="text-lg font-bold">Assessment Form</span>
              <div className="flex pl-32 pr-10 py-7 max-w-[55rem] flex-col gap-10">
                <div className="flex flex-col gap-4 justify-around">
                  <div className="flex flex-col font-semibold pb-4 gap-[30px] grow">
                    I have the need to improve the following___________ (Please
                    check all that apply to you)
                    <div className="grid grid-cols-4 gap-5 justify-between">
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="studyHabits"
                      >
                        Study habits
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="careerDecisions"
                      >
                        Career decisions
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="memorySkills"
                      >
                        Memory skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingSpeed"
                      >
                        Reading Speed
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="noteTaking"
                      >
                        Note-taking
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="mathSkills"
                      >
                        Math skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="testSkills"
                      >
                        Test skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="timeManagement"
                      >
                        Time management
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Reading <br />
                        Comprehension
                      </Checkbox>
                      <Checkbox name="needToImprovetheFollowing" value="others">
                        Others
                      </Checkbox>
                    </div>
                  </div>

                  <div className="flex flex-col font-semibold pb-4 gap-[30px] grow">
                    I need assistance in terms of___________ (Please check all
                    that apply to you)
                    <div className="grid grid-cols-4 gap-5 justify-between">
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="studyHabits"
                      >
                        Study habits
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="careerDecisions"
                      >
                        Career decisions
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="memorySkills"
                      >
                        Memory skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingSpeed"
                      >
                        Reading Speed
                      </Checkbox>
                    </div>
                  </div>

                  <div className="flex flex-col font-semibold pb-4 gap-[30px] grow">
                    Personal-Social:
                    <div className="grid grid-cols-4 gap-5 justify-between">
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="studyHabits"
                      >
                        Study habits
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="careerDecisions"
                      >
                        Career decisions
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="memorySkills"
                      >
                        Memory skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingSpeed"
                      >
                        Reading Speed
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="noteTaking"
                      >
                        Note-taking
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="mathSkills"
                      >
                        Math skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="testSkills"
                      >
                        Test skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="timeManagement"
                      >
                        Time management
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Reading <br />
                        Comprehension
                      </Checkbox>
                      <Checkbox name="needToImprovetheFollowing" value="others">
                        Others
                      </Checkbox>
                    </div>
                  </div>


                  <div className="flex flex-col font-semibold pb-4 gap-[30px] grow">
                    In the past, when you experienced feeling depressed or when
                    you were pushed to the limit, how did you respond? (Please
                    check all that apply to you)
                    <div className="grid grid-cols-4 gap-5 justify-between">
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="studyHabits"
                      >
                        Study habits
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="careerDecisions"
                      >
                        Career decisions
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="memorySkills"
                      >
                        Memory skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingSpeed"
                      >
                        Reading Speed
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="noteTaking"
                      >
                        Note-taking
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="mathSkills"
                      >
                        Math skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="testSkills"
                      >
                        Test skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="timeManagement"
                      >
                        Time management
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Reading <br />
                        Comprehension
                      </Checkbox>
                      <Checkbox name="needToImprovetheFollowing" value="others">
                        Others
                      </Checkbox>
                    </div>
                  </div>

                  <div className="flex flex-col font-semibold pb-4 gap-[30px] grow">
                   I find myself ___________ (Please check any of the following items which describe you)
                    <div className="grid grid-cols-4 gap-5 justify-between">
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="studyHabits"
                      >
                        Afraid of failing in subjects
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="careerDecisions"
                      >
                        Having difficulty finding child care (for married students)
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="memorySkills"
                      >
                        Afraid I might not fit at MSU-IIT
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingSpeed"
                      >
                        Having difficulty socializing with people
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="noteTaking"
                      >
                        Panicking during test
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="mathSkills"
                      >
                        Getting along with teachers
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="testSkills"
                      >
                        Struggling with sexual identify
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="timeManagement"
                      >
                        Always feeling tired
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Having health problems
                      </Checkbox>

                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Having no financial/emotion support from family and friends
                      </Checkbox>

                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Taking things seriously
                      </Checkbox>

                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Anxious to approach teachers
                      </Checkbox>

                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Having problems with spouse
                      </Checkbox>

                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Afraid I might not fit with my degree course
                      </Checkbox>

                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Unsure of college procedures

                      </Checkbox>

                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Having difficulty participating in class
                      </Checkbox>

                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Having difficulty participating in online class
                      </Checkbox>

                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Having difficulty managing money
                      </Checkbox>

                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Struggling in the meeting requirement deadlines
                      </Checkbox>

                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Struggling to make my family undestand college demands
                      </Checkbox>

                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Missing my family/home
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Adjusting w/boardmates
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Having problems at home
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Having trouble sleeping
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Afraid to speak up in class
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Gets easily distracted
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Having no close friend in school
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="readingComprehension"
                      >
                        Having suicidal thoughts
                      </Checkbox>
                      
                      <Checkbox name="needToImprovetheFollowing" value="others">
                        Others
                      </Checkbox>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
