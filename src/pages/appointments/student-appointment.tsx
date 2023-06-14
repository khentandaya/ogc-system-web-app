import StudentNav from "@/components/studentNav";
import { useTimeslot } from "@/hooks/useTimeslot";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Student from "@/models/Student";

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
  const timeslots = useTimeslot(selectedDay);
  console.log(timeslots);

  return (
    <div className="flex flex-col gap-[5rem] items-center justify-center">
      <StudentNav />
      <div className="items-center justify-center">
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={(date) => setSelectedDay(date)}
        />
        {selectedDay ? (
          <div className="border">
            <p>Available Timeslots:</p>
            <select className="">
              <option value="test">test</option>
            </select>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
