import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import { table } from "@/components/CreateTable";
import { modul } from "@/components/modul";
import { button } from "../../components/button/index.jsx";
import { URL } from "@/constans/constans";
import { useSelector, useDispatch } from "react-redux";
import { removeQuote } from "@/redux/features/quoteSlice.js";
import { useRouter } from "next/router.js";

const OrderName = () => {
  const [data, setData] = React.useState([]);
  const orderDetails = useSelector(state => state.orderName.orderNameDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(removeQuote());
    axiosInstance
      .get(`${URL}/ordernames`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Order name",
      headerAlign: "center",
      cellClassName: "id--cell",
    },
    {
      field: "iddivision",
      headerName: "ID division",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "idquote",
      headerName: "Quote",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
  ];

  return (
    <Desk>
      <div className="flex items-center justify-between">
        <span className="font-semibold font-body text-4xl">Order name</span>
        <div className="flex gap-5 mr-10">
          <button.ButtonQuotations
            text="New order name"
            onSubmit={() => router.push("/Commercial/newOrderName")}
          />
          <button.ButtonHistory
            text="All divisions"
            onSubmit={() => router.push("/Commercial/divisions")}
          />
        </div>
      </div>
      <section className="grid grid-cols-7 w-full gap-10 mt-5">
        <div className="col-span-4">
          <table.CreateTableOrderName columns={columns} data={data} />
        </div>
        <div className="flex flex-col col-span-3 items-center justify-center w-full gap-5">
          <modul.ModuleOrderNameDetails
            type="Order Name Details"
            info={orderDetails}
          />
        </div>
      </section>
    </Desk>
  );
};

export default OrderName;
