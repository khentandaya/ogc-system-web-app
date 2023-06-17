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
import Radio from "@/components/radio";
import Button from "@/components/button";
import {
  AiOutlineLoading3Quarters,
  AiOutlineSave,
  AiOutlineUp,
} from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PopupModal, { ModalHandler } from "@/components/popupmodal";
import { useRouter } from "next/router";

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

type Questions = {
  needToImprovetheFollowing?: string[];
  needsAssistance?: string[];
  personalSocial?: string[];
  pushedLimitsResponse?: string[];
  discussProblemsWith?: string[];
  iFindMyself?: string[];
  cameForCounselingWhenProblem?: string;
  experiencedCounseling?: string;
  knowsTheHelpAvailable?: string;
  shyToAskAssistance?: string;
  afraidToGoGuidance?: string;
  student?: string;
};

export default function NeedsAssesmentForm({
  studentString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const student: StudentType = JSON.parse(studentString);
  const session = useSession();
  const [buttonLoad, setButtonLoad] = useState(false);
  const [answers, setAnswers] = useState<Questions>({
    needToImprovetheFollowing: [],
    needsAssistance: [],
    personalSocial: [],
    pushedLimitsResponse: [],
    discussProblemsWith: [],
    iFindMyself: [],
    cameForCounselingWhenProblem: "",
    experiencedCounseling: "",
    knowsTheHelpAvailable: "",
    shyToAskAssistance: "",
    afraidToGoGuidance: "",
    student: session.data?.user.idNumber,
  });
  const modalref = useRef<ModalHandler>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;
    setButtonLoad(true);
    const form = new FormData(e.target);
    const formJSON: Questions = Object.fromEntries(form.entries());
    modalref.current?.toggle();

    setAnswers((old) => {
      return {
        needToImprovetheFollowing: old.needToImprovetheFollowing,
        needsAssistance: old.needsAssistance,
        personalSocial: old.personalSocial,
        pushedLimitsResponse: old.pushedLimitsResponse,
        discussProblemsWith: old.discussProblemsWith,
        iFindMyself: old.iFindMyself,
        cameForCounselingWhenProblem: formJSON.cameForCounselingWhenProblem,
        experiencedCounseling: formJSON.experiencedCounseling,
        knowsTheHelpAvailable: formJSON.knowsTheHelpAvailable,
        shyToAskAssistance: formJSON.shyToAskAssistance,
        afraidToGoGuidance: formJSON.afraidToGoGuidance,
      };
    });

    e.target
      .querySelectorAll("input[type=checkbox][name=needToImprovetheFollowing]")
      .forEach((e: any) => {
        setAnswers((old: any) => {
          // check if ga exist
          if (!old.needToImprovetheFollowing?.includes(e.value) && e.checked) {
            return {
              ...old,
              needToImprovetheFollowing: [
                ...old.needToImprovetheFollowing,
                e.value,
              ],
            };
          } else if (
            old.needToImprovetheFollowing?.includes(e.value) &&
            !e.checked
          ) {
            return {
              ...old,
              needToImprovetheFollowing: old.needToImprovetheFollowing.filter(
                (x: any) => x !== e.value
              ),
            };
          }
          return {
            ...old,
          };
        });
      });

    e.target
      .querySelectorAll("input[type=checkbox][name=needsAssistance]")
      .forEach((e: any) => {
        setAnswers((old: any) => {
          // check if ga exist
          if (!old.needsAssistance?.includes(e.value) && e.checked) {
            return {
              ...old,
              needsAssistance: [...old.needsAssistance, e.value],
            };
          } else if (old.needsAssistance?.includes(e.value) && !e.checked) {
            return {
              ...old,
              needsAssistance: old.needsAssistance.filter(
                (x: any) => x !== e.value
              ),
            };
          }
          return {
            ...old,
          };
        });
      });

    e.target
      .querySelectorAll("input[type=checkbox][name=personalSocial]")
      .forEach((e: any) => {
        setAnswers((old: any) => {
          // check if ga exist
          if (!old.personalSocial?.includes(e.value) && e.checked) {
            return {
              ...old,
              personalSocial: [...old.personalSocial, e.value],
            };
          } else if (old.personalSocial?.includes(e.value) && !e.checked) {
            return {
              ...old,
              personalSocial: old.personalSocial.filter(
                (x: any) => x !== e.value
              ),
            };
          }
          return {
            ...old,
          };
        });
      });

    e.target
      .querySelectorAll("input[type=checkbox][name=pushedLimitsResponse]")
      .forEach((e: any) => {
        setAnswers((old: any) => {
          // check if ga exist
          if (!old.pushedLimitsResponse?.includes(e.value) && e.checked) {
            return {
              ...old,
              pushedLimitsResponse: [...old.pushedLimitsResponse, e.value],
            };
          } else if (
            old.pushedLimitsResponse?.includes(e.value) &&
            !e.checked
          ) {
            return {
              ...old,
              pushedLimitsResponse: old.pushedLimitsResponse.filter(
                (x: any) => x !== e.value
              ),
            };
          }
          return {
            ...old,
          };
        });
      });

    e.target
      .querySelectorAll("input[type=checkbox][name=discussProblemsWith]")
      .forEach((e: any) => {
        setAnswers((old: any) => {
          // check if ga exist
          if (!old.discussProblemsWith?.includes(e.value) && e.checked) {
            return {
              ...old,
              discussProblemsWith: [...old.discussProblemsWith, e.value],
            };
          } else if (old.discussProblemsWith?.includes(e.value) && !e.checked) {
            return {
              ...old,
              discussProblemsWith: old.discussProblemsWith.filter(
                (x: any) => x !== e.value
              ),
            };
          }
          return {
            ...old,
          };
        });
      });

    e.target
      .querySelectorAll("input[type=checkbox][name=iFindMyself]")
      .forEach((e: any) => {
        setAnswers((old: any) => {
          // check if ga exist
          if (!old.iFindMyself?.includes(e.value) && e.checked) {
            return {
              ...old,
              iFindMyself: [...old.iFindMyself, e.value],
            };
          } else if (old.iFindMyself?.includes(e.value) && !e.checked) {
            return {
              ...old,
              iFindMyself: old.iFindMyself.filter((x: any) => x !== e.value),
            };
          }
          return {
            ...old,
          };
        });
      });

    setAnswers((old) => {
      old.student = session.data?.user.idNumber;
      axios.post("/api/needsaform", old).then(({ data }) => {
        console.log(data);
        setButtonLoad(false);
      });
      return old;
    });

    // setStudentData((old: any) => ({
    //   ...old,
    //   updatedAt: new Date().toISOString(),
    // }));
  };

  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const isTop = scrollTop === 0;
      setIsScrolled(!isTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(()=>{
    axios.get(`/api/needsaform/`).then(({data})=>{
      console.log(data)
    })
  },[session])

  if (session.status === "authenticated")
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="fixed -bottom-20 -right-20 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
        <div className="fixed -left-36 top-56 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
        <StudentNav />
        {isScrolled ? (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-10 -mr-[60rem] flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#83e8ef] hover:bg-white hover:text-[#017869]"
          >
            <AiOutlineUp size={23} />
          </Button>
        ) : (
          ""
        )}
        <div className="sticky top-0 flex w-screen px-14 pt-9 backdrop-blur-3xl">
          <div className="flex w-full items-center justify-between border-b-[3px] border-slate-300 pb-4">
            <p className="text-3xl font-bold">
              <span className="w-fit bg-gradient-to-tr from-[#28407f] to-[#01bfa8] bg-clip-text">
                <span className="text-transparent">Needs Assessment</span>
              </span>
              <br />
              <span className="text-base font-semibold text-slate-600">
                We Ensure that your data is confidential
              </span>
            </p>
            <Button
              type="submit"
              form="needsAssesmentForm"
              className="top-10 flex h-[2.5rem] items-center gap-2 bg-[#83e8ef] px-3 font-semibold text-gray-500 transition-all duration-200 hover:bg-white hover:text-[#017869]"
            >
              {buttonLoad ? (
                <div className="flex items-center gap-2">
                  <AiOutlineLoading3Quarters
                    size={20}
                    className="animate-spin"
                  />
                  <p>Saving</p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <AiOutlineSave size={20} />
                  <p>Save</p>
                </div>
              )}
            </Button>
          </div>
        </div>
        <div className="flex w-full pl-36 pt-9">
          <div className="flex flex-col gap-6 pt-2">
            <div className="flex flex-col px-6">
              <span className="text-lg font-bold">Assessment Form</span>
              <div className="flex max-w-[55rem] flex-col gap-10 py-7 pl-32 pr-10">
                <form
                  id="needsAssesmentForm"
                  onSubmit={handleSubmit}
                  className="flex flex-col justify-around gap-4"
                >
                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I have the need to improve the following___________ (Please
                    check all that apply to you)
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Study habits"
                      >
                        Study habits
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Career decisions"
                      >
                        Career decisions
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Memory skills"
                      >
                        Memory skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Reading Speed"
                      >
                        Reading Speed
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Note-taking"
                      >
                        Note-taking
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Math skills"
                      >
                        Math skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Test skills"
                      >
                        Test skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Time management"
                      >
                        Time management
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Reading Comprehension"
                      >
                        Reading <br /> Comprehension
                      </Checkbox>
                      <Checkbox name="needToImprovetheFollowing" value="Others">
                        Others
                      </Checkbox>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I need assistance in terms of___________ (Please check all
                    that apply to you)
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Checkbox name="needsAssistance" value="Personal budget">
                        Personal budget
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Grants/scholarships"
                      >
                        Grants/
                        <br />
                        scholarships
                      </Checkbox>
                      <Checkbox name="needsAssistance" value="Loans">
                        Loans
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Coping with peer pressure"
                      >
                        Coping with peer <br /> pressure
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Sexual harassment"
                      >
                        Sexual harassment
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Student-teacher conflict"
                      >
                        Student-teacher
                        <br /> conflict
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Depression/Sadness"
                      >
                        Depression <br />
                        /Sadness
                      </Checkbox>
                      <Checkbox name="needsAssistance" value="Motivation">
                        Motivation
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Self-image (how you feel about yourself)"
                      >
                        Self-image (how you <br /> feel about yourself)
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Grief/loss due to parental separation"
                      >
                        Grief/loss due to <br /> parental separation
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Others, please specify: ___________________"
                      >
                        Others, please <br /> specify:
                        <br />
                        ___________________
                      </Checkbox>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    Personal-Social:
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Checkbox name="personalSocial" value="Stress management">
                        Stress management
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Substance absolute"
                      >
                        Substance absolute
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Dealing with relationships (Boy/Girl)"
                      >
                        Dealing with
                        <br /> relationships
                        <br /> (Boy/Girl)
                      </Checkbox>
                      <Checkbox name="personalSocial" value="Anxiety">
                        Anxiety
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Handling conflicts/anger"
                      >
                        Handling <br /> conflicts/anger
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Coping with physical disability"
                      >
                        Coping with physical <br /> disability
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Student-teacher/school personnel relationship"
                      >
                        Student- <br />
                        teacher/school
                        <br /> personnel
                        <br /> relationship
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Grief/loss due to death"
                      >
                        Grief/loss due to
                        <br /> death
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Physical/psychological abuse"
                      >
                        Physical/
                        <br />
                        psychological <br /> abuse
                      </Checkbox>
                      <Checkbox name="personalSocial" value="Bullying">
                        Bullying
                      </Checkbox>
                      <Checkbox name="personalSocial" value="Cyber-bullying">
                        Cyber-bullying
                      </Checkbox>
                      <Checkbox name="personalSocial" value="Others">
                        Others
                      </Checkbox>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    In the past, when you experienced feeling depressed or when
                    you were pushed to the limit, how did you respond? (Please
                    check all that apply to you)
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Tried to be funny and make light of it all"
                      >
                        Tried to be funny <br /> and make light
                        <br /> of it all
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Talked to a teacher or counselor in school"
                      >
                        Talked to a <br /> teacher or <br /> counselor in school
                      </Checkbox>
                      <Checkbox name="pushedLimitsResponse" value="Ate food">
                        Ate food
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Tried to stay away from home"
                      >
                        Tried to stay away <br /> from home
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Drank beer, wine, liquor"
                      >
                        Drank beer, wine, <br /> liquor
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Used drugs not prescribed by doctor"
                      >
                        Used drugs not <br /> prescribed by doctor
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Listened to music"
                      >
                        Listened to music
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Watched movies or TV shows"
                      >
                        Watched movies <br /> or TV shows
                      </Checkbox>
                      <Checkbox name="pushedLimitsResponse" value="Smoked">
                        Smoked
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Tried to solve my problem."
                      >
                        Tried to solve <br /> my problem.
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Read books, novels, etc."
                      >
                        Read books, <br /> novels, etc.
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Worked hard on school work/projects"
                      >
                        Worked hard on <br /> school work/projects
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Attempted to end my life"
                      >
                        Attempted to <br /> end my life
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Got more involved in school activities"
                      >
                        Got more involved <br /> in school activities
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Tried to make my own decision"
                      >
                        Tried to make my <br /> own decision
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Talked things out with parents"
                      >
                        Talked things out <br /> with parents
                      </Checkbox>
                      <Checkbox name="pushedLimitsResponse" value="Cried">
                        Cried
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Tried to improve myself (get body in shape, get good grades, etc.)"
                      >
                        Tried to improve <br /> myself (get body <br /> in
                        shape, get
                        <br /> good grades, etc.)
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Strolled around on a car/jeepney-ride"
                      >
                        Strolled around <br /> on a car/jeepney
                        <br /> -ride
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Tried to think of the good things in life"
                      >
                        Tried to think <br /> of the good things
                        <br /> in life
                      </Checkbox>
                      <Checkbox name="pushedLimitsResponse" value="Prayed">
                        Prayed
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Thought it would be better dead"
                      >
                        Thought it <br /> would be better
                        <br /> dead
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Talked to a minister/priest/pastor"
                      >
                        Talked to a <br /> minister/priest
                        <br /> /pastor
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Told myself the problem is not important"
                      >
                        Told myself the <br /> problem is <br />
                        not important
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Blamed others for what went wrong"
                      >
                        Blamed others <br /> for what went
                        <br /> wrong
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Played video games"
                      >
                        Played video <br /> games
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Surfed the internet"
                      >
                        Surfed the internet
                      </Checkbox>
                      <Checkbox name="pushedLimitsResponse" value="Hurt myself">
                        Hurt myself
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Talked to a friend"
                      >
                        Talked to a friend
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Daydreamed about how I would like things to be"
                      >
                        Daydreamed about <br /> how I would
                        <br /> like things to be
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Got professional counseling"
                      >
                        Got professional <br /> counseling
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Went to church"
                      >
                        Went to church
                      </Checkbox>
                      <Checkbox name="pushedLimitsResponse" value="Slept">
                        Slept
                      </Checkbox>
                      <Checkbox name="pushedLimitsResponse" value="Got angry">
                        Got angry
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Kept my silence"
                      >
                        Kept my silence
                      </Checkbox>
                      <Checkbox name="pushedLimitsResponse" value="Others">
                        Others
                      </Checkbox>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I can easily discuss my problems with my ___________ (Please
                    check only one.)
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Checkbox
                        name="discussProblemsWith"
                        value="Guidance counselor in school"
                      >
                        Guidance counselor <br /> in school
                      </Checkbox>
                      <Checkbox name="discussProblemsWith" value="Parents">
                        Parents
                      </Checkbox>
                      <Checkbox name="discussProblemsWith" value="Teacher(s)">
                        Teacher(s)
                      </Checkbox>
                      <Checkbox
                        name="discussProblemsWith"
                        value="Brothers/Sisters"
                      >
                        Brothers/Sisters
                      </Checkbox>
                      <Checkbox
                        name="discussProblemsWith"
                        value="Friends/Relatives"
                      >
                        Friends/Relatives
                      </Checkbox>
                      <Checkbox name="discussProblemsWith" value="Nobody">
                        Nobody
                      </Checkbox>
                      <Checkbox name="discussProblemsWith" value="Others">
                        Others
                      </Checkbox>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I find myself ___________ (Please check any of the following
                    items which describe you)
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Checkbox
                        name="iFindMyself"
                        value="Afraid of failing in subjects"
                      >
                        Afraid of failing <br /> in subjects
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having difficulty finding child care (for married students)"
                      >
                        Having difficulty <br /> finding child care <br /> (for
                        married students)
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Afraid I might not fit at MSU-IIT"
                      >
                        Afraid I might not <br /> fit at MSU-IIT
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having difficulty socializing with people"
                      >
                        Having difficulty <br /> socializing with <br /> people
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Panicking during test"
                      >
                        Panicking during <br /> test
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Getting along with teachers"
                      >
                        Getting along with <br /> teachers
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Struggling with sexual identity"
                      >
                        Struggling with <br /> sexual identity
                      </Checkbox>
                      <Checkbox name="iFindMyself" value="Always feeling tired">
                        Always feeling tired
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having health problems"
                      >
                        Having health <br /> problems
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having no financial/emotion support from family and friends"
                      >
                        Having no financial/ <br /> emotion support <br /> from
                        family and friends
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Taking things seriously"
                      >
                        Taking things <br /> seriously
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Anxious to approach teachers"
                      >
                        Anxious to approach <br /> teachers
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having problems with spouse"
                      >
                        Having problems <br /> with spouse
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Afraid I might not fit with my degree course"
                      >
                        Afraid I might not fit <br /> with my degree course
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Unsure of college procedures"
                      >
                        Unsure of college <br /> procedures
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having difficulty participating in class"
                      >
                        Having difficulty <br /> participating in class
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having difficulty participating in online class"
                      >
                        Having difficulty <br /> participating in <br /> online
                        class
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having difficulty managing money"
                      >
                        Having difficulty <br /> managing money
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Struggling in meeting requirement deadlines"
                      >
                        Struggling in meeting <br /> requirement deadlines
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Struggling to make my family undestand college demands"
                      >
                        Struggling to make my <br /> family undestand <br />{" "}
                        college demands
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Missing my family/home"
                      >
                        Missing my family/home
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Adjusting w/boardmates"
                      >
                        Adjusting w/boardmates
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having problems at home"
                      >
                        Having problems at home
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having trouble sleeping"
                      >
                        Having trouble sleeping
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Afraid to speak up in class"
                      >
                        Afraid to speak up in class
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Gets easily distracted"
                      >
                        Gets easily distracted
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having no close friend in school"
                      >
                        Having no close friend <br /> in school
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having suicidal thoughts"
                      >
                        Having suicidal thoughts
                      </Checkbox>
                      <Checkbox name="iFindMyself" value="Others">
                        Others
                      </Checkbox>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I willfully came for counseling when I had a problem
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Radio name="cameForCounselingWhenProblem" value="Always">
                        Always
                      </Radio>
                      <Radio
                        name="cameForCounselingWhenProblem"
                        value="Oftentimes"
                      >
                        Oftentimes
                      </Radio>
                      <Radio
                        name="cameForCounselingWhenProblem"
                        value="Sometimes"
                      >
                        Sometimes
                      </Radio>
                      <Radio name="cameForCounselingWhenProblem" value="Never">
                        Never
                      </Radio>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I experienced counseling upon referral by teachers, friends,
                    parents, etc.
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Radio name="experiencedCounseling" value="Always">
                        Always
                      </Radio>
                      <Radio name="experiencedCounseling" value="Oftentimes">
                        Oftentimes
                      </Radio>
                      <Radio name="experiencedCounseling" value="Sometimes">
                        Sometimes
                      </Radio>
                      <Radio name="experiencedCounseling" value="Never">
                        Never
                      </Radio>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I know that help is available at the Guidance and Counseling
                    Center of MSU-IIT.
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Radio name="knowsTheHelpAvailable" value="Always">
                        Always
                      </Radio>
                      <Radio name="knowsTheHelpAvailable" value="Oftentimes">
                        Oftentimes
                      </Radio>
                      <Radio name="knowsTheHelpAvailable" value="Sometimes">
                        Sometimes
                      </Radio>
                      <Radio name="knowsTheHelpAvailable" value="Never">
                        Never
                      </Radio>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I am shy to ask assistance/seek counseling from my guidance
                    counselor.
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Radio name="shyToAskAssistance" value="Always">
                        Always
                      </Radio>
                      <Radio name="shyToAskAssistance" value="Oftentimes">
                        Oftentimes
                      </Radio>
                      <Radio name="shyToAskAssistance" value="Sometimes">
                        Sometimes
                      </Radio>
                      <Radio name="shyToAskAssistance" value="Never">
                        Never
                      </Radio>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I am afraid to go to the Guidance and Counseling Center of
                    MSU-IIT.
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Radio name="afraidToGoGuidance" value="Always">
                        Always
                      </Radio>
                      <Radio name="afraidToGoGuidance" value="Oftentimes">
                        Oftentimes
                      </Radio>
                      <Radio name="afraidToGoGuidance" value="Sometimes">
                        Sometimes
                      </Radio>
                      <Radio name="afraidToGoGuidance" value="Never">
                        Never
                      </Radio>
                    </div>
                  </div>
                </form>
                <PopupModal ref={modalref}>
                  <div className="flex flex-col gap-5 rounded-lg border bg-white p-4 shadow">
                    <h2 className="text-xl font-semibold">
                      Answer Saved Successfully!🎉
                    </h2>
                    <Button
                      className="h-[2.5rem] py-1 self-end bg-[#83e8ef] text-gray-500 hover:bg-[#FDFDFD] hover:text-[#017869]"
                      onClick={() => {
                        router.push("/studentview")
                        modalref.current?.toggle()
                      }}
                    >
                      Go back to Home
                    </Button>
                  </div>
                </PopupModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
