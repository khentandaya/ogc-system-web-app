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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

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
    student: "",
  });
  const modalref = useRef<ModalHandler>(null);
  const router = useRouter();
  const [exist, setExist] = useState(false);
  const [toggleVerify, setToggleVerify] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;
    setButtonLoad(true);
    const form = new FormData(e.target);
    const formJSON: Questions = Object.fromEntries(form.entries());

    setAnswers((old) => {
      return {
        needToImprovetheFollowing: [],
        needsAssistance: [],
        personalSocial: [],
        pushedLimitsResponse: [],
        discussProblemsWith: [],
        iFindMyself: [],
        cameForCounselingWhenProblem: formJSON.cameForCounselingWhenProblem,
        experiencedCounseling: formJSON.experiencedCounseling,
        knowsTheHelpAvailable: formJSON.knowsTheHelpAvailable,
        shyToAskAssistance: formJSON.shyToAskAssistance,
        afraidToGoGuidance: formJSON.afraidToGoGuidance,
        student: session.data?.user.idNumber,
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
      console.log(old);
      axios.post("/api/needsaform", old).then(({ data }) => {
        // console.log(data);
        setButtonLoad(false);
      });
      return old;
    });
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

  useEffect(() => {
    axios
      .get(`/api/needsaform?student=${session.data?.user.idNumber}`)
      .then(({ data }) => {
        if (data) setExist(true);
        setAnswers(data);
      });
  }, [session]);

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
            <Dialog>
              <DialogTrigger disabled={exist} className="self-center">
                <Button
                  disabled={exist}
                  className={`top-10 flex h-[2.5rem] items-center gap-2 rounded-lg border bg-[#83e8ef] px-3 font-semibold text-gray-500 transition-all duration-200 hover:bg-white hover:text-[#017869] ${
                    exist ? "cursor-not-allowed" : ""
                  }`}
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
                      <p>{exist ? "You have already submitted" : "Save"}</p>
                    </div>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="data-[state=open]:animate-contentShow">
                <DialogHeader className="text-xl font-semibold text-[#28407f]">
                  {!toggleVerify
                    ? "Are you sure?"
                    : "Answer Saved Successfully!🎉"}
                </DialogHeader>
                {!toggleVerify ? (
                  <p className="">
                    Please note that this action is irreversible and cannot be
                    modified once submitted.
                  </p>
                ) : (
                  ""
                )}
                <div
                  className={`${
                    toggleVerify ? "flex" : ""
                  }grid grid-cols-2 gap-5`}
                >
                  {!toggleVerify ? (
                    <DialogClose className="grow rounded-lg  border bg-gradient-to-r from-[#E74646] to-[#FA9884] py-2 text-[#FDFDFD] transition-colors duration-700 hover:bg-gradient-to-l">
                      Cancel
                    </DialogClose>
                  ) : (
                    <DialogClose className="w-full rounded-lg  border bg-[#28407f] py-2 text-[#FDFDFD] transition-all duration-100 hover:bg-[#FDFDFD] hover:text-[#28407f]">
                      Close
                    </DialogClose>
                  )}
                  <Button
                    type="submit"
                    form="needsAssesmentForm"
                    onClick={() => {
                      setToggleVerify(true);
                      console.log("clicked");
                    }}
                    className={`w-full ${
                      toggleVerify ? "hidden" : ""
                    } rounded-lg border bg-[#28407f] py-2 text-[#FDFDFD] transition-all duration-100 hover:bg-[#FDFDFD] hover:text-[#28407f]`}
                  >
                    Proceed
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Study habits"
                        )}
                      >
                        Study habits
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Career decisions"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Career decisions"
                        )}
                      >
                        Career decisions
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Memory skills"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Memory skills"
                        )}
                      >
                        Memory skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Reading Speed"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Reading Speed"
                        )}
                      >
                        Reading Speed
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Note-taking"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Note-taking"
                        )}
                      >
                        Note-taking
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Math skills"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Math skills"
                        )}
                      >
                        Math skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Test skills"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Test skills"
                        )}
                      >
                        Test skills
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Time management"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Time management"
                        )}
                      >
                        Time management
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Reading Comprehension"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Reading Comprehension"
                        )}
                      >
                        Reading <br /> Comprehension
                      </Checkbox>
                      <Checkbox
                        name="needToImprovetheFollowing"
                        value="Others"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Others"
                        )}
                      >
                        Others
                      </Checkbox>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I need assistance in terms of___________ (Please check all
                    that apply to you)
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Checkbox
                        name="needsAssistance"
                        value="Personal budget"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Personal budget"
                        )}
                      >
                        Personal budget
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Grants/scholarships"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Grants/scholarships"
                        )}
                      >
                        Grants/
                        <br />
                        scholarships
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Loans"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Loans"
                        )}
                      >
                        Loans
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Coping with peer pressure"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Coping with peer pressure"
                        )}
                      >
                        Coping with peer <br /> pressure
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Sexual harassment"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Sexual harassment"
                        )}
                      >
                        Sexual harassment
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Student-teacher conflict"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Student-teacher conflict"
                        )}
                      >
                        Student-teacher
                        <br /> conflict
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Depression/Sadness"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Depression/Sadness"
                        )}
                      >
                        Depression <br />
                        /Sadness
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Motivation"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Motivation"
                        )}
                      >
                        Motivation
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Self-image (how you feel about yourself)"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Self-image (how you feel about yourself)"
                        )}
                      >
                        Self-image (how you <br /> feel about yourself)
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Grief/loss due to parental separation"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Grief/loss due to parental separation"
                        )}
                      >
                        Grief/loss due to <br /> parental separation
                      </Checkbox>
                      <Checkbox
                        name="needsAssistance"
                        value="Others"
                        checked={answers?.needToImprovetheFollowing?.includes(
                          "Others"
                        )}
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
                      <Checkbox
                        name="personalSocial"
                        value="Stress management"
                        checked={answers?.personalSocial?.includes(
                          "Stress management"
                        )}
                      >
                        Stress management
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Substance abuse"
                        checked={answers?.personalSocial?.includes(
                          "Substance abuse"
                        )}
                      >
                        Substance abuse
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Dealing with relationships (Boy/Girl)"
                        checked={answers?.personalSocial?.includes(
                          "Dealing with relationships (Boy/Girl)"
                        )}
                      >
                        Dealing with <br /> relationships <br /> (Boy/Girl)
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Anxiety"
                        checked={answers?.personalSocial?.includes("Anxiety")}
                      >
                        Anxiety
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Handling conflicts/anger"
                        checked={answers?.personalSocial?.includes(
                          "Handling conflicts/anger"
                        )}
                      >
                        Handling <br /> conflicts/anger
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Coping with physical disability"
                        checked={answers?.personalSocial?.includes(
                          "Coping with physical disability"
                        )}
                      >
                        Coping with physical <br /> disability
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Student-teacher/school personnel relationship"
                        checked={answers?.personalSocial?.includes(
                          "Student-teacher/school personnel relationship"
                        )}
                      >
                        Student- <br /> teacher/school <br /> personnel <br />{" "}
                        relationship
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Grief/loss due to death"
                        checked={answers?.personalSocial?.includes(
                          "Grief/loss due to death"
                        )}
                      >
                        Grief/loss due to <br /> death
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Physical/psychological abuse"
                        checked={answers?.personalSocial?.includes(
                          "Physical/psychological abuse"
                        )}
                      >
                        Physical/ <br /> psychological <br /> abuse
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Bullying"
                        checked={answers?.personalSocial?.includes("Bullying")}
                      >
                        Bullying
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Cyber-bullying"
                        checked={answers?.personalSocial?.includes(
                          "Cyber-bullying"
                        )}
                      >
                        Cyber-bullying
                      </Checkbox>
                      <Checkbox
                        name="personalSocial"
                        value="Others"
                        checked={answers?.personalSocial?.includes("Others")}
                      >
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
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Tried to be funny and make light of it all"
                        )}
                      >
                        Tried to be funny <br /> and make light <br /> of it all
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Talked to a teacher or counselor in school"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Talked to a teacher or counselor in school"
                        )}
                      >
                        Talked to a <br /> teacher or <br /> counselor in school
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Ate food"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Ate food"
                        )}
                      >
                        Ate food
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Tried to stay away from home"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Tried to stay away from home"
                        )}
                      >
                        Tried to stay away <br /> from home
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Drank beer, wine, liquor"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Drank beer, wine, liquor"
                        )}
                      >
                        Drank beer, wine, <br /> liquor
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Used drugs not prescribed by doctor"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Used drugs not prescribed by doctor"
                        )}
                      >
                        Used drugs not <br /> prescribed by doctor
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Listened to music"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Listened to music"
                        )}
                      >
                        Listened to music
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Watched movies or TV shows"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Watched movies or TV shows"
                        )}
                      >
                        Watched movies <br /> or TV shows
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Smoked"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Smoked"
                        )}
                      >
                        Smoked
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Tried to solve my problem."
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Tried to solve my problem."
                        )}
                      >
                        Tried to solve <br /> my problem.
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Read books, novels, etc."
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Read books, novels, etc."
                        )}
                      >
                        Read books, <br /> novels, etc.
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Worked hard on school work/projects"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Worked hard on school work/projects"
                        )}
                      >
                        Worked hard on <br /> school work/projects
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Attempted to end my life"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Attempted to end my life"
                        )}
                      >
                        Attempted to <br /> end my life
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Got more involved in school activities"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Got more involved in school activities"
                        )}
                      >
                        Got more involved <br /> in school activities
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Tried to make my own decision"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Tried to make my own decision"
                        )}
                      >
                        Tried to make my <br /> own decision
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Talked things out with parents"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Talked things out with parents"
                        )}
                      >
                        Talked things out <br /> with parents
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Cried"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Cried"
                        )}
                      >
                        Cried
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Tried to improve myself (get body in shape, get good grades, etc.)"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Tried to improve myself (get body in shape, get good grades, etc.)"
                        )}
                      >
                        Tried to improve <br /> myself (get body <br /> in
                        shape, get <br /> good grades, etc.)
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Strolled around on a car/jeepney-ride"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Strolled around on a car/jeepney-ride"
                        )}
                      >
                        Strolled around <br /> on a car/jeepney <br /> -ride
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Tried to think of the good things in life"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Tried to think of the good things in life"
                        )}
                      >
                        Tried to think <br /> of the good things <br /> in life
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Prayed"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Prayed"
                        )}
                      >
                        Prayed
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Thought it would be better dead"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Thought it would be better dead"
                        )}
                      >
                        Thought it <br /> would be better <br /> dead
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Talked to a minister/priest/pastor"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Talked to a minister/priest/pastor"
                        )}
                      >
                        Talked to a <br /> minister/priest <br /> /pastor
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Told myself the problem is not important"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Told myself the problem is not important"
                        )}
                      >
                        Told myself the <br /> problem is not <br /> important
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Blamed others for what went wrong"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Blamed others for what went wrong"
                        )}
                      >
                        Blamed others <br /> for what went <br /> wrong
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Played video games"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Played video games"
                        )}
                      >
                        Played video <br /> games
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Surfed the internet"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Surfed the internet"
                        )}
                      >
                        Surfed the internet
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Hurt myself"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Hurt myself"
                        )}
                      >
                        Hurt myself
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Talked to a friend"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Talked to a friend"
                        )}
                      >
                        Talked to a friend
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Daydreamed about how I would like things to be"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Daydreamed about how I would like things to be"
                        )}
                      >
                        Daydreamed about <br /> how I would like <br /> things
                        to be
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Got professional counseling"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Got professional counseling"
                        )}
                      >
                        Got professional <br /> counseling
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Went to church"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Went to church"
                        )}
                      >
                        Went to church
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Slept"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Slept"
                        )}
                      >
                        Slept
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Got angry"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Got angry"
                        )}
                      >
                        Got angry
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Kept my silence"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Kept my silence"
                        )}
                      >
                        Kept my silence
                      </Checkbox>
                      <Checkbox
                        name="pushedLimitsResponse"
                        value="Others"
                        checked={answers?.pushedLimitsResponse?.includes(
                          "Others"
                        )}
                      >
                        Others
                      </Checkbox>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I can easily discuss my problems with my ___________
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Checkbox
                        name="discussProblemsWith"
                        value="Guidance counselor in school"
                        checked={answers?.discussProblemsWith?.includes(
                          "Guidance counselor in school"
                        )}
                      >
                        Guidance counselor <br /> in school
                      </Checkbox>
                      <Checkbox
                        name="discussProblemsWith"
                        value="Parents"
                        checked={answers?.discussProblemsWith?.includes(
                          "Parents"
                        )}
                      >
                        Parents
                      </Checkbox>
                      <Checkbox
                        name="discussProblemsWith"
                        value="Teacher(s)"
                        checked={answers?.discussProblemsWith?.includes(
                          "Teacher(s)"
                        )}
                      >
                        Teacher(s)
                      </Checkbox>
                      <Checkbox
                        name="discussProblemsWith"
                        value="Brothers/Sisters"
                        checked={answers?.discussProblemsWith?.includes(
                          "Brothers/Sisters"
                        )}
                      >
                        Brothers/Sisters
                      </Checkbox>
                      <Checkbox
                        name="discussProblemsWith"
                        value="Friends/Relatives"
                        checked={answers?.discussProblemsWith?.includes(
                          "Friends/Relatives"
                        )}
                      >
                        Friends/Relatives
                      </Checkbox>
                      <Checkbox
                        name="discussProblemsWith"
                        value="Nobody"
                        checked={answers?.discussProblemsWith?.includes(
                          "Nobody"
                        )}
                      >
                        Nobody
                      </Checkbox>
                      <Checkbox
                        name="discussProblemsWith"
                        value="Others"
                        checked={answers?.discussProblemsWith?.includes(
                          "Others"
                        )}
                      >
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
                        checked={answers?.iFindMyself?.includes(
                          "Afraid of failing in subjects"
                        )}
                      >
                        Afraid of failing <br /> in subjects
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having difficulty finding child care (for married students)"
                        checked={answers?.iFindMyself?.includes(
                          "Having difficulty finding child care (for married students)"
                        )}
                      >
                        Having difficulty <br /> finding child care <br /> (for
                        married students)
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Afraid I might not fit at MSU-IIT"
                        checked={answers?.iFindMyself?.includes(
                          "Afraid I might not fit at MSU-IIT"
                        )}
                      >
                        Afraid I might not <br /> fit at MSU-IIT
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having difficulty socializing with people"
                        checked={answers?.iFindMyself?.includes(
                          "Having difficulty socializing with people"
                        )}
                      >
                        Having difficulty <br /> socializing with <br /> people
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Panicking during test"
                        checked={answers?.iFindMyself?.includes(
                          "Panicking during test"
                        )}
                      >
                        Panicking during <br /> test
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Getting along with teachers"
                        checked={answers?.iFindMyself?.includes(
                          "Getting along with teachers"
                        )}
                      >
                        Getting along with <br /> teachers
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Struggling with sexual identity"
                        checked={answers?.iFindMyself?.includes(
                          "Struggling with sexual identity"
                        )}
                      >
                        Struggling with <br /> sexual identity
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Always feeling tired"
                        checked={answers?.iFindMyself?.includes(
                          "Always feeling tired"
                        )}
                      >
                        Always feeling tired
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having health problems"
                        checked={answers?.iFindMyself?.includes(
                          "Having health problems"
                        )}
                      >
                        Having health <br /> problems
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having no financial/emotion support from family and friends"
                        checked={answers?.iFindMyself?.includes(
                          "Having no financial/emotion support from family and friends"
                        )}
                      >
                        Having no financial/ <br /> emotion support <br /> from
                        family and friends
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Taking things seriously"
                        checked={answers?.iFindMyself?.includes(
                          "Taking things seriously"
                        )}
                      >
                        Taking things <br /> seriously
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Anxious to approach teachers"
                        checked={answers?.iFindMyself?.includes(
                          "Anxious to approach teachers"
                        )}
                      >
                        Anxious to approach <br /> teachers
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having problems with spouse"
                        checked={answers?.iFindMyself?.includes(
                          "Having problems with spouse"
                        )}
                      >
                        Having problems <br /> with spouse
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Afraid I might not fit with my degree course"
                        checked={answers?.iFindMyself?.includes(
                          "Afraid I might not fit with my degree course"
                        )}
                      >
                        Afraid I might not fit <br /> with my degree course
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Unsure of college procedures"
                        checked={answers?.iFindMyself?.includes(
                          "Unsure of college procedures"
                        )}
                      >
                        Unsure of college <br /> procedures
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having difficulty participating in class"
                        checked={answers?.iFindMyself?.includes(
                          "Having difficulty participating in class"
                        )}
                      >
                        Having difficulty <br /> participating in class
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having difficulty participating in online class"
                        checked={answers?.iFindMyself?.includes(
                          "Having difficulty participating in online class"
                        )}
                      >
                        Having difficulty <br /> participating in <br /> online
                        class
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having difficulty managing money"
                        checked={answers?.iFindMyself?.includes(
                          "Having difficulty managing money"
                        )}
                      >
                        Having difficulty <br /> managing money
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Struggling in meeting requirement deadlines"
                        checked={answers?.iFindMyself?.includes(
                          "Struggling in meeting requirement deadlines"
                        )}
                      >
                        Struggling in meeting <br /> requirement deadlines
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Struggling to make my family undestand college demands"
                        checked={answers?.iFindMyself?.includes(
                          "Struggling to make my family undestand college demands"
                        )}
                      >
                        Struggling to make my <br /> family undestand <br />{" "}
                        college demands
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Missing my family/home"
                        checked={answers?.iFindMyself?.includes(
                          "Missing my family/home"
                        )}
                      >
                        Missing my family/home
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Adjusting w/boardmates"
                        checked={answers?.iFindMyself?.includes(
                          "Adjusting w/boardmates"
                        )}
                      >
                        Adjusting w/boardmates
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having problems at home"
                        checked={answers?.iFindMyself?.includes(
                          "Having problems at home"
                        )}
                      >
                        Having problems at home
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having trouble sleeping"
                        checked={answers?.iFindMyself?.includes(
                          "Having trouble sleeping"
                        )}
                      >
                        Having trouble sleeping
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Afraid to speak up in class"
                        checked={answers?.iFindMyself?.includes(
                          "Afraid to speak up in class"
                        )}
                      >
                        Afraid to speak up in class
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Gets easily distracted"
                        checked={answers?.iFindMyself?.includes(
                          "Gets easily distracted"
                        )}
                      >
                        Gets easily distracted
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having no close friend in school"
                        checked={answers?.iFindMyself?.includes(
                          "Having no close friend in school"
                        )}
                      >
                        Having no close friend <br /> in school
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Having suicidal thoughts"
                        checked={answers?.iFindMyself?.includes(
                          "Having suicidal thoughts"
                        )}
                      >
                        Having suicidal thoughts
                      </Checkbox>
                      <Checkbox
                        name="iFindMyself"
                        value="Others"
                        checked={answers?.iFindMyself?.includes("Others")}
                      >
                        Others
                      </Checkbox>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I willfully came for counseling when I had a problem
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Radio
                        name="cameForCounselingWhenProblem"
                        value="Always"
                        checked={answers?.cameForCounselingWhenProblem?.includes(
                          "Always"
                        )}
                      >
                        Always
                      </Radio>
                      <Radio
                        name="cameForCounselingWhenProblem"
                        value="Oftentimes"
                        checked={answers?.cameForCounselingWhenProblem?.includes(
                          "Oftentimes"
                        )}
                      >
                        Oftentimes
                      </Radio>
                      <Radio
                        name="cameForCounselingWhenProblem"
                        value="Sometimes"
                        checked={answers?.cameForCounselingWhenProblem?.includes(
                          "Sometimes"
                        )}
                      >
                        Sometimes
                      </Radio>
                      <Radio
                        name="cameForCounselingWhenProblem"
                        value="Never"
                        checked={answers?.cameForCounselingWhenProblem?.includes(
                          "Never"
                        )}
                      >
                        Never
                      </Radio>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I experienced counseling upon referral by teachers, friends,
                    parents, etc.
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Radio
                        name="experiencedCounseling"
                        value="Always"
                        checked={answers?.experiencedCounseling?.includes(
                          "Always"
                        )}
                      >
                        Always
                      </Radio>
                      <Radio
                        name="experiencedCounseling"
                        value="Oftentimes"
                        checked={answers?.experiencedCounseling?.includes(
                          "Oftentimes"
                        )}
                      >
                        Oftentimes
                      </Radio>
                      <Radio
                        name="experiencedCounseling"
                        value="Sometimes"
                        checked={answers?.experiencedCounseling?.includes(
                          "Sometimes"
                        )}
                      >
                        Sometimes
                      </Radio>
                      <Radio
                        name="experiencedCounseling"
                        value="Never"
                        checked={answers?.experiencedCounseling?.includes(
                          "Never"
                        )}
                      >
                        Never
                      </Radio>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I know that help is available at the Guidance and Counseling
                    Center of MSU-IIT.
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Radio
                        name="knowsTheHelpAvailable"
                        value="Always"
                        checked={answers?.knowsTheHelpAvailable?.includes(
                          "Always"
                        )}
                      >
                        Always
                      </Radio>
                      <Radio
                        name="knowsTheHelpAvailable"
                        value="Oftentimes"
                        checked={answers?.knowsTheHelpAvailable?.includes(
                          "Oftentimes"
                        )}
                      >
                        Oftentimes
                      </Radio>
                      <Radio
                        name="knowsTheHelpAvailable"
                        value="Sometimes"
                        checked={answers?.knowsTheHelpAvailable?.includes(
                          "Sometimes"
                        )}
                      >
                        Sometimes
                      </Radio>
                      <Radio
                        name="knowsTheHelpAvailable"
                        value="Never"
                        checked={answers?.knowsTheHelpAvailable?.includes(
                          "Never"
                        )}
                      >
                        Never
                      </Radio>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I am shy to ask assistance/seek counseling from my guidance
                    counselor.
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Radio
                        name="shyToAskAssistance"
                        value="Always"
                        checked={answers?.shyToAskAssistance?.includes(
                          "Always"
                        )}
                      >
                        Always
                      </Radio>
                      <Radio
                        name="shyToAskAssistance"
                        value="Oftentimes"
                        checked={answers?.shyToAskAssistance?.includes(
                          "Oftentimes"
                        )}
                      >
                        Oftentimes
                      </Radio>
                      <Radio
                        name="shyToAskAssistance"
                        value="Sometimes"
                        checked={answers?.shyToAskAssistance?.includes(
                          "Sometimes"
                        )}
                      >
                        Sometimes
                      </Radio>
                      <Radio
                        name="shyToAskAssistance"
                        value="Never"
                        checked={answers?.shyToAskAssistance?.includes("Never")}
                      >
                        Never
                      </Radio>
                    </div>
                  </div>

                  <div className="flex grow flex-col gap-[30px] pb-4 font-semibold">
                    I am afraid to go to the Guidance and Counseling Center of
                    MSU-IIT.
                    <div className="grid grid-cols-4 justify-between gap-10">
                      <Radio
                        name="afraidToGoGuidance"
                        value="Always"
                        checked={answers?.afraidToGoGuidance?.includes(
                          "Always"
                        )}
                      >
                        Always
                      </Radio>
                      <Radio
                        name="afraidToGoGuidance"
                        value="Oftentimes"
                        checked={answers?.afraidToGoGuidance?.includes(
                          "Oftentimes"
                        )}
                      >
                        Oftentimes
                      </Radio>
                      <Radio
                        name="afraidToGoGuidance"
                        value="Sometimes"
                        checked={answers?.afraidToGoGuidance?.includes(
                          "Sometimes"
                        )}
                      >
                        Sometimes
                      </Radio>
                      <Radio
                        name="afraidToGoGuidance"
                        value="Never"
                        checked={answers?.afraidToGoGuidance?.includes("Never")}
                      >
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
                      className="h-[2.5rem] self-end bg-[#83e8ef] py-1 text-gray-500 hover:bg-[#FDFDFD] hover:text-[#017869]"
                      onClick={() => {
                        router.push("/studentview");
                        modalref.current?.toggle();
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
