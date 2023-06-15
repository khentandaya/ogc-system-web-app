import Link from "next/link";
import React from "react";
import ScrollLink from "./scrollLink";

type Props = {};

export default function StudentSideNav({}: Props) {
  return (
    <div className="">
      <div className="sticky top-10">
        <li className="flex text-slate-700 text-sm font-semibold flex-col gap-8 p-4">
          <ol className="cursor-pointer hover:text-primary ">
            <ScrollLink href="#studentdata">Student Data</ScrollLink>
          </ol>
          <ol className="cursor-pointer hover:text-primary">
            <ScrollLink href="#personaldata">Personal Data</ScrollLink>
          </ol>
        </li>
      </div>
    </div>
  );
}
