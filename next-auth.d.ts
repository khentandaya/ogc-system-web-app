import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      image: string;
      name: string;
      email: string;
      firstName: string;
      lastName: string;
      middleInitial?: string;
      idNumber: string;
      college?: string;
      phone?: string;
      birthdate: Date;
      gender?: string;
      address?: string;
      year?: string;
    }
  }
}
