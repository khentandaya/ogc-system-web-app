import React from "react";
import { signIn, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import Image from "next/image";
import Button from "@/components/button";
import Student from "@/models/Student";
import Staff from "@/models/Staff";

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const student = await Student.findOne({ email: session?.user?.email });
    const staff = await Staff.findOne({ email: session?.user?.email });

    if (!(student && staff))
      return {
        redirect: {
          destination: "/signup",
          permanent: false,
        },
      };
  }
  return {
    props: {},
  };
}

export default function LoginPage() {
  const session = useSession();
  if (session.status === "unauthenticated")
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center gap-5">
            <Image
              src="/msuiit_logo.png"
              alt="iit logo"
              width={120}
              height={120}
              className="w-auto"
            />
            <p className="text-center">Welcome to eOGC (tentative)</p>
            <div className="flex gap-3">
              <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
                Login
              </Button>
              <Button
                onClick={() => signIn("google", { callbackUrl: "/signup" })}
              >
                Signup
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 text-xs">All Rights Reserved</div>
      </>
    );
  return <></>;
}
