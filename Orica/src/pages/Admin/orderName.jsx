import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import { modul } from "@/components/modul";
import { table } from "@/components/CreateTable";
import { button } from "@/components/button/index.jsx";
import { URL } from "@/constans/constans";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { removeQuote } from "@/redux/features/quoteSlice";
import {
  deleteDetails,
  deleteOrderStroge,
} from "@/redux/features/orderNameSlice";
import { IoIosArrowBack as Back } from "react-icons/io";

const OrderName = () => {
  const [data, setData] = React.useState([]);
  const orderDetails = useSelector(state => state.orderName.orderNameDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(deleteDetails());
    dispatch(removeQuote());
    dispatch(deleteOrderStroge());
    axiosInstance
      .get(`${URL}/ordernameDivisions`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {});
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Order name",
      headerAlign: "center",
      cellClassName: "id--cell",
    },
    {
      field: "divisions",
      headerName: "divisions",
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
        <span className="font-semibold font-body text-4xl">
          Modify Order Name
        </span>
      </div>
      <section className="grid grid-cols-7 w-full gap-10 mt-5">
        <div className="col-span-4">
          <table.CreateTableOrderName columns={columns} data={data} />
        </div>
        <div className="flex flex-col col-span-3 items-center justify-center w-full gap-5">
          <modul.ModuleOrderNameModify
            type="Order Name Details"
            info={orderDetails}
          />
          <button.ButtonSubmit
            text="Modify"
            onSubmit={() => router.push("/SuperAdmin/modify/orderName/")}
          />
        </div>
      </section>
    </Desk>
  );
};

export default OrderName;
