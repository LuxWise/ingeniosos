import Desk from "@/layout/desk";
import React from "react";
import Image from "next/image";
import axiosInstance from "@/axiosInstance.js";
import databaseImg from "@/assets/database.png";
import { URL } from "@/constans/constans.js";
import { FiTable as Table } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { addTable } from "@/redux/features/userSlice";
import { useRouter } from "next/router";
import { IoIosArrowBack as Back } from "react-icons/io";

const Database = () => {
  const [database, setDatabase] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    axiosInstance
      .get(`${URL}/database/tables`)
      .then(res => {
        setDatabase(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Desk>
      <div className="flex items-center gap-10  ">
        <Back
          className="cursor-pointer"
          size={25}
          onClick={() => router.push("/SuperAdmin/dashboard/")}
        />
        <span className="font-semibold font-body text-4xl">Database </span>
      </div>
      <section className="grid grid-cols-6 gap-5 mt-10">
        {database.map((table, index) => {
          return <TableItem table={table} key={index} />;
        })}
      </section>
    </Desk>
  );
};

const TableItem = ({ table }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center justify-center bg-sky-50 rounded-lg  hover:bg-sky-300 shadow-md shadow-sky-300
    hover:shadow-md hover:shadow-sky-300 transition-all duration-300 w-48 h-32 border-t-4 border-sky-300"
      key={table.tablename}
      onClick={() => {
        dispatch(addTable(table.tablename));
        router.push("/SuperAdmin/modify/table/");
      }}
    >
      <Table size="60" className="text-sky-800" />
      <span className=" font-body">{table.tablename}</span>
    </div>
  );
};

export default Database;
