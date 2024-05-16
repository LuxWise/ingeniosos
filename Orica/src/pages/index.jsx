import React from "react";
import logo from "../assets/Orica.svg";
import key from "../assets/key.svg";
import axiosInstance from "@/axiosInstance";
import Image from "next/image";
import Swal from "sweetalert2";
import { input } from "../components/input/index.jsx";
import { button } from "../components/button/index.jsx";
import { useRouter } from "next/router";
import { URL } from "../constans/constans.js";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { change } from "@/redux/features/authSlice.js";
import { setRoute } from "@/redux/features/routesSlice.js";
import { GoogleAnalytics } from "@next/third-parties/google";
import { sendGAEvent } from "@next/third-parties/google";

const Login = () => {
  const [user, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const loading = useSelector(state => state.auth);
  const router = useRouter();

  const dispatch = useDispatch();

  const onSubmit = () => {
    sendGAEvent({ event: "buttonClicked", value: "log" });
    event.preventDefault();
    dispatch(change(true));

    axiosInstance
      .post(`${URL}/login`, { user, password })
      .then(res => {
        dispatch(change(false));
        dispatch(setRoute(`${res.data.role}`));
        router.push(`/${res.data.role}/dashboard`);
      })
      .catch(res => {
        console.log(res);
      });
  };

  return (
    <section className="bg-white">
      <GoogleAnalytics gaId="G-7Q8F0SCDDV" />
      <SnackbarProvider />
      <Image className="Logo" src={logo} alt="Logo" />
      <div className="flex mt-28 max-md:mt-10 mb-14 lg:my-6 items-center justify-center">
        <span className="text-black text-4xl font-[600] font-body">
          Welcome
        </span>
      </div>
      <div className="flex justify-center md:hidden w-full h-full">
        <span className="text-black text-4xl font-[600] font-body">
          Coming soon ...
        </span>
      </div>
      <div className="max-md:hidden w-full flex flex-col gap-10">
        <input.InputLog text="Email" input={setUsername} value={user} />
        <input.InputLog text="Password" input={setPassword} value={password} />
      </div>
      <div className="max-md:hidden flex my-20 max-md:my-10 lg:my-14 items-center justify-center gap-20">
        <button.ButtonSubmit
          text="Sing in"
          onSubmit={onSubmit}
          log={loading.loading}
        />
      </div>
      <div className="max-md:hidden flex mt-5 items-center justify-center gap-20">
        <div className="hidden lg:block w-80 h-1 bg-[#0099CC]" />
        <Image className="key" src={key} alt="Logo" />
        <div className="hidden lg:block w-80 h-1 bg-[#0099CC]" />
      </div>
      <div
        className="max-md:hidden flex mt-12 items-center justify-center cursor-pointer"
        onClick={() => router.push("/recover")}
      >
        <span className="text-lg text-[#4D4D4D] font-bo">
          ¿Forgot your password?
        </span>
      </div>
    </section>
  );
};

export default Login;
