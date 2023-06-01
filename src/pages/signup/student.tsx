import React, { useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GetServerSidePropsContext } from "next/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Student from "@/models/Student";

type Props = {};

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const student = await Student.findOne({ email: session?.user?.email });
    if (student)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
  }
  return {
    props: {},
  };
}

export default function StudentSignupPage({}: Props) {
  const session = useSession();
  const router = useRouter();
  const user = session.data?.user;
  const fullNameArr = user?.name?.split(" ");
  const firstNameArr = fullNameArr?.filter(
    (e, i) => i !== fullNameArr.length - 1
  );
  const firstName = firstNameArr?.toString().replaceAll(",", " ")
    ? firstNameArr?.toString().replaceAll(",", " ")
    : "";
  const lastName = fullNameArr ? fullNameArr[fullNameArr.length - 1] : "";

  const [buttonLoad, setButtonLoad] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;
    setButtonLoad(true);
    const form = new FormData(e.target);
    const formJSON = Object.fromEntries(form.entries());
    console.log(formJSON);
    await axios.post("/api/student", formJSON);
    setButtonLoad(false);
    router.push("/");
  };

  if (session.status === "authenticated")
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-foreground">
        <div className="w-[45rem] flex flex-col items-center justify-center gap-6 h-full p-4">
          <h1>eOGC</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex justify-center gap-4">
              <Input
                className="grow"
                name="firstName"
                defaultValue={firstName}
                required
              >
                First Name
              </Input>
              <Input
                className="grow"
                name="lastName"
                defaultValue={lastName}
                required
              >
                Last Name
              </Input>
              <Input
                className="w-16"
                maxLength={1}
                name="initials"
                placeholder="T"
              >
                Initial
              </Input>
            </div>
            <div className="flex flex-col gap-4">
              <Input name="email" defaultValue={session.data.user?.email + ""}>
                Email
              </Input>
              <div className="flex grow gap-4">
                <Input name="phone" className="grow">
                  Phone
                </Input>
                <Input name="idNumber" placeholder="2018-2302" required>
                  ID Number
                </Input>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-1 grow">
                  <label className="px-1">College</label>
                  <select
                    className="px-2 outline-0 py-2 border-[2.5px] bg-foreground h-15 w-50 rounded-xl border-slate-300"
                    name="college"
                  >
                    <option value="ccs">CCS</option>
                    <option value="ced">CED</option>
                    <option value="chs">CHS</option>
                    <option value="csm">CSM</option>
                    <option value="coe">COE</option>
                    <option value="ceba">CEBA</option>
                    <option value="cass">CASS</option>
                  </select>
                </div>
                <Input className="grow" type="date" name="birthdate" required>
                  Birthdate
                </Input>
                <div className="flex flex-col gap-1 grow">
                  <label className="px-1">Gender</label>
                  <select
                    className="px-2 outline-0 bg-foreground py-2 border-[2.5px] h-15 w-50 rounded-xl border-slate-300"
                    name="gender"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <Input
              name="address"
              placeholder="House No./Blg Block, Street, Town, City, Province, Zip"
            >
              Address
            </Input>
            <div className="grow flex justify-end">
              <Button
                className="flex gap-3 items-center px-6 bg-primarydark hover:bg-primarydark/80 hover:text-white text-white"
                disabled={buttonLoad}
              >
                {buttonLoad ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  ""
                )}
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  return <></>;
}
