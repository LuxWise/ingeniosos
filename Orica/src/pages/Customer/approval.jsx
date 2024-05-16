import Desk from "@/layout/desk";
import React, { useEffect } from "react";
import axiosInstance from "@/axiosInstance";
import { table } from "@/components/CreateTable";
import { modul } from "@/components/modul";
import { URL } from "@/constans/constans";
import { button } from "@/components/button";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { removePreview } from "@/redux/features/previewSlice";
import { removeQuote } from "@/redux/features/quoteSlice";

const Approval = () => {
  const [data, setData] = React.useState([]);
  const quote = useSelector(state => state.quote);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(removePreview());
    dispatch(removeQuote());
    axiosInstance
      .get(`${URL}/quote/process`)
      .then(res => {
        setData(res.data);
      })
      .catch(res => {});
  }, [dispatch]);

  const onSubmit = () => {
    router.push("/Customer/newProcess");
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      cellClassName: "id--cell",
    },
    {
      field: "port",
      headerName: "Port",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      flex: 1,
      cellClassName: "status--cell",
    },
  ];
  return (
    <Desk>
      <span className="font-semibold font-body text-4xl">Pending approval</span>
      <section className="flex w-full mt-5 gap-5">
        <div className="flex flex-col justify-center w-6/12 gap-4">
          <table.CreateTableMd
            columns={columns}
            data={data}
            type="processProducts"
          />
          <div className="flex flex-col gap-1 h-36">
            <span className="text-lg font-body font-semibold">Details</span>
            <modul.ModuleWmd
              type="Quotation"
              date={quote.quote.date}
              status={quote.quote.status}
              number={quote.quote == "" ? "" : quote.quote.id}
            />
          </div>
        </div>
        <div className="flex flex-col h-full justify-center items-center w-6/12 gap-10">
          <modul.ModuleApproval text="Products" />
          <button.ButtonSubmit text="Process" onSubmit={onSubmit} />
        </div>
      </section>
    </Desk>
  );
};

export default Approval;
