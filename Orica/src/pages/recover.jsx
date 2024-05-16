import React from "react";
import logo from "../assets/Orica.svg";
import Image from "next/image";
import axiosInstance from "@/axiosInstance";
import { input } from "../components/input/index.jsx";
import { button } from "../components/button/index.jsx";
import { useRouter } from "next/router";
import { URL } from "../constans/constans.js";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const RecoverPassword = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onSubmit = () => {
    event.preventDefault();
    setLoading(true);
    axiosInstance
      .post(`${URL}/recoverPassword`, { email })
      .then(res => {
        setLoading(false);
        enqueueSnackbar("check your email", {
          autoHideDuration: 2000,
          style: {
            backgroundColor: "#028bca",
            fontWeight: "500",
            borderRadius: "7px",
          },
        });
      })
      .catch(res => {
        setLoading(false);
        enqueueSnackbar("check your email", {
          autoHideDuration: 2000,
          style: {
            backgroundColor: "#028bca",
            fontWeight: "500",
            borderRadius: "7px",
          },
        });
      });
  };

  return (
    <section className="w-screen h-screen bg-white">
      <SnackbarProvider />
      <Image
        className="Logo"
        src={logo}
        alt="Logo"
        onClick={() => {
          router.push("/");
        }}
      />
      <div className="flex mt-28 mb-14 lg:my-6 items-center justify-center">
        <span className="text-black text-4xl font-[500] font-body">
          Recover password
        </span>
      </div>
      <div className="flex flex-col gap-10">
        <input.InputLog text="Email" input={setEmail} value={email} />
      </div>
      <div className="flex my-5 mx-10  lg:my-10 items-center justify-center">
        <div className="flex flex-col w-[450px]">
          <span className="text-sm lg:text-base font-body">
            Forgot your password?
          </span>
          <span className="text-black text-sm lg:text-base font-body">
            Don't worry, we're here to help! Enter your email address below and
            we'll send you a link to reset your password
          </span>
        </div>
      </div>
      <div className="flex my-20 lg:my-14 items-center justify-center gap-20">
        <button.ButtonSubmit text="Recover" onSubmit={onSubmit} log={loading} />
      </div>
    </section>
  );
};

export default RecoverPassword;
