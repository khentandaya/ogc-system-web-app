import Button from "@/components/button";
import Input from "@/components/input";
import React from "react";

type Props = {};

export default function StaffSignupPage({}: Props) {
  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="w-[45rem] flex flex-col items-center justify-center gap-6 h-full p-4">
        <h1>eOGC</h1>
        <form className="flex flex-col gap-4" onSubmit={() => {}}>
          <div className="flex justify-center gap-4">
            <Input className="grow" name="firstName">
              First Name
            </Input>
            <Input className="grow" name="lastName">
              Last Name
            </Input>
            <Input className="w-16" maxLength={1} name="initials">
              Initial
            </Input>
          </div>
          <div className="flex flex-col gap-4">
            <Input name="email">Email</Input>
            <Input name="phone">Phone</Input>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1 grow">
                <label className="px-1">College</label>
                <select
                  className="px-2 outline-0 py-2 border-[2.5px] h-15 w-50 rounded-xl border-slate-300"
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
              <Input className="grow" type="date" name="birthdate">
                Birthdate
              </Input>
              <div className="flex flex-col gap-1 grow">
                <label className="px-1">Gender</label>
                <select
                  className="px-2 outline-0 py-2 border-[2.5px] h-15 w-50 rounded-xl border-slate-300"
                  name="college"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <Input name="address">Address</Input>
          <div className="flex justify-end grow">
            <Button className="px-6 bg-primarydark text-secondary">Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
