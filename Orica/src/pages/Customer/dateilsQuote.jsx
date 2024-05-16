import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import { table } from "@/components/CreateTable";
import { URL } from "@/constans/constans";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IoIosArrowBack as Back } from "react-icons/io";

const DetailsQuote = () => {
  const [data, setData] = React.useState([]);
  const quoteNumber = useSelector(state => state.preview.quoteNumber);
  const quote = useSelector(state => state.quote);
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    axiosInstance
      .get(`${URL}/divisions/${quoteNumber}`)
      .then(res => {
        setData(res.data);
      })
      .catch(res => {});
  }, [dispatch]);

  // const onSubmit = () => {
  //   router.push("/Commercial/newReview");
  // };

  const columns = [
    {
      field: "product",
      headerName: "Product",
      headerAlign: "center",
      flex: 1,
      cellClassName: "id--cell",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "price",
      headerName: "Price",
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
      field: "date",
      headerName: "Date",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "total",
      headerName: "Total",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
  ];
  return (
    <Desk>
      <div className="flex items-center gap-10">
        <Back
          className="cursor-pointer"
          size={25}
          onClick={() => router.push("/Customer/newProcess/")}
        />
        <span className="font-semibold font-body text-4xl">Quote details</span>
      </div>

      <section className="flex w-full mt-5 gap-5">
        <div className="flex flex-col w-full justify-center px-20">
          <table.CreateTableDetails
            columns={columns}
            data={data}
            type="previewProducts"
          />
        </div>
      </section>
    </Desk>
  );
};

export default DetailsQuote;
