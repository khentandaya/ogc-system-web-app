import StudentNav from "@/components/studentNav";
import { useTimeslot } from "@/hooks/useTimeslot";
import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Student from "@/models/Student";
import { format, formatISO } from "date-fns";
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
import axios from "axios";

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
  const { available, setDate, disableTimeslot } = useTimeslot(selectedDay);
  const session = useSession();
  const modalref = useRef<ModalHandler>(null);

  const [alternateEmail, setAlternateEmail] = useState("");
  const [prefferedPhone, setPrefferedPhone] = useState(
    session.data?.user.phone
  );
  const [otherContact, setOtherContact] = useState("");

  const [initialForm, setInitialForm] = useState({});
  const [appointmentForm, setAppointmentForm] = useState({});
  const [appointments, setAppointments] = useState([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const form = new FormData(e.target);
    const formJSON = Object.fromEntries(form.entries());
    setInitialForm(formJSON);
    // const newStaff = await axios.post("/api/staff", formJSON);
  };

  useEffect(() => {
    if (Object.keys(appointmentForm).length === 0) {
      console.log("emty");
    } else if (Object.keys(appointmentForm).length !== 0) {
      const response = axios
        .post("/api/studentappointment", appointmentForm)
        .then(({ data }) => {
          console.log(data);
          return data;
        });
    }
  }, [appointmentForm]);

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
              console.log(getApp.data);
              if (getApp.data.length !== 0) {
                getApp.data.forEach((e: any) => {
                  disableTimeslot(new Date(e.date));
                });
              }
            }
          }}
        />
        {selectedDay ? (
          <div className="relative flex h-[28rem] flex-col items-center justify-start gap-5 rounded-3xl p-4">
            <form
              id={"schedform"}
              onSubmit={handleSubmit}
              className="flex gap-4"
            >
              <div className="flex flex-col gap-2 rounded-lg border px-4 py-3 shadow-sm">
                <p>Available Timeslots:</p>
                <select
                  name="date"
                  className="flex w-full flex-col gap-2 rounded-lg border border-[#28407f]/70 p-3 outline-none"
                >
                  {available.map((e, i) => (
                    <option key={i} value={e.toString()}>
                      {format(e, "h:mm aa")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border px-4 py-3 shadow-sm">
                <p>How would you like to meet?</p>
                <select
                  name="mode"
                  className="w-full rounded-lg border border-[#28407f]/70 p-3 outline-none"
                >
                  <option value="Face to Face">Face to Face</option>
                  <option value="Online Meeting">Online Meeting</option>
                  <option value="Phone/Telephone Call">
                    Phone/Telephone Call
                  </option>
                </select>
              </div>
            </form>
            <div className="absolute right-5 top-36 flex grow items-end">
              <Dialog>
                <DialogTrigger
                  type="submit"
                  form="schedform"
                  className="self-center"
                >
                  <p className="transistion-colors w-full rounded-lg border bg-[#28407f] px-3 py-2 text-[#FDFDFD] duration-200 hover:bg-[#FDFDFD] hover:text-[#28407f]">
                    Make an appointment
                  </p>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="text-xl font-semibold text-[#28407f]">
                    Contact Info:
                  </DialogHeader>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="email" className="whitespace-nowrap">
                      Email Address:
                    </label>
                    <Input
                      disabled
                      type="email"
                      id="email"
                      defaultValue={session?.data?.user?.email}
                      className="col-span-2 w-full"
                    />

                    <label
                      htmlFor="alternateemail"
                      className="whitespace-nowrap"
                    >
                      Alternate Email:
                    </label>
                    <Input
                      type="email"
                      id="alternateemail"
                      onChange={(e) => {
                        setAlternateEmail(e.target.value);
                      }}
                      className="col-span-2 w-full"
                    />

                    <label htmlFor="phone" className="whitespace-nowrap">
                      Phone:
                    </label>
                    <Input
                      id="phone"
                      onChange={(e) => {
                        setPrefferedPhone(e.target.value);
                      }}
                      defaultValue={session.data?.user.phone}
                      className="col-span-2 w-full"
                    />
                    <label htmlFor="other">Other (e.g. Facebook):</label>
                    <Input
                      id="other"
                      onChange={(e) => {
                        setOtherContact(e.target.value);
                      }}
                      className="col-span-2 w-full"
                    />
                  </div>
                  <DialogClose
                    onClick={() => {
                      setAppointmentForm((old) => {
                        const finalForm = {
                          ...initialForm,
                          prefferedemail: session.data?.user.email,
                          alternateemail: alternateEmail,
                          prefferedphone: prefferedPhone,
                          othercontact: otherContact,
                          college: session.data?.user.college,
                          student: session.data?.user.idNumber,
                        };

                        return { ...old, ...finalForm };
                      });
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
              <div className="flex flex-col gap-1 rounded-lg border bg-white p-4 shadow">
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
