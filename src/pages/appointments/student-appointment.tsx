import StudentNav from "@/components/studentNav";
import { useTimeslot } from "@/hooks/useTimeslot";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
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
    
    <div className="flex flex-col gap-[2rem] items-center justify-center">

      <StudentNav />
      <div className="items-center justify-center">
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={(date) => setSelectedDay(date)}
        />
        {selectedDay ? (
          <div className="flex flex-col gap-2 border px-4 py-3 rounded-lg shadow-md">
            <p>Available Timeslots:</p>
            <select className="w-full outline-none border-b border-slate-400 p-3">
              <option value="test">test</option>
              <option value="test">test</option>
              <option value="test">test</option>
              <option value="test">test</option>
              <option value="test">test</option>
              <option value="test">test</option>
              <option value="test">test</option>
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
