import Desk from "@/layout/desk";
import React, { use } from "react";
import axiosInstance from "@/axiosInstance.js";
import { button } from "../../components/button/index.jsx";
import { useRouter } from "next/router.js";
import { URL } from "@/constans/constans.js";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "@/redux/features/userSlice.js";
import { RiChatVoiceFill as Chat } from "react-icons/ri";
import { openClose } from "@/redux/features/chatSlice.js";
import { FaClipboard as Quotations } from "react-icons/fa";
import { RiMapPin2Fill as Shipping } from "react-icons/ri";
import { TbDeviceIpadMinus as Admin } from "react-icons/tb";
import { FaDatabase as Database } from "react-icons/fa";
import { IoIosListBox as Proforma } from "react-icons/io";
import { MdBorderColor as Order } from "react-icons/md";
import { MdViewModule as Division } from "react-icons/md";

const Dashboard = () => {
  const user = useSelector(state => state.user.name);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    axiosInstance.get(`${URL}/user`).then(response => {
      dispatch(setName(response.data));
    });
  }, [dispatch]);

  return (
    <Desk>
      <div className="flex items-center justify-between mx-10">
        <span className="font-semibold font-body text-4xl">
          ¡Welcome, {user.name}!
        </span>
        <button.ButtonChat
          text="Assistant"
          icon={<Chat size="20" className="text-[#024f72]" />}
          onSubmit={() => dispatch(openClose(true))}
        />
      </div>
      <section className="mt-5">
        <span className="text-xl font-body font-medium">Basic actions</span>
        <div className="grid grid-cols-3 gap-10">
          <BasicActions
            title={"Quotation"}
            icon={<Quotations size="50" />}
            route="quotations"
          />
          <BasicActions
            title={"Proforma"}
            icon={<Proforma size="50" />}
            route="proforma"
          />
          <BasicActions
            title={"Shipping"}
            icon={<Shipping size="50" />}
            route="shipping"
          />
        </div>
      </section>
      <section className="mt-5">
        <span className="text-xl font-body font-medium">Modify actions</span>
        <div className="grid grid-cols-4 gap-5">
          <ModifyActions
            title={"User Manager"}
            icon={<Admin size="45" />}
            route="userManager"
          />
          <ModifyActions
            title={"Divisions"}
            icon={<Division size="45" />}
            route="divisions"
          />
          <ModifyActions
            title={"OrderName"}
            icon={<Order size="40" />}
            route="orderName"
          />
          <ModifyActions
            title={"Database"}
            icon={<Database size="40" />}
            route="database"
          />
        </div>
      </section>
    </Desk>
  );
};

const BasicActions = ({ title, icon, route }) => {
  const router = useRouter();
  const baseRoute = useSelector(state => state.route.route);

  return (
    <div
      className="flex flex-col w-full1 h-48 bg-sky-50 rounded-lg justify-center items-center my-5 cursor-pointer shadow-lg shadow-sky-300 border-t-4 border-sky-200 hover:bg-sky-400 hover:border-sky-400 transition-all duration-400 group"
      onClick={() => router.push(`/${baseRoute}/${route}`)}
    >
      <div className="py-5 group-hover:text-white ">{icon}</div>
      <div>
        <span className="text-xl font-body group-hover:text-white group-hover:font-semibold">
          {title}
        </span>
      </div>
    </div>
  );
};

const ModifyActions = ({ title, icon, route }) => {
  const router = useRouter();
  const baseRoute = useSelector(state => state.route.route);

  return (
    <div
      className="flex flex-col w-full1 h-40 bg-sky-200 rounded-xl justify-center items-center my-5 cursor-pointer border-2 border-sky-300 shadow-md shadow-sky-400 hover:shadow-lg hover:shadow-sky-400 hover:bg-sky-100 transition-all group"
      onClick={() => router.push(`/${baseRoute}/${route}`)}
    >
      <div className="py-5 group-hover:text-sky-600 transition-all">{icon}</div>
      <div>
        <span className="text-lg group-hover:text-sky-600 font-body transition-all">
          {title}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
