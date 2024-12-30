import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import Head from "next/head";
import { useRouter } from "next/router";
const Layout = ({ children }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router.pathname === "/register" || router.pathname === "/login") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [router.pathname]);
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      {show && <Header />}
      {children}
      {show && <Footer />}
    </div>
  );
};

export default Layout;
