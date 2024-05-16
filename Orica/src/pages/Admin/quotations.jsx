import Desk from "@/layout/desk";
import React, { useEffect } from "react";
import axiosInstance from "@/axiosInstance";
import { table } from "@/components/CreateTable";
import { modul } from "@/components/modul";
import { button } from "@/components/button";
import { URL } from "@/constans/constans";
import { useSelector, useDispatch } from "react-redux";
import { change } from "@/redux/features/authSlice.js";
import { removeQuote } from "@/redux/features/quoteSlice.js";
import { useRouter } from "next/router";
import { IoIosArrowBack as Back } from "react-icons/io";

const Quotations = () => {
  const [data, setData] = React.useState([]);
  const loading = useSelector(state => state.auth);
  const quote = useSelector(state => state.quote);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeQuote());
    axiosInstance
      .get(`${URL}/quotes`)
      .then(res => {
        setData(res.data);
      })
      .catch(res => {});
  }, []);

  const onSubmit = () => {
    event.preventDefault();
    dispatch(change(true));
    router.push(`/SuperAdmin/modify/quotations/`);
    dispatch(change(false));
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      cellClassName: "id--cell",
    },
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "port",
      headerName: "Port",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "phone",
      headerName: "Phone",
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
      field: "date",
      headerName: "Date",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
  ];
  return (
    <Desk>
      <div className="flex items-center gap-10  ">
        <Back
          className="cursor-pointer"
          size={25}
          onClick={() => router.push("/SuperAdmin/dashboard/")}
        />
        <span className="font-semibold font-body text-4xl">Quotations</span>
      </div>

      <section className="flex flex-col justify-center w-full mt-5 gap-10">
        <table.CreateTable columns={columns} data={data} />
        <div className="flex items-center gap-5">
          <modul.ModuleWlg
            type="Quotation"
            date={quote.quote.date}
            status={quote.quote.status}
            number={quote.quote == "" ? "" : quote.quote.id}
          />
          <button.ButtonSubmit
            text="Modify"
            onSubmit={onSubmit}
            log={loading.loading}
          />
        </div>
      </section>
    </Desk>
  );
};

export default Quotations;
