import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import { table } from "@/components/CreateTable";
import { modul } from "@/components/modul";
import { URL } from "@/constans/constans";
import { button } from "@/components/button";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { removePreview } from "@/redux/features/previewSlice";
import { addTaxes, removeProformaCart } from "@/redux/features/proformaSlice";
import { change } from "@/redux/features/authSlice.js";
import { removeQuote } from "@/redux/features/quoteSlice";

const PreviewQuote = () => {
  const [data, setData] = React.useState([]);
  const quote = useSelector(state => state.quote);
  const loading = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    dispatch(removeProformaCart());
    dispatch(removePreview());
    dispatch(removeQuote());
    axiosInstance
      .get(`${URL}/quoteProforma`)
      .then(res => {
        setData(res.data);
      })
      .catch(res => {});
  }, [dispatch]);

  const onSubmit = () => {
    event.preventDefault();
    dispatch(change(true));

    axiosInstance
      .get(`${URL}/proformaTaxes/${quote.quote.id}`)
      .then(res => {
        dispatch(change(false));
        dispatch(addTaxes(res.data));
        router.push("/Proforma/newProforma");
      })
      .catch(res => dispatch(change(false)));
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
      <span className="font-semibold font-body text-4xl">
        New proforma create
      </span>
      <section className="flex w-full mt-5 gap-5">
        <div className="flex flex-col justify-center w-6/12 gap-4">
          <table.CreateTableMd
            columns={columns}
            data={data}
            type="processProducts"
          />
          <div className="flex flex-col gap-1 h-36">
            <span className="text-lg font-body font-semibold">
              Details Quote
            </span>
            <modul.ModuleWmd
              type="Quotation"
              date={quote.quote.date}
              status={quote.quote.status}
              number={quote.quote == "" ? "" : quote.quote.id}
            />
          </div>
        </div>
        <div className="flex flex-col h-full justify-center items-center w-6/12 gap-10">
          <modul.ModuleApproval text="Description" />
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

export default PreviewQuote;
