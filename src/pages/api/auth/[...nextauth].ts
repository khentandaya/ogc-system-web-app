import Staff from "@/models/Staff";
import Student from "@/models/Student";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID + "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET + "",
    }),
  ],
  secret: "GnEg0dJ8F1tXBm1sspUtyVC+6yn+1DmqxlsAg45w5sM=",
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      const student = await Student.findOne({ email: session.user.email });
      const staff = await Staff.findOne({ email: session.user.email });

      if (student) {
        const { _doc } = student;
        const { password, __v, ...user } = _doc;
        user.usertype = "student";
        return {
          user: {
            image: session.user.image,
            name: session.user.name,
            ...user,
          },
        };
      } else if (staff) {
        const { _doc } = staff;
        const { password, __v, ...user } = _doc;
        user.usertype = "staff";
        return {
          user: {
            image: session.user.image,
            name: session.user.name,
            ...user,
          },
        };
      }
      return {
        ...session
      };
    },
  },
};

export default NextAuth(authOptions);
