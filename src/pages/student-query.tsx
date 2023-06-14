import React, { useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import Staff from "@/models/Staff";
import StaffNav from "@/components/staffNav";
import { AiOutlineSearch } from "react-icons/ai";

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

export default function StudentQuery({}: Props) {
  const [searchVal, setSearchVal] = useState<string>("");
  const [toggleName, setToggleName] = useState(false);
  const session = useSession();

  return (
    <div className="flex flex-col w-screen gap-10">
      <StaffNav />
      <div className="w-full gap-5 flex justify-center">
        <select
          onChange={(e) => {
            e.target.value === "id"
              ? setToggleName(true)
              : setToggleName(false);
          }}
          placeholder="filter by"
          className="px-4 outline-0 cursor-pointer py-2 border-[2.5px] h-15 w-50 rounded-3xl border-cyan-200"
          name="college"
        >
          <option value="name">Name</option>
          <option value="id">ID</option>
          <option value="id">College</option>
        </select>

        <div className="flex">
          <input
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
            placeholder={"Search..."}
            className="px-4 outline-0 py-1 border-[2.5px] bg-white border-r-0 h-15 w-[30rem] rounded-l-3xl roun border-cyan-200"
          />
          <button
            onClick={() => console.log(searchVal)}
            className="outline-0 py-2 border-[2.5px] bg-white h-15 w-[3rem] cursor-pointer flex justify-center border-l-0 rounded-r-3xl border-cyan-200"
          >
            <AiOutlineSearch size={25} />
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between cursor-default font-bold mx-36 p-4 border-b-[3px] border-black/40 w-auto h-[3rem]">
          <p className="flex justify-center items-center pt-2 pb-0"></p>
          <p className="flex justify-center items-center pt-2 pb-0">Name</p>
          <p className="flex justify-center items-center pt-2 pb-0">ID</p>
          <p className="flex justify-center items-center pt-2 pb-0">College</p>
        </div>
        <StudentCard />
        <StudentCard />
        <StudentCard />
      </div>
    </div>
  );

  function StudentCard() {
    return (
      <>
        <div className="flex justify-between hover:bg-cyan-100/20 cursor-pointer mx-36 p-4 border-b border-cyan-100 w-auto h-[5rem]">
          <p className="flex justify-center items-center pt-1 pb-0">
            picture
          </p>
          <p className="flex justify-center items-center pt-1 pb-0">
            2012-1239
          </p>
          <p className="flex justify-center items-center pt-1 pb-0">CCS</p>
          <p className="flex justify-center items-center pt-1 pb-0">1st Year</p>
        </div>
      </>
    );
  }
}
