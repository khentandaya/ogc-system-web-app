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
          <div className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 rounded-lg border px-4 py-3 shadow-md">
                <p>Available Timeslots:</p>
                <select className="w-full rounded-lg border border-slate-400 p-3 outline-none">
                  {available.map((e, i) => (
                    <option key={i} value={e.toString()}>
                      {format(e, "h:mm aa")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border px-4 py-3 shadow-md">
                <p>How would you like to meet?</p>
                <select className="w-full rounded-lg border border-slate-400 p-3 outline-none">
                  <option value="Face to Face">Face to Face</option>
                  <option value="Online Meeting">Online Meeting</option>
                  <option value="Phone/Telephone Call">
                    Phone/Telephone Call
                  </option>
                </select>
              </div>
            </div>
            <Dialog>
              <DialogTrigger className="self-center">
                <p className="transistion-colors w-fit rounded-lg border border-gray-300/70 bg-secondary px-3 py-2 duration-200 hover:bg-secondary/60 hover:text-primary">
                  Make an appointment
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
                    defaultValue={session?.data?.user?.email}
                    className="col-span-2 w-full"
                  />
                  <label htmlFor="phone" className="whitespace-nowrap">
                    Phone:
                  </label>
                  <Input id="phone" className="col-span-2 w-full" />
                  <label htmlFor="other">Other (e.g. Facebook):</label>
                  <Input id="other" className="col-span-2 w-full" />
                </div>
                <DialogClose
                  onClick={() => {
                    modalref.current?.toggle();
                    // party.confetti(modalref.current?.contentRef);
                  }}
                  className="rounded-lg bg-primary py-4 text-white"
                >
                  Send Appointment
                </DialogClose>
              </DialogContent>
            </Dialog>
            <PopupModal ref={modalref}>
              <div className="rounded-lg border bg-white p-4 shadow flex flex-col gap-1">
                <h2 className="text-xl font-semibold">
                Congratulations, your appointment is successfully sent 🎉
                </h2>
                <p className="text-gray-500 text-center my-4">The guidance counselor may contact you for further details</p>
                <Button className="self-end" onClick={() => modalref.current?.toggle()}>Close</Button>
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
