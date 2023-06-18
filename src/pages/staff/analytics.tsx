import Staff from "@/models/Staff";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import StaffNav from "@/components/staffNav";
import { CollegePie } from "@/components/piechart/collegePie";
import { SuicidalTendencyPie } from "@/components/piechart/suicidalTendencyPie";
import { GenderPie } from "@/components/piechart/genderPie";
import { YrlevelPie } from "@/components/piechart/yrlevelPie";
import { CollegePieReq } from "@/components/piechart/collegePieReq";
import { GenderPieReq } from "@/components/piechart/genderPieReq";
import { YrlevelPieReq } from "@/components/piechart/yrlevelPieReq";

import { useState } from "react";

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

export default function Analytics({}: Props) {
  const [filter, setFilter] = useState("college");
  return (
    <div className="flex flex-col gap-5">
      <StaffNav />
      <div className="fixed -bottom-20 -right-20 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
      <div className="fixed -left-36 top-56 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
      <div className="grid grid-rows-2 gap-5">
        <div className="flex flex-col items-center gap-5">
          <div className="w-fit bg-gradient-to-tr from-[#28407f] to-[#01bfa8] bg-clip-text">
            <h1 className="text-3xl font-bold text-transparent">
              Demographic Distribution of Students
            </h1>
          </div>
          <select
            className="h-15 ml-36 mt-5 w-[20rem] rounded-xl border border-b-[2.3px] bg-[#FDFDFD] px-2 py-2 shadow-md outline-0 hover:bg-[#01bfa8]/10"
            name="college"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            required
          >
            <option value="college">College</option>
            <option value="gender">Gender</option>
            <option value="yrlevel">Yr. Level</option>
          </select>
          {filter === "college" ? (
            <CollegePie />
          ) : filter === "yrlevel" ? (
            <YrlevelPie />
          ) : filter === "gender" ? (
            <GenderPie />
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="w-fit bg-gradient-to-tr from-[#28407f] to-[#01bfa8] bg-clip-text">
            <h1 className="text-3xl font-bold text-transparent">
              Emotional Well-being Snapshot
            </h1>
          </div>
          <SuicidalTendencyPie />
        </div>
      </div>

      {/** Aapointment Requests */}
      <div className="flex flex-col items-center gap-5">
        <div className="w-fit bg-gradient-to-tr from-[#28407f] to-[#01bfa8] bg-clip-text">
          <h1 className="text-3xl font-bold text-transparent">
            Distribution of Counseling Appointment Requests
          </h1>
        </div>
        <select
          className="h-15 ml-36 mt-5 w-[20rem] rounded-xl border border-b-[2.3px] bg-[#FDFDFD] px-2 py-2 shadow-md outline-0 hover:bg-[#01bfa8]/10"
          name="college"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          required
        >
          <option value="college">College</option>
          <option value="gender">Gender</option>
          <option value="yrlevel">Yr. Level</option>
        </select>
        {filter === "college" ? (
          <CollegePieReq />
        ) : filter === "yrlevel" ? (
          <YrlevelPieReq />
        ) : filter === "gender" ? (
          <GenderPieReq />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
