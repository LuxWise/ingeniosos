import React from "react";
import Navbar from "@/layout/navbar";
import Sidebar from "@/layout/sidebar";
import axiosInstance from "@/axiosInstance";
import User from "@/layout/user";
import { useRouter } from "next/router.js";
import { modul } from "@/components/modul";
import { URL } from "@/constans/constans";
import { FaYoutube as Youtube } from "react-icons/fa";
import { FaTiktok as Tiktok } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAnalytics } from "@next/third-parties/google";
import { openClose as openCloseUser } from "@/redux/features/logoutSlice";
import { Chat } from "@/components/chatbot/index.jsx";
import { openClose as openCloseChat } from "@/redux/features/chatSlice";
import { openClose as openCloseMail } from "@/redux/features/mailSlice";
import Mail from "@/components/mail";
import jwt from "jsonwebtoken";
import {
  addNewUsername,
  confirmNewUsername,
  addNewPassword,
  confirmNewPassword,
  cleanChange,
  openClose as openCloseChange,
} from "@/redux/features/userSlice";
import {
  openClose as openCloseDivide,
  removeDivide,
} from "@/redux/features/divideSlice";

const Desk = props => {
  const router = useRouter();
  const baseRoute = useSelector(state => state.route.route);
  const openUser = useSelector(state => state.logout.open);
  const openChange = useSelector(state => state.user.open);
  const openChat = useSelector(state => state.chat.open);
  const openMail = useSelector(state => state.mail.open);
  const openDivide = useSelector(state => state.divide.open);
  const change = useSelector(state => state.user.cl);
  const [cookieChecked, setCookieChecked] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    axiosInstance
      .get(`${URL}/cookie`)
      .then(res => {
        if (res.data.err === "No Token") {
          router.replace("/");
          dispatch(openCloseUser(false));
          dispatch(openCloseChange(false));
        }
        const decode = jwt.decode(res.data);
        if (window.location.href.split("/")[3] !== decode.role) {
          router.replace("/");
          dispatch(openCloseUser(false));
          dispatch(openCloseChange(false));
        }

        setCookieChecked(true);
      })
      .catch(res => {
        router.push("/");
      });
  }, [router, dispatch]);

  const closeUser = () => {
    dispatch(openCloseUser(false));
  };

  const closeChange = () => {
    dispatch(openCloseChange(false));
    dispatch(cleanChange());
  };

  const closeChat = () => {
    dispatch(openCloseChat(false));
  };

  const closeMail = () => {
    dispatch(openCloseMail(false));
  };

  const closeDivide = () => {
    dispatch(openCloseDivide(false));
    dispatch(removeDivide());
  };

  return (
    <section className={`w-screen h-screen m-0 bg-[#f9fbff]`}>
      <GoogleAnalytics gaId="G-7Q8F0SCDDV" />
      <Navbar />
      {baseRoute != "SuperAdmin" && <Sidebar />}
      {openChat && <Chat close={closeChat} />}
      {openUser && <User close={closeUser} />}
      {openMail && <Mail close={closeMail} />}
      {openDivide && <modul.Divide close={closeDivide} />}

      {openChange && (
        <modul.ModuleChange
          close={closeChange}
          type={change}
          add={change === "username" ? addNewUsername : addNewPassword}
          confirm={
            change === "username" ? confirmNewUsername : confirmNewPassword
          }
        />
      )}

      {cookieChecked && (
        <section
          className={`pt-20 w-[90%] h-[90%] ${
            baseRoute !== "SuperAdmin" && "pl-80"
          }`}
        >
          <div className="w-full h-full ml-5 lg:ml-20 mt-5">
            {props.children}
          </div>
        </section>
      )}
      <footer className="fixed flex items-center justify-center w-full h-6 bottom-0 bg-[#e5f7ff] gap-5 font-body text-[#727b7f]">
        <a href="https://ingeniososweb.com/">
          <span>developed by ingeniososweb </span>
        </a>
        <a href="https://www.youtube.com/@Ingeniososweb">
          <Youtube />
        </a>
        <Tiktok />
      </footer>
    </section>
  );
};

export default Desk;
