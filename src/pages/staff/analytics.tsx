import Staff from "@/models/Staff";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import StaffNav from "@/components/staffNav";
import { CollegePie } from "@/components/piechart/collegePie";
import { SuicidalTendencyPie } from "@/components/piechart/suicidalTendencyPie";
import { GenderPie } from "@/components/piechart/genderPie";
import { YrlevelPie } from "@/components/piechart/yrlevelPie";
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
      <div className="grid grid-cols-2 mx-24">
        <div className="flex flex-col items-center">
          {filter === "college" ? (
            <CollegePie />
          ) : filter === "yrlevel" ? (
            <YrlevelPie />
          ) : filter === "gender" ? (
            <GenderPie />
          ) : (
            ""
          )}
          <div className="flex flex-col">
            <label className="px-1 font-semibold">Filter By:</label>
            <select
              className="h-15 w-[20rem] rounded-sm border-b-[2.3px] hover:bg-[#01bfa8]/10 border-[#28407f] px-2 py-2 outline-0"
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
          </div>
        </div>
        <div className="flex flex-col items-center">
          <SuicidalTendencyPie />
        </div>
      </div>
    </div>
  );
}
