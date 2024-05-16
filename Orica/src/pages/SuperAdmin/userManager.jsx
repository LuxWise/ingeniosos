import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import { modul } from "@/components/modul";
import { table } from "@/components/CreateTable";
import { button } from "@/components/button/index.jsx";
import { URL } from "@/constans/constans";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { cleanChange } from "@/redux/features/userSlice";
import { IoIosArrowBack as Back } from "react-icons/io";
import { removeUserSelected } from "../../redux/features/userSlice";

const UserManager = () => {
  const [data, setData] = React.useState([]);
  const info = useSelector(state => state.user.userInfo);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(cleanChange());
    dispatch(removeUserSelected());

    axiosInstance
      .get(`${URL}/users`)
      .then(res => {
        setData(res.data);
      })
      .catch();
  }, [dispatch]);

  const colums = [
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      flex: 1,
      cellClassName: "id--cell",
    },
    {
      field: "role",
      headerName: "Role",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
  ];

  return (
    <Desk>
      <section className="flex w-full items-center justify-between">
        <div className="flex items-center gap-10  ">
          <Back
            className="cursor-pointer"
            size={25}
            onClick={() => router.push("/SuperAdmin/dashboard/")}
          />
          <span className="font-semibold font-body text-4xl">User Manager</span>
        </div>

        <div className="flex mr-10">
          <button.ButtonQuotations
            text="Create user"
            onSubmit={() => router.push("/SuperAdmin/addUser")}
          />
        </div>
      </section>
      <section className="grid grid-cols-7 w-full gap-10 mt-5">
        <div className="col-span-4">
          <table.CreateTableUser columns={colums} data={data} />
        </div>
        <div className="flex flex-col col-span-3 items-center w-full gap-5">
          <modul.ModuleUserMod type="Details" info={info} />
          <button.ButtonSubmit
            text="Modify"
            onSubmit={() => router.push("/SuperAdmin/modify/userPermits/")}
          />
        </div>
      </section>
    </Desk>
  );
};

export default UserManager;
