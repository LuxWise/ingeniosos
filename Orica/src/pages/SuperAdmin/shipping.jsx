import React from "react";
import Desk from "@/layout/desk";
import axiosInstance from "@/axiosInstance";
import { button } from "@/components/button";
import { table } from "@/components/CreateTable";
import { modul } from "@/components/modul";
import { useSelector, useDispatch } from "react-redux";
import { removeQuote } from "@/redux/features/quoteSlice.js";
import { URL } from "@/constans/constans";
import { FaUpload as Upload } from "react-icons/fa6";
import { change } from "@/redux/features/authSlice.js";
import { useRouter } from "next/router";
import { IoIosArrowBack as Back } from "react-icons/io";

const SubirArchivos = () => {
  const [data, setData] = React.useState([]);
  const loading = useSelector(state => state.auth);
  const quote = useSelector(state => state.quote);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(removeQuote());
    axiosInstance
      .get(`${URL}/shipments`)
      .then(res => {
        setData(res.data);
      })
      .catch(res => {});
  }, []);

  const onSubmit = () => {
    event.preventDefault();
    dispatch(change(true));
    router.push(`/SuperAdmin/shippingDetails/`);
    dispatch(change(false));
  };

  const columns = [
    {
      field: "billoflading",
      headerName: "ID",
      headerAlign: "center",
      cellClassName: "id--cell",
    },
    {
      field: "source",
      headerName: "Source",
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
    {
      field: "vessel",
      headerName: "Vessel",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "departure",
      headerName: "Departure",
      headerAlign: "center",
      cellClassName: "theme--cell",
    },
    {
      field: "arrive",
      headerName: "Arrive",
      headerAlign: "center",
      cellClassName: "theme--cell",
    },
    {
      field: "pol",
      headerName: "POL",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "pod",
      headerName: "POD",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
  ];
  return (
    <Desk>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10  ">
          <Back
            className="cursor-pointer"
            size={25}
            onClick={() => router.push("/SuperAdmin/dashboard/")}
          />
          <span className="font-semibold font-body text-4xl">Shipment</span>
        </div>{" "}
        <div className="flex mr-10">
          <button.ButtonUpdate
            text="Update"
            onSubmit={() => router.push("/Shipment/updateShipping")}
            icon={<Upload className="text-sky-600 " />}
          />
        </div>
      </div>{" "}
      <section className="flex flex-col justify-center w-full mt-5 gap-10">
        <table.CreateTable columns={columns} data={data} />
        <div className="flex items-center gap-5">
          <modul.ModuleWlg
            type="Shipment"
            date={quote.quote.departure}
            status={quote.quote.status}
            number={quote.quote == "" ? "" : quote.quote.id}
          />
          <button.ButtonSubmit
            text="Process"
            onSubmit={onSubmit}
            log={loading.loading}
          />
        </div>
      </section>
    </Desk>
  );
};

export default SubirArchivos;
