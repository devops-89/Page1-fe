import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import Head from "next/head";
import { useRouter } from "next/router";
import { authenticationController } from "@/api/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "@/redux/reducers/user";
import ToastBar from "./toastBar";
const Layout = ({ children }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (
      router.pathname === "/register" ||
      router.pathname === "/login" ||
      router.pathname === "/verifyOTP" ||
      router.pathname === "/forget-password"
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [router.pathname]);
  const isAuthenticated = useSelector((state) => state.USER.isAuthenticated);

  const getDetails = () => {
    if (isAuthenticated || localStorage.getItem("accesstoken")) {
      authenticationController
        .getUserDetails()
        .then((res) => {
          let response = res.data.data;
          dispatch(setUserDetails({ ...response, isAuthenticated: true }));
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accesstoken")) {
      getDetails();
    }
  });

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      {show && <Header />}
      {children}
      {show && <Footer />}
      <ToastBar/>
    </div>
  );
};

export default Layout;
