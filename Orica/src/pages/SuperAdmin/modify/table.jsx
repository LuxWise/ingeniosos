import React, { useEffect, useState } from "react";
import Desk from "@/layout/desk";
import axiosInstance from "@/axiosInstance";
import { table } from "@/components/CreateTable";
import { URL } from "@/constans/constans";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { change } from "@/redux/features/authSlice.js";
import { FaUpload as Upload } from "react-icons/fa6";

const Table = () => {
  const [data, setData] = useState([]);
  const loading = useSelector(state => state.auth);
  const TableName = useSelector(state => state.user.table);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get(`${URL}/table/${TableName}`)
      .then(res => {
        setData(res.data);
      })
      .catch(res => {});
  }, []);

  // Generar columnas dinámicamente a partir de los datos
  const columns = React.useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]).map((key, index) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        headerAlign: "center",
        flex: index === 0 ? 0 : 1,
        cellClassName: index === 0 ? "id--cell" : "theme--cell",
      }));
    }
    return [];
  }, [data]);

  return (
    <Desk>
      <div className="flex items-center justify-between">
        <span className="font-semibold font-body text-4xl">
          Table: {TableName}
        </span>
      </div>
      <section className="flex flex-col justify-center items-end w-full mt-10 ">
        <table.CreateTableAccountStatement columns={columns} data={data} />
      </section>
    </Desk>
  );
};

export default Table;
