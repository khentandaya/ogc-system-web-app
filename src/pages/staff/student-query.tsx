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
    axios.get("/api/students").then(({ data }) => {
      setStudents(data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/students?search=${searchVal}`).then(({ data }) => {
      setStudents(data);
    });
  }, [searchVal]);

  return (
    <div className="flex flex-col w-screen gap-10">
      <StaffNav />
        <div className="flex justify-end mr-36">
          <input
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
            placeholder={"search by name, id , college..."}
            className="px-4 placeholder:italic text-sm outline-0 py-1 border-[2.5px] bg-white border-r-0 h-10 w-[15rem] rounded-l-3xl roun border-cyan-600"
          />
          <button
            onClick={() => console.log(searchVal)}
            className="outline-0 py-2 border-[2.5px] bg-white h-10 w-[3rem] cursor-pointer flex justify-center border-l-0 rounded-r-3xl border-cyan-600"
          >
            <AiOutlineSearch size={25} />
          </button>
        </div>
      <div className="flex flex-col max-h-[32rem]">
        <div className="grid grid-cols-4 cursor-default font-semibold mx-36 border-b-[3px] border-cyan-700 w-auto h-[3rem]">
          <p className="flex justify-center items-center pt-2 pb-0">Name</p>
          <p className="flex justify-center items-center pt-2 pb-0">ID</p>
          <p className="flex justify-center items-center pt-2 pb-0">College</p>
          <p className="flex justify-center items-center pt-2 pb-0">Gender</p>
        </div>
        {students?.map((val, i) => {
          return <StudentCard key={i} student={val} />;
        })}
      </div>
    </div>
  );

  function StudentCard({ student }: any) {
    const studentName = student.lastName + ", " + student.firstName;
    return (
      <>
        <Link href={/student/ + student.idNumber} className="grid grid-cols-4 justify-between hover:bg-cyan-100/20 cursor-pointer mx-36  border-b border-cyan-200 w-auto h-[4rem]">
          <p className="flex justify-start text-sm items-center pb-0">
            {studentName.toUpperCase()}
          </p>
          <p className="flex justify-center text-sm items-center pb-0">
            {student.idNumber}
          </p>
          <p className="flex justify-center text-sm items-center pb-0">
            {student.college.toUpperCase()}
          </p>
          <p className="flex justify-center text-sm items-center pb-0">
            {student.gender.toUpperCase()}
          </p>
        </Link>
      </>
    );
  }
}
