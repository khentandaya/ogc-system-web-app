import React from "react";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <main>
      Hi!, {session.data?.user.name} <br />
      <button onClick={() => signOut()}>logout</button>
    </main>
  );
}
