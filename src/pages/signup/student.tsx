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
import Image from "next/image";

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
    (_, i) => i !== fullNameArr.length - 1
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
    const newStudent = await axios.post("/api/student", formJSON);
    const studentProfile = await axios.post("/api/studentprofile", {
      firstname: formJSON.firstName,
      lastname: formJSON.lastName,
      middleinitial: formJSON.middleInitial,
      idNumber: formJSON.idNumber,
      contactNumber: formJSON.phone,
      birthDate: formJSON.birthdate,
      sex: formJSON.gender,
      homeAddress: formJSON.address,
      college: formJSON.college,
    });
    console.log(studentProfile);
    session.update({ ...session.data, ...newStudent });
    setButtonLoad(false);
    router.push("/");
  };

  if (session.status === "authenticated")
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-foreground">
        <div className="flex h-full w-[45rem] flex-col items-center justify-center gap-6 p-4">
          <div className="flex items-center justify-center gap-2 pb-6">
            <Image
              src="/msuiit_logo.png"
              alt="iit logo"
              width={60}
              height={60}
              className="w-auto"
            />
            <h1>eOGC</h1>
          </div>
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
                name="middleInitial"
                placeholder="T"
                required
              >
                Initial
              </Input>
            </div>
            <div className="flex flex-col gap-4">
              <Input
                name="email"
                defaultValue={session.data.user?.email + ""}
                required
              >
                Email
              </Input>
              <div className="flex grow gap-4">
                <Input name="phone" className="grow" required>
                  Phone
                </Input>
                <Input name="idNumber" placeholder="2000-0000" required>
                  ID Number
                </Input>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex grow flex-col gap-[12px]">
                  <label className="px-1">College</label>
                  <select
                    className="h-15 w-50 rounded-xl border-[2.5px] border-slate-300 bg-foreground px-2 py-2 outline-0"
                    name="college"
                    required
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
                <div className="flex grow flex-col gap-[12px]">
                  <label className="px-1">Gender</label>
                  <select
                    className="h-15 w-50 rounded-xl border-[2.5px] border-slate-300 bg-foreground px-2 py-2 outline-0"
                    name="gender"
                    required
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
              required
            >
              Address
            </Input>
            <div className="flex grow justify-end">
              <Button
                className="flex items-center gap-3 bg-primarydark px-6 text-white hover:bg-primarydark/80 hover:text-white"
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
