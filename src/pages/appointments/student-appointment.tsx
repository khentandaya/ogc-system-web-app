import StudentNav from "@/components/studentNav";
import { useTimeslot } from "@/hooks/useTimeslot";
import { useState, useRef } from "react";
import { DayPicker } from "react-day-picker";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Student from "@/models/Student";
import { format } from "date-fns";
import Button from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/dialog";
import Input from "@/components/input";
import { useSession } from "next-auth/react";
import { DialogClose } from "@radix-ui/react-dialog";
import PopupModal, { ModalHandler } from "@/components/popupmodal";
import party from "party-js";

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

export default function StudentAppointment() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const { available, setDate } = useTimeslot(selectedDay);
  const session = useSession();
  const modalref = useRef<ModalHandler>(null);

  return (
    <div className="flex flex-col items-center justify-center gap-[2rem]">
      <StudentNav />
      <div className="w-fit bg-gradient-to-tr from-[#28407f] to-[#01bfa8] bg-clip-text">
        <h1 className="text-xl font-semibold text-transparent">
          Book an <span className="font-bold">Appointment</span> with your
          Guidance Counselor
        </h1>
      </div>
      <div className="flex h-[35rem] justify-center gap-10">
        <div className="fixed -bottom-20 -right-20 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
        <div className="fixed -left-36 top-56 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
        <DayPicker
          disabled={(date) => {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            return date < currentDate;
          }}
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
          <div className="relative flex h-[28rem] flex-col items-center justify-start gap-5 rounded-3xl p-4">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 px-4 py-3 border rounded-lg shadow-sm">
                <p>Available Timeslots:</p>
                <select className="w-full rounded-lg border border-[#28407f]/70 p-3 outline-none">
                  {available.map((e, i) => (
                    <option key={i} value={e.toString()}>
                      {format(e, "h:mm aa")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 px-4 py-3 border rounded-lg shadow-sm">
                <p>How would you like to meet?</p>
                <select className="w-full rounded-lg border border-[#28407f]/70 p-3 outline-none">
                  <option value="Face to Face">Face to Face</option>
                  <option value="Online Meeting">Online Meeting</option>
                  <option value="Phone/Telephone Call">
                    Phone/Telephone Call
                  </option>
                </select>
              </div>
            </div>
            <div className="absolute flex items-end right-5 top-36 grow">
              <Dialog>
                <DialogTrigger className="self-center">
                  <p className="transistion-colors w-full rounded-lg border bg-[#28407f] px-3 py-2 text-[#FDFDFD] duration-200 hover:bg-[#FDFDFD] hover:text-[#28407f]">
                    Make an appointment
                  </p>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="text-xl font-semibold text-[#28407f]">
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
                    className="rounded-lg border bg-[#28407f] py-4 text-[#FDFDFD] transition-all duration-100 hover:bg-[#FDFDFD] hover:text-[#28407f]"
                  >
                    Send Appointment
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
            <PopupModal ref={modalref}>
              <div className="flex flex-col gap-1 p-4 bg-white border rounded-lg shadow">
                <h2 className="text-xl font-semibold">
                  Congratulations, your appointment is successfully sent 🎉
                </h2>
                <p className="my-4 text-center text-gray-500">
                  The guidance counselor may contact you for further details
                </p>
                <Button
                  className="self-end bg-[#28407f] text-[#fdfdfd] hover:text-[#28407f]"
                  onClick={() => modalref.current?.toggle()}
                >
                  Close
                </Button>
              </div>
            </PopupModal>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
