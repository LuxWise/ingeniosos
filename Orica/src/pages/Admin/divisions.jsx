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
  removeAllDivide,
  removeDivideDetails,
} from "@/redux/features/divideSlice";
import { IoIosArrowBack as Back } from "react-icons/io";

const OrderName = () => {
  const [data, setData] = React.useState([]);
  const divideDetails = useSelector(state => state.divide.dividDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(removeDivideDetails());
    dispatch(removeQuote());
    axiosInstance
      .get(`${URL}/modify/divisions`)
      .then(res => {
        setData(res.data);
        dispatch(removeAllDivide());
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      field: "idquote",
      headerName: "ID Quote",
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
      field: "product",
      headerName: "Product",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "quantity",
      headerName: "Quantity",
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
        <span className="font-semibold font-body text-4xl">
          Modify Divisions
        </span>
      </div>

      <section className="grid grid-cols-7 w-full gap-10 mt-5">
        <div className="col-span-5">
          <table.CreateTableDision columns={columns} data={data} />
        </div>
        <div className="flex flex-col col-span-2 items-center justify-center w-full gap-5">
          <modul.ModuleDivisionDetails
            type="Division Details"
            info={divideDetails}
          />
          <button.ButtonSubmit
            text="Modify"
            onSubmit={() => router.push("/SuperAdmin/modify/divisions/")}
          />
        </div>
      </section>
    </Desk>
  );
};

export default OrderName;
