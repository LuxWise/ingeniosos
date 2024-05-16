import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import { table } from "@/components/CreateTable";
import { modul } from "@/components/modul";
import { URL } from "@/constans/constans";
import { useSelector, useDispatch } from "react-redux";
import { removeQuote } from "@/redux/features/quoteSlice.js";

const Proforma = () => {
  const [data, setData] = React.useState([]);
  const quote = useSelector(state => state.quote);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(removeQuote());
    axiosInstance
      .get(`${URL}/proforma`)
      .then(res => {
        setData(res.data);
      })
      .catch(res => {});
  }, []);

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
      field: "bank",
      headerName: "Bank",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
  ];
  return (
    <Desk>
      <span className="font-semibold font-body text-4xl">Proforma</span>
      <section className="flex flex-col justify-center w-full mt-5 gap-10">
        <table.CreateTable columns={columns} data={data} />
        <modul.ModuleWlg
          type="proforma"
          date={quote.quote.date}
          status={quote.quote.status}
          number={quote.quote == "" ? "" : quote.quote.id}
        />
      </section>
    </Desk>
  );
};

export default Proforma;
