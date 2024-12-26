import React from "react";
import Header from "./header";
import Footer from "./footer";
import Head from "next/head";
const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
