import React, { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useTimeslot } from "@/hooks/useTimeslot";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Staff from "@/models/Staff";
import StaffNav from "@/components/staffNav";
import axios from "axios";
import PopupModal, { ModalHandler } from "@/components/popupmodal";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/dialog";
import Input from "@/components/input";
import { DialogClose } from "@radix-ui/react-dialog";
import Button from "@/components/button";
import { Calendar, DivideCircleIcon, List } from "lucide-react";
import DatePicker from "react-datepicker";
import { areIntervalsOverlapping, isSameDay } from "date-fns";
import {
  AiOutlinePlus as AddIcon,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { GrDocumentTime } from "react-icons/gr";
import { BiCopy as CopyIcon, BiTrash as Trash } from "react-icons/bi";
import Checkbox from "@/components/checkbox";
import GeneralSchedule from "@/components/GeneralSchedule";
import { getAllJSDocTags } from "typescript";
import router from "next/router";

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

export default function StaffAppointment() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const { available, setDate, disableTimeslot } = useTimeslot(selectedDay);
  const session = useSession();
  const modalref = useRef<ModalHandler>(null);
  const [tab, setTab] = useState<"list" | "calendar" | "appointments">("list");
  const [appointments, setAppointments] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [studentArr, setStudentArr] = useState<object[]>([]);

  useEffect(()=>{
    axios.get("/api/appointmentcollege").then(({data})=>{
      console.log(data)
      setAllAppointments(data);
    })
  },[])

  return (
    <div className="flex flex-col items-center justify-center gap-[2rem]">
      <StaffNav />
      <div className="fixed -bottom-20 -right-20 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
      <div className="fixed -left-36 top-56 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
      <div className="flex h-[3rem] cursor-pointer select-none items-center gap-1 self-center rounded-2xl bg-[#cceff6] p-2 py-1">
        <div
          className={`flex h-[2rem] w-[13rem] items-center justify-center gap-2 ${
            tab === "list" ? "rounded-xl bg-[#FDFDFD]" : ""
          }`}
          onClick={() => {
            setTab("list");
          }}
        >
          <GrDocumentTime className="h-5 w-5" /> Set Availability
        </div>
        <div
          className={`flex h-[2rem] w-[13rem] items-center justify-center gap-2 ${
            tab === "calendar" ? "rounded-xl bg-[#FDFDFD]" : ""
          }`}
          onClick={() => {
            setTab("calendar");
          }}
        >
          <Calendar className="h-5 w-5" /> Calendar
        </div>
        <div
          className={`flex h-[2rem] w-[13rem] items-center justify-center gap-2 ${
            tab === "appointments" ? "rounded-xl bg-[#FDFDFD]" : ""
          }`}
          onClick={() => {
            setTab("appointments");
          }}
        >
          <AiOutlineUnorderedList className="h-5 w-5" /> Appointments
        </div>
      </div>
      {tab === "calendar" ? (
        <div className="flex items-center justify-center">
          <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={async (date) => {
              setSelectedDay(date);
              const nextDate = new Date(date + "");
              const newdate = new Date(date + "");
              newdate.setHours(nextDate.getHours() + 8);

              date?.setHours(0, 0, 0, 0);
              if (date) {
                setDate(date);
                const getApp = await axios.get(
                  `/api/studentappointment?dateQ=${newdate.toUTCString()}&collegeQ=${
                    session.data?.user.college
                  }`
                );
                setAppointments(getApp.data);
              }
            }}
          />
          {selectedDay ? (
            <div className="flex flex-col">
              <div className="flex gap-4">
                <div className="flex flex-col items-start gap-2 rounded-lg border px-4 py-3 shadow-md">
                  <h2 className="text-lg font-semibold">
                    Scheduled Appointments:
                  </h2>
                  <div className="flex max-h-52 w-[500px] flex-col gap-3 overflow-y-auto p-2 text-neutral-800">
                    {appointments.map((e: any, i) => {
                      console.log(e);
                      if (e.student) {
                        return (
                          <AppointmentCard
                            key={i}
                            id={e.student}
                            date={e.date}
                            email={e.prefferedemail}
                            phone={e.prefferedphone}
                            others={e.othercontact}
                            mode={e.mode}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : tab === "list" ? (
        <GeneralSchedule />
      ) : (
        <div className="my-2 w-[50rem]">
          <div className="flex flex-col items-start gap-2 rounded-lg border px-4 py-3 shadow-md">
                  <h2 className="text-lg font-semibold">
                    All Scheduled Appointments:
                  </h2>
                  <div className="flex max-h-[27rem] w-full flex-col gap-3 overflow-y-auto p-2 text-neutral-800">
                    {allAppointments.map((e: any, i) => {
                      console.log(e);
                      if (e.student) {
                        return (
                          <AppointmentCard
                            key={i}
                            id={e.student}
                            date={e.date}
                            email={e.prefferedemail}
                            phone={e.prefferedphone}
                            others={e.othercontact}
                            mode={e.mode}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
        </div>
      )}
    </div>
  );

  function AppointmentCard({ id, date, email, phone, others, mode }: any) {
    const [studentInfo, setStudentInfo] = useState<any>([]);
    useEffect(() => {
      axios.get(`/api/studentprofile/${id}`).then(({ data }) => {
        console.log(data);
        setStudentInfo(data);
      });
    }, [id]);

    if (studentInfo.length !== 0)
      return (
        <div className="flex items-center justify-between  rounded px-2 py-1 hover:bg-[#83e8ef]/20">
          <div className="w-full">
            <p>{`${studentInfo.firstname.toUpperCase()} ${studentInfo.lastname.toUpperCase()}`}</p>
            <p className="flex gap-8 text-[#28407f]">
              {format(new Date(date), "hh:mm aa ")}
              {new Date(date).toLocaleDateString()}
              <span className="font-semibold">{mode}</span>
            </p>
          </div>
          <Dialog>
            <DialogTrigger className="self-center">
              <p className="cursor-pointer whitespace-nowrap text-sm hover:underline">
                View Appointment Details
              </p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="text-xl font-semibold">
                Contact Info:
              </DialogHeader>
              <div className="grid grid-cols-3 items-center gap-4">
                <label htmlFor="email" className="whitespace-nowrap">
                  Email Address:
                </label>
                <Input
                  type="email"
                  id="email"
                  className="col-span-2 w-full"
                  value={email}
                  disabled
                />
                <label htmlFor="phone" className="whitespace-nowrap">
                  Phone:
                </label>
                <Input
                  id="phone"
                  value={phone}
                  className="col-span-2 w-full"
                  disabled
                />
                <label htmlFor="other">Other (e.g. Facebook):</label>
                <Input
                  id="other"
                  value={others}
                  className="col-span-2 w-full"
                  disabled
                />
              </div>
              <Button
                onClick={() => {
                  router.push(`/student/${studentInfo.idNumber}`);
                }}
                className="w-full bg-[#28407f] text-[#FDFDFD] hover:text-[#28407f]"
              >
                View Student Profile
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      );
    return <></>;
  }
}
