import React, { useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Staff from "@/models/Staff";
import StaffNav from "@/components/staffNav";
import axios from "axios";
import { useTimeslot } from "@/hooks/useTimeslot";
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
import { AiOutlinePlus as AddIcon } from "react-icons/ai";
import { BiCopy as CopyIcon, BiTrash as Trash } from "react-icons/bi";
import Checkbox from "@/components/checkbox";
import GeneralSchedule from "@/components/GeneralSchedule";

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
  const { available, setDate } = useTimeslot(selectedDay);
  const session = useSession();
  const modalref = useRef<ModalHandler>(null);
  const [tab, setTab] = useState<"list" | "calendar">("list");
  const isList = tab === "list";

  return (
    <div className="flex flex-col items-center justify-center gap-[2rem]">
      <StaffNav />
      <div className="fixed -bottom-20 -right-20 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
      <div className="fixed -left-36 top-56 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
      <div className="flex h-[3rem] cursor-pointer select-none items-center gap-1 self-center rounded-2xl bg-[#cceff6] p-2 py-1">
        <div
          className={`flex h-[2rem] w-[13rem] items-center justify-center gap-2 ${
            isList ? "rounded-xl bg-[#FDFDFD]" : ""
          }`}
          onClick={() => {
            setTab("list");
          }}
        >
          <List className="w-5 h-5" /> List
        </div>
        <div
          className={`flex h-[2rem] w-[13rem] items-center justify-center gap-2 ${
            !isList ? "rounded-xl bg-[#FDFDFD]" : ""
          }`}
          onClick={() => {
            setTab("calendar");
          }}
        >
          <Calendar className="w-5 h-5" /> Calendar
        </div>
      </div>
      {tab === "calendar" ? (
        <div className="flex items-center justify-center">
          <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={(date) => {
              setSelectedDay(date);
              if (date) {
                setDate(date);
              }
            }}
          />
          {selectedDay ? (
            <div className="flex flex-col">
              <div className="flex gap-4">
                <div className="flex flex-col items-start gap-2 px-4 py-3 border rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold">
                    Scheduled Appointments:
                  </h2>
                  <div className="p-2 flex flex-col gap-3 max-h-52 overflow-y-auto w-[500px] text-neutral-800">
                    <div className="flex items-center justify-between hover:bg-[#83e8ef]/20 py-1 px-2 rounded">
                      <div className="w-full">
                        <p>Juliard T. Actub</p>
                        <p>9:30AM</p>
                      </div>
                      <p className="text-sm cursor-pointer whitespace-nowrap hover:underline">View Appointment Details</p>
                    </div>
                    <div className="flex items-center justify-between hover:bg-[#83e8ef]/20 py-1 px-2 rounded">
                      <div className="w-full">
                        <p>Juliard T. Actub</p>
                        <p>9:30AM</p>
                      </div>
                      <p className="text-sm cursor-pointer whitespace-nowrap hover:underline">View Appointment Details</p>
                    </div>
                    <div className="flex items-center justify-between hover:bg-[#83e8ef]/20 py-1 px-2 rounded">
                      <div className="w-full">
                        <p>Juliard T. Actub</p>
                        <p>9:30AM</p>
                      </div>
                      <p className="text-sm cursor-pointer whitespace-nowrap hover:underline">View Appointment Details</p>
                    </div>
                    <div className="flex items-center justify-between hover:bg-[#83e8ef]/20 py-1 px-2 rounded">
                      <div className="w-full">
                        <p>Juliard T. Actub</p>
                        <p>9:30AM</p>
                      </div>
                      <p className="text-sm cursor-pointer whitespace-nowrap hover:underline">View Appointment Details</p>
                    </div>
                  </div>
                </div>
              </div>
              <Dialog>
                <DialogTrigger className="self-center">
                  <p className="transistion-colors w-fit rounded-lg border bg-[#28407f] px-3 py-2 text-[#FDFDFD] duration-200 hover:bg-[#FDFDFD] hover:text-[#28407f]">
                    Make an appointment
                  </p>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="text-xl font-semibold">
                    Contact Info:
                  </DialogHeader>
                  <div className="grid items-center grid-cols-3 gap-4">
                    <label htmlFor="email" className="whitespace-nowrap">
                      Email Address:
                    </label>
                    <Input
                      type="email"
                      id="email"
                      defaultValue={session?.data?.user?.email}
                      className="w-full col-span-2"
                    />
                    <label htmlFor="phone" className="whitespace-nowrap">
                      Phone:
                    </label>
                    <Input id="phone" className="w-full col-span-2" />
                    <label htmlFor="other">Other (e.g. Facebook):</label>
                    <Input id="other" className="w-full col-span-2" />
                  </div>
                  <DialogClose
                    onClick={() => {
                      modalref.current?.toggle();
                      // party.confetti(modalref.current?.contentRef);
                    }}
                    className="py-4 text-white rounded-lg bg-primary"
                  >
                    Send Appointment
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <GeneralSchedule />
      )}
    </div>
  );
}
