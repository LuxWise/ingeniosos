import Desk from "@/layout/desk";
import React from "react";
import axiosInstance from "@/axiosInstance";
import { table } from "@/components/CreateTable";
import { URL } from "@/constans/constans";
import { useSelector, useDispatch } from "react-redux";
import { button } from "@/components/button";
import { useRouter } from "next/router";
import { change } from "@/redux/features/authSlice.js";
import { FaUpload as Upload } from "react-icons/fa6";

const StatementAccount = () => {
  const [data, setData] = React.useState([]);
  const loading = useSelector(state => state.auth);
  const quote = useSelector(state => state.quote);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    axiosInstance
      .get(`${URL}/accountStatements`)
      .then(res => {
        setData(res.data);
      })
      .catch(res => {});
  }, []);

  const onSubmit = () => {
    event.preventDefault();
    dispatch(change(true));
    router.push(`/Customer/processPay/`);
    dispatch(change(false));
  };

  const columns = [
    {
      field: "account",
      headerName: "Account",
      headerAlign: "center",
      cellClassName: "id--cell",
    },

    {
      field: "billingdocument",
      headerName: "Billing Document",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "postingdate",
      headerName: "Posting Date",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "netduedate",
      headerName: "Net Due Date",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "arrearsbynetduedate",
      headerName: "Arrears by Net Due Date",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "amountindoc",
      headerName: "Amount in Doc. Curr.",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "documentcurrency",
      headerName: "Document Currency",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
    {
      field: "reference",
      headerName: "Reference",
      headerAlign: "center",
      flex: 1,
      cellClassName: "theme--cell",
    },
  ];
  return (
    <Desk>
      <div className="flex items-center justify-between">
        <span className="font-semibold font-body text-4xl">
          Statement of account
        </span>
        <div className="flex mr-10">
          <button.ButtonUpdate
            text="Update"
            onSubmit={() => router.push("/Proforma/updateStatement")}
            icon={<Upload className="text-sky-600 " />}
          />
        </div>
      </div>
      <section className="flex flex-col justify-center items-end w-full mt-10 ">
        <table.CreateTableAccountStatement columns={columns} data={data} />
      </section>
    </Desk>
  );
};

export default StatementAccount;
