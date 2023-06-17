import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import Staff from "@/models/Staff";
import StaffNav from "@/components/staffNav";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

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
  const [toggleFilter, setToggleFilter] = useState("");
  const session = useSession();
  const [students, setStudents] = useState<object[]>([]);

  useEffect(() => {
    axios.get("/api/studentprofile").then(({ data }) => {
      setStudents(data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/studentprofile?search=${searchVal}`).then(({ data }) => {
      setStudents(data);
    });
  }, [searchVal]);

  return (
    <div className="flex flex-col w-screen gap-10">
      <StaffNav />
      <div className="fixed -bottom-20 -right-20 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
      <div className="fixed -left-36 top-56 h-[15rem] w-[15rem] rounded-full bg-cyan-200 blur-3xl"></div>
      <div className="flex justify-end mr-36">
        <input
          value={searchVal}
          onChange={(e) => {
            setSearchVal(e.target.value);
          }}
          placeholder={"search by name, id..."}
          className="roun h-10 w-[15rem] rounded-l-3xl border-[2.5px] border-r-0 border-cyan-600 bg-white px-4 py-1 text-sm outline-0 placeholder:italic"
        />
        <button
          onClick={() => console.log(searchVal)}
          className="flex h-10 w-[3rem] cursor-pointer justify-center rounded-r-3xl border-[2.5px] border-l-0 border-cyan-600 bg-white py-2 outline-0"
        >
          <AiOutlineSearch size={25} />
        </button>
      </div>
      <div className="flex max-h-[32rem] flex-col">
        <div className="mx-36 grid h-[3rem] w-auto cursor-default grid-cols-4 border-b-[3px] border-cyan-700 font-semibold">
          <p className="flex items-center justify-center pt-2 pb-0">Name</p>
          <p className="flex items-center justify-center pt-2 pb-0">ID</p>
          <p className="flex items-center justify-center pt-2 pb-0">College</p>
          <p className="flex items-center justify-center pt-2 pb-0">Gender</p>
        </div>
        {students?.map((val, i) => {
          return <StudentCard key={i} student={val} />;
        })}
      </div>
    </div>
  );

  function StudentCard({ student }: any) {
    const studentName = student.lastname + ", " + student.firstname;
    return (
      <>
        <Link
          href={/student/ + student.idNumber}
          className="mx-36 grid h-[4rem] w-auto cursor-pointer grid-cols-4  justify-between border-b border-cyan-200 hover:bg-cyan-100/20"
        >
          <p className="flex items-center justify-start pb-0 text-sm">
            {studentName.toUpperCase()}
          </p>
          <p className="flex items-center justify-center pb-0 text-sm">
            {student.idNumber}
          </p>
          <p className="flex items-center justify-center pb-0 text-sm">
            {student.college?.toUpperCase()}
          </p>
          <p className="flex items-center justify-center pb-0 text-sm">
            {student.sex?.toUpperCase()}
          </p>
        </Link>
      </>
    );
  }
}
