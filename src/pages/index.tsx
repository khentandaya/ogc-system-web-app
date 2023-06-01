import React from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect : {
        destination: "/login",
        permanent: false,
      } 
    };
  }
  return {
    props: {}
  };
}

export default function HomePage() {
  const session = useSession();
  return (
    <main>
      {session.status === "authenticated" ? (
        <Image
          src={session.data?.user?.image + ""}
          alt={"avatar"}
          width={40}
          height={40}
          className="w-auto"
        />
      ) : (
        ""
      )}
      Hi!, {session.data?.user?.name} <br />
      <button onClick={() => signOut()}>logout</button><br />
    </main>
  );
}