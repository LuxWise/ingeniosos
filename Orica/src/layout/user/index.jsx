import Image from "next/image";
import axiosInstance from "@/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { openClose as closeLogout } from "@/redux/features/logoutSlice";
import {
  clearMessages,
  openClose as closeChat,
} from "@/redux/features/chatSlice.js";
import { URL } from "@/constans/constans";
import { useRouter } from "next/router";
import { clean } from "@/redux/features/quoteSlice";
import { removePreview } from "@/redux/features/previewSlice";
import { ImCross } from "react-icons/im";
import { removeAllDivide } from "@/redux/features/divideSlice";

const User = ({ close }) => {
  const user = useSelector(state => state.user.name);
  const dispatch = useDispatch();
  const router = useRouter();

  const onLogout = () => {
    event.preventDefault();
    axiosInstance
      .post(`${URL}/logout`, {})
      .then(res => {
        dispatch(clean(""));
        if (res.data.err == "No Token") {
          router.replace("/");
        }
        router.push("/");
      })
      .catch(res => {
        router.push("/");
      });
    dispatch(removePreview());
    dispatch(closeLogout(false));
    dispatch(closeChat(false));
    dispatch(clearMessages());
    dispatch(removeAllDivide());
  };

  return (
    <div className="fixed flex z-40 h-full w-full">
      <div className="User" onClick={close}></div>
      <div
        className="flex flex-col justify-between h-full w-2/6 bg-white p-16 
       max-md:w-full"
      >
        <div className="flex flex-col items-center gap-5">
          <div className="flex w-full justify-end md:hidden">
            <ImCross size={20} onClick={close} />
          </div>
          <Image
            className="w-36 h-36 object-cover rounded-full"
            src="https://orica.ingeniososweb.com/img/user.png"
            width="350"
            height="350"
            alt="User"
          />
          <span className="font-body font-semibold text-2xl"> {user.name}</span>
          <span className="font-body font-medium text-sky-600">
            {user.role}
          </span>
          <span className="font-body font-medium text-lg">{user.email}</span>
        </div>
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={onLogout}
        >
          <span className="font-body font-semibold text-xl text-[#024f72]">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default User;
