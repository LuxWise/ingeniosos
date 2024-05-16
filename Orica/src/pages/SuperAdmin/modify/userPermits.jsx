import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import { modul } from "@/components/modul";
import { button } from "@/components/button/index.jsx";
import { URL } from "@/constans/constans";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  addChange,
  addUserStatus,
  addUserType,
  cleanChange,
  openClose,
} from "@/redux/features/userSlice";
import { IoIosArrowBack as Back } from "react-icons/io";

const UserPermits = () => {
  const [data, setData] = React.useState([]);
  const [permisions, setPermisions] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const info = useSelector(state => state.user.userInfo);
  const permissions = useSelector(state => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    info == "" || info == undefined || info == []
      ? router.push(`/SuperAdmin/userManager/`)
      : null;
    axiosInstance
      .get(`${URL}/users`)
      .then(res => {
        setData(res.data);
      })
      .catch();
    axiosInstance
      .get(`${URL}/listRole`)
      .then(res => {
        setPermisions(res.data);
      })
      .catch();
    axiosInstance
      .get(`${URL}/listStatus`)
      .then(res => {
        setStatus(res.data);
      })
      .catch();
  }, []);

  const changeUserName = () => {
    dispatch(addChange("username"));
    dispatch(openClose(true));
  };

  const changePassword = () => {
    dispatch(addChange("password"));
    dispatch(openClose(true));
  };

  const onSubmit = () => {
    event.preventDefault();

    axiosInstance
      .put(`${URL}/modifyUser`, {
        username: permissions.username,
        password: permissions.password,
        idrole: permissions.userType,
        idstatus: permissions.userStatus,
        idUser: permissions.userInfo.id,
      })
      .then(res => {
        router.push("/SuperAdmin/userManager/");
      })
      .catch(res => console.log());
  };

  return (
    <Desk>
      <div className="flex items-center gap-10  ">
        <Back
          className="cursor-pointer"
          size={25}
          onClick={() => router.push("/SuperAdmin/quotations/")}
        />
        <span className="font-semibold font-body text-4xl">Permissions</span>
      </div>

      <section className="grid grid-cols-7 w-full gap-10 mt-5">
        <div className="flex flex-col col-span-2 gap-5">
          <modul.ModulePermissions
            type="Type user"
            info={permisions}
            typebase={info.role}
            add={addUserType}
          />
          <modul.ModuleModify type="username">
            <button.ButtonChange
              text="new username"
              onSubmit={changeUserName}
            />
          </modul.ModuleModify>
        </div>
        <div className="flex flex-col col-span-2 gap-5">
          <modul.ModulePermissions
            type="User status"
            info={status}
            typebase={info.status}
            add={addUserStatus}
          />
          <modul.ModuleModify type="password">
            <button.ButtonChange
              text="new password"
              onSubmit={changePassword}
            />
          </modul.ModuleModify>
        </div>
        <div className="flex flex-col col-span-3 items-center w-full gap-5">
          <modul.ModuleUserModify type="User info" info={info} />
          <button.ButtonSubmit text="Save" onSubmit={onSubmit} />
        </div>
      </section>
    </Desk>
  );
};

export default UserPermits;
