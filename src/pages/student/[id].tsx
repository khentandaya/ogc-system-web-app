import React, { useEffect, useState } from "react";
import StaffNav from "@/components/staffNav";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import Staff from "@/models/Staff";
import { useRouter } from "next/router";
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

export default function StudentInfo({}: Props) {
  const router = useRouter();
  const id = router.query.id;
  const [student, setStudent] = useState<any>();

  console.log(student)

  useEffect(() => {
    if (id) {
        axios.get(`/api/studentprofile/${id}`).then(({data})=>{
            setStudent(data);
        })
    }
  }, [id]);
  
  return (
    <div className="flex flex-col">
        {student?.firstname}
      <StaffNav />
    </div>
  );
}
