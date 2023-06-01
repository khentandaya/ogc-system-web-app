import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>OGCAS</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}